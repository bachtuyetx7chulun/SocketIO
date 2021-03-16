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
const { schema, validateForm } = require('../middlewares/validate.middleware')

// * DEV environment ->
router.get('/', getAllUsers)
router.get('/active', activeUser) // Required to stand in front of /user/:id
router.post('/sendmail', sendMailToUser) // this route is deprecated

router.get('/:id', getUserById)
router.delete(':id', deleteUserById)
router.delete('/', resetUsers)

// * Actions
router.post(
  '/login',
  validateForm(schema.userSchema.userLoginSchema),
  userLogin
)
router.post('/', validateForm(schema.userSchema.userCreateSchema), createUser)

// * Google oauth2
router.get('/auth/google', createSocialUser)
router.get('/auth/google/callback', handleCallback)

module.exports = router
