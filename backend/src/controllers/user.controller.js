const { v4: uuidv4 } = require('uuid')
const { User } = require('../database/models/index')
const Queue = require('../queue/queue')
const { urlGoogle, getGoogleAccountFromCode } = require('../utils/google.uitl')
const { comparePassword, hashPassword } = require('../utils/password.util')
const jobNames = require('../config/job')
const { or } = require('sequelize')

// TODO: Method: Get
// TODO: Url: api/v1/users/
// *   : Get all users from database
const getAllUsers = async (req, res, next) => {
  const users = await User.findAll()
  return res.status(200).json({
    code: 200,
    users: users,
  })
}

// TODO: Method: Get
// TODO: Url: api/v1/users/:id
// *   : Get all users from database
const getUserById = async (req, res, next) => {
  const { id } = req.params
  const user = await User.findAll({
    where: {
      id,
    },
  })
  return res.status(200).json({
    code: 200,
    users: user,
  })
}

// TODO: Method: Post
// TODO: Url: api/v1/users/
// *   : Create a new user with random ID and verifyToken
const createUser = async (req, res, next) => {
  const { username, email, password, fullName } = req.body
  const userExist = await User.findOne({
    where: or(
      {
        username,
      },
      { email }
    ),
  })
  if (userExist) return next(new Error('User or email is exist'))

  const user = await User.create({
    id: uuidv4(),
    username,
    email,
    password: hashPassword(password),
    verifyToken: uuidv4(),
    fullName,
  })
  if (user) {
    Queue.add(jobNames.ActiveUser.jobName, {
      username: user.getDataValue('username'),
      email: user.getDataValue('email'),
      verifyToken: user.getDataValue('verifyToken'),
    })
  }

  return res.status(201).json({
    message: ` created user, check you mail to active account`,
    code: 201,
  })
}

// TODO: Method: Post
// TODO: Send verifyToken to user mail
const sendMailToUser = async (req, res, next) => {
  const { username, password } = req.body
  const hPass = hashPassword(password)
  const user = await User.findOne({
    where: {
      username,
      password: hPass,
      type: 'LOCAL',
    },
  })
  if (!user) return next(new Error('User or password is incorrect'))
  Queue.add(jobNames.ActiveUser.jobName, {
    username: user.getDataValue('username'),
    email: user.getDataValue('email'),
    verifyToken: user.getDataValue('verifyToken'),
  })
  return res.status(200).json({
    message: 'Success',
    code: 200,
  })
}

// TODO: Method: Delete
// TODO: Url: api/v1/users/:id
// *   : Delete one user field using user id
const deleteUserById = async (req, res, next) => {
  const { id } = req.params
  const result = await User.destroy({
    where: {
      id,
    },
  })

  if (result > 0) return res.json(204)
  return next(new Error('User id not found'))
}

// TODO: Method: Delete
// TODO: Url: api/v1/users/
// *   : Delete all fields of user
const resetUsers = async (req, res, next) => {
  await User.destroy({
    where: {},
  })
  return res.json(204)
}

// TODO: Method: Patch
// TODO: Url: api/v1/users/active?verifyToken=
// *   : Active new user with verifyToken
const activeUser = async (req, res, next) => {
  const { verifyToken } = req.query
  const user = await User.update(
    {
      verifyToken: null,
      active: true,
    },
    { where: { verifyToken } }
  )
  if (user[0] === 0) return next(new Error('Not found'))

  // return res.status(200).json({
  //   message: 'Actived',
  //   code: 200,
  // })

  return res.redirect('https://google.com.vn')
}

const createSocialUser = async (req, res, next) => {
  res.json({
    googleUrl: urlGoogle(),
    code: 200,
  })
}

const handleCallback = async (req, res, next) => {
  const code = req.query.code
  if (code) {
    const { id, email, name, picture } = await getGoogleAccountFromCode(code)
    const user = await User.findOne({
      where: {
        email,
        googleId: id,
        type: 'GOOGLE',
      },
    })

    if (!user) {
      const userField = await User.create({
        id: uuidv4(),
        googleId: id,
        email,
        fullName: name,
        avatar: picture,
        type: 'GOOGLE',
        active: true,
      })

      return res.json({
        message: userField,
        code: 201,
      })
    }

    return res.status(200).json({
      data: user,
      code: 200,
    })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  resetUsers,
  deleteUserById,
  activeUser,
  createSocialUser,
  handleCallback,
  sendMailToUser,
}
