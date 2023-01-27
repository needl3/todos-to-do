const express = require('express')
const { getTopUsersQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { limit = 2, page = 0 } = req.params

    try {
        const data = await getTopUsersQuery(limit, page, req.user.username)
        res.json({ data })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}
