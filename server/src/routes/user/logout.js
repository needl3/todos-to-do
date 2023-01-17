const express = require('express')
const {jwtSign} = require('../../utils/jwt')
const { logoutQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// Issue with current authentication system:
// You can login with multiple devices, no problem
// BUT
// If you logout with a single device, all sessions will be invalidated
// BUT
// If someone logs in, then you can use the same token before logout to access resources
// So, definately not secure
//

module.exports = async (req, res) => {
    const username = req.user.username
    try {
        await logoutQuery(username)
        res.cookie('accessToken', jwtSign({username: username}, '1s'))
        res.json({ message: 'User has been logged out.' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
