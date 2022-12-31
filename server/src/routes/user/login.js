const express = require('express')
const { loginQuery } = require('../../utils/sqldriver')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await loginQuery(email, password)
        res.cookie('accessToken', user.accessToken, { httpOnly: true })
        res.json({ message: 'success', accessToken: user.accessToken })
    } catch (e) {
        console.log(e)
        if (e === 'no-user')
            return res.status(400).json({ message: 'No such user exists' })

        if (e === 'invalid-credentials')
            return res.status(401).json({ message: 'Invalid credentials' })

        res.status(500).json({
            message: 'Something went wrong while configuring tokens',
        })
    }
}
