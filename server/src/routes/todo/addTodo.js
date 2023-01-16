const express = require('express')
const { addTodoQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id, title, description, checked } = req.body

    if (!id) return res.status(400).json({ message: 'Invalid payload' })

    try {
        await addTodoQuery(id, req.user.username, title, description, checked)
        res.json({ message: 'success' })
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY')
            return res
                .status(409)
                .json({ message: 'Cannot add with duplicate id' })
        console.error(e)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}
