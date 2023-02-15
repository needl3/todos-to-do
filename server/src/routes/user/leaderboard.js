const express = require('express')
const { getTopUsersQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { limit = 5, page = 0 } = req.query

    try {
        const data = await getTopUsersQuery(limit, page)
        res.json({ data, limit })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}
