const express = require('express')
const { updateTodoQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id, title, description, checked: isComplete } = req.body

    if (!id) return res.status(400).json({ message: 'Invalid payload' })

    try {
        await updateTodoQuery(
            id,
            req.user.username,
            title,
            description,
            isComplete
        )
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}
