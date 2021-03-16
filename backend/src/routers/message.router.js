const router = require('express-promise-router').default()
const { getChatsInRoom } = require('../controllers/message.controller')

router.get('/', getChatsInRoom)

module.exports = router
