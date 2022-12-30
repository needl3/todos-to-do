const express = require('express')
const { userQuery } = require('../../utils/sqldriver')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const user = await userQuery(req.user.username)

    res.json({message: 'success', user: user.username})
}
