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
} = require('../controllers/user.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { schema, validateForm } = require('../middlewares/validate.middleware')
const { ENV } = require('../config')

// * DEV environment ->
if (ENV === 'DEV') {
  router.get('/users', getAllUsers)
  router.get('/users/active', activeUser) // Required to stand in front of /user/:id
  // router.post('/users/sendmail', sendMailToUser) // this route is deprecated
  router.get('/users/:id', getUserById)
  router.post('/users', validateForm(schema.userSchema), createUser)
  router.delete('/users/:id', deleteUserById)
  router.delete('/users', resetUsers)
  router.get('/users/auth/google', createSocialUser)
  router.get('/users/auth/google/callback', handleCallback)
}

// * TEST environment ->
if (ENV === 'TEST') {
  router.get('/test/auth', authorization, (req, res, next) => {
    res.json('OKE')
  })
}

module.exports = router
