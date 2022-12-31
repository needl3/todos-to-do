const express = require('express')
const { getTodoQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { page = 0, limit = 5 } = req.query
    try {
        const todos = await getTodoQuery(page, limit, req.user.username)

        res.json({ message: 'success', todos: todos })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Server Error' })
    }
}
