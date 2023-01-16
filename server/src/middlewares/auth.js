const express = require('express')
const { jwtVerify } = require('../utils/jwt')
const { newTokenQuery } = require('../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res, next) => {
    let verified = null
    try {
        verified = jwtVerify(req?.headers?.cookie.split('=').at(-1))
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            const token = await newTokenQuery(e.username)
            if (token) {
                res.cookie('token', token, { httpOnly: true })
                verified = jwtVerify(token)
            } else verified = token
        }
    }
    if (!verified) return res.status(401).json({ message: 'Not authorized' })

    req.user = { ...verified }
    next()
}
