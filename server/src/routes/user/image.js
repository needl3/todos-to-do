const express = require('express')
const { uploadImageQuery, getImageQuery } = require('../../utils/sqldriver')
const { Octokit } = require('@octokit/rest')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
async function uploadAndGetImageLink(image, user, imageSHA) {
    const token = process.env['GITHUB_TOKEN']

    if (token == null) {
        throw Error(
            'Expected GITHUB_TOKEN environment variable to create repository. Exiting...'
        )
    }

    const octokit = new Octokit({
        auth: token,
    })

    const owner = 'Agneiss'
    const repo = 'todo-images'

    const result = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        message: 'Profile Picture upload for ' + user,
        path: user + '.png',
        content: image,
        sha: imageSHA,
    })

    return {
        imageLink: result.data.content.download_url,
        imageSHA: result.data.content.sha,
    }
}

module.exports = async (req, res) => {
    const { image } = req.body

    try {
        const data = await getImageQuery(req.user.username)
        const dbImageLink = data.image || process.env.DEFAULT_IMAGE_LINK

        if (image) {
            const uploadedImageData = await uploadAndGetImageLink(
                image.split(',')[1],
                req.user.username,
                data.imageSHA
            )

            await uploadImageQuery(
                req.user.username,
                uploadedImageData.imageLink,
                uploadedImageData.imageSHA
            )
            return res.json({
                message: 'Change successful. Might take some time to reflect.',
                image: uploadedImageData.imageLink,
            })
        }

        if (!data) throw data

        res.json({ image: dbImageLink })
    } catch (e) {
        console.error(e)
        if (image)
            return res.status(500).json({ message: "Couldn't upload Image." })
        res.status(500).json({ message: 'Something went wrong' })
    }
}
