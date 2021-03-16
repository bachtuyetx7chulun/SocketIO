const router = require('express-promise-router').default()
const {
  getAllUsers,
  createUser,
  resetUsers,
  deleteUserById,
  activeUser,
  getUserById,
  createSocialUser,
  handleCallback,
  sendMailToUser,
  userLogin,
} = require('../controllers/user.controller')
const { check, login } = require('../controllers/test.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { schema, validateForm } = require('../middlewares/validate.middleware')
const { ENV } = require('../config')
const userRoutes = require('./user.router')
const roomRoutes = require('./room.router')
const messageRoutes = require('./message.router')

// * DEV environment ->
if (ENV === 'DEV') {
  router.use('/users', userRoutes)
  router.use('/rooms', roomRoutes)
  router.use('/messages', messageRoutes)
}

// * TEST environment ->
if (ENV === 'TEST') {
  router.get('/test/login', login)
  router.get('/test/users', authorization, check)
}

module.exports = router
