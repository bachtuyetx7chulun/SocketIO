const router = require('express-promise-router').default()
const { getAllUsers, createUser } = require('../controllers/user.controller')

router.get('/users', getAllUsers)
router.post('/user', createUser)

module.exports = router
