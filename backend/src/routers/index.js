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

const { schema, validateForm } = require('../middlewares/validate.middleware')

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users', validateForm(schema.userSchema), createUser)
router.delete('/users/:id', deleteUserById)
router.delete('/users', resetUsers)
router.post('/users/sendmail', sendMailToUser)
router.patch('/users/active', activeUser)
router.get('/users/auth/google', createSocialUser)
router.get('/users/auth/google/callback', handleCallback)

module.exports = router
