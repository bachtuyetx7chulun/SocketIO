const router = require('express-promise-router').default()
const {
  createRoom,
  getRooms,
} = require('../controllers/room.controller')

router.get('/', getRooms)
router.post('/', createRoom)

module.exports = router
