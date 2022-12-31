const express = require('express')
const { deleteTodoQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id } = req.body
    const { username } = req.user

    try {
        await deleteTodoQuery(username, id)
        res.json({ message: 'success' })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' })
        console.error(e)
    }
}
