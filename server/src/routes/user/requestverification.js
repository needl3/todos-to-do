const express = require('express')
const { sendVerificationEmail } = require('../../utils/mail')
const { jwtSign } = require('../../utils/jwt')
const { checkAccountQuery } = require('../../utils/sqldriver')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { username, password, email } = req.body
    if (!username || !email || !password)
        return res
            .status(401)
            .json({ message: 'Insufficient data to register' })

    try {
        // Raises error "Duplicate Entry" if account exists with provided creds
        await checkAccountQuery(username, email)

        const token = jwtSign(
            {
                username: username,
                email: email,
                password: password,
            },
            '5m'
        )
        await sendVerificationEmail(email, token)
        res.json({ message: 'Sent verification email' })
    } catch (e) {
        console.error(e)
        if (e.name === 'Duplicate Entry')
            return res
                .status(403)
                .json({ message: 'Email/username already exists' })

        res.status(500).json({ message: 'Something went wrong' })
    }
}
