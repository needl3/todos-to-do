const express = require('express')
const { registerQuery } = require('../../utils/sqldriver')
const { jwtVerify } = require('../../utils/jwt')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { token } = req.query
    if (!token)
        return res.status(401).json({ message: 'Verification token missing' })

    try {
        const data = await jwtVerify(token)
        if (data) {
            await registerQuery(data.username, data.password, data.email)
            console.log(req.headers)
            res.status(302).send(`
                <style>
                    html{
                        background: black;
                        color: white;
                        }
                </style>
                Successfully verified. Redirecting to Home page for login.
                <script>
                    setTimeout(() => {
                       window.location.href = "${process.env.ORIGIN}" 
                    }, 2000);
                    </script>
            `)
        }
        res.status(401).status({ message: 'Invalid token' })
    } catch (e) {
        console.error(e)
        if (e.name === 'TokenExpiredError')
            return res
                .status(500)
                .json({ message: 'Token expired. Register again' })

        res.status(409).json({ message: 'Verification failed' })
    }
}
