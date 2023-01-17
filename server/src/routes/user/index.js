const router = require('express').Router()
const auth = require('../../middlewares/auth')

router.post('/login', require('./login'))
router.delete('/logout', auth, require('./logout'))
router.post('/requestverification', require('./requestverification'))
router.get('/verify', require('./verify'))
router.get('/', auth, require('./user.js'))
router.post('/image', require('./image.js'))

router.get('*', (req, res) => {
    res.status(404).json({ message: 'No such endpoint defined in auth' })
})

module.exports = router
