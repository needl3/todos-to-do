const router = require('express').Router()

router.get('/getCreatedStat', require('./getCreatedStatistics'))
router.get('/getCompletedStat', require('./getCompletedStatistics'))
router.get('/', require('./getTodo'))
router.post('/', require('./addTodo'))
router.delete('/', require('./deleteTodo'))
router.patch('/', require('./updateTodo'))

module.exports = router
