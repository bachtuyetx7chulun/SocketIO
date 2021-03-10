const User = require('../database/models/user.js')
const { Sequelize, sequelize } = require('../database/models/index')

const getAllUsers = async (req, res, next) => {
  const users = await User(sequelize, Sequelize.DataTypes).findAll()
  return res.status(200).json({
    code: 200,
    users: users,
  })
}

const createUser = async (req, res, next) => {
  const user = User(sequelize, Sequelize.DataTypes).create({
    username: 'trunghieu',
  })
  await user.save()
  return res.status(201).json({
    message: ` created user`,
    code: 201,
  })
}

module.exports = {
  getAllUsers,
  createUser,
}
