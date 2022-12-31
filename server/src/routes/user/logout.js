const express = require('express')
const { logoutQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { username } = req.body

    try {
        await logoutQuery(username)
        res.clearCookie('bearerToken')
        res.json({ message: 'User has been logged out.' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
