module.exports = require('nodemailer').createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_HOST,
        pass: process.env.MAIL_PASS,
    },
})
