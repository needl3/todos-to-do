const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use((req, res, next) => {
    console.log('=>  ' + req.url)
    next()
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(require('body-parser').urlencoded({ extended: false }))

app.use(express.static(path.resolve(__dirname, '../../public')))

app.use('/api', require('../routes'))

app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production')
        return res.sendFile(path.resolve(__dirname, '../../public/index.html'))

    res.status(404).json({ message: 'No landing page in dev mode' })
})

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Whachu doin buddy?' })
})

module.exports = app
