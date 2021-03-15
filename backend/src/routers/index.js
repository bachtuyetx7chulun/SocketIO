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

// * DEV environment ->
if (ENV === 'DEV') {
  router.get('/users', getAllUsers)
  router.get('/users/active', activeUser) // Required to stand in front of /user/:id
  // router.post('/users/sendmail', sendMailToUser) // this route is deprecated
  
  router.get('/users/:id', getUserById)
  router.delete('/users/:id', deleteUserById)
  router.delete('/users', resetUsers)

  // * Actions
  router.post(
    '/users/login',
    validateForm(schema.userSchema.userLoginSchema),
    userLogin
  )
  router.post(
    '/users',
    validateForm(schema.userSchema.userCreateSchema),
    createUser
  )

  // * Google oauth2
  router.get('/users/auth/google', createSocialUser)
  router.get('/users/auth/google/callback', handleCallback)
}

// * TEST environment ->
if (ENV === 'TEST') {
  router.get('/test/login', login)
  router.get('/test/users', authorization, check)
}

module.exports = router
