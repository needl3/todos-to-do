const express = require('express')
const { getCreatedTodoQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { limit = 5, page = 0, date } = req.query

    const dateNew =
        date ||
        new Date(new Date() - new Date().getTimezoneOffset() * 60000 - 86400000)
            .toISOString()
            .slice(0, 10)

    try {
        const data = await getCreatedTodoQuery(
            req.user.username,
            dateNew
        )
        res.json({ data })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
