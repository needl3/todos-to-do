const router = require('express').Router()

router.get('/', require('./getTodo'))
router.post('/', require('./addTodo'))
router.delete('/', require('./deleteTodo'))
router.patch('/', require('./updateTodo'))

module.exports = router
