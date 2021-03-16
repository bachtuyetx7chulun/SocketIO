'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: 'owner', as: 'messages' })
      // this.hasMany(models.Room, { foreignKey: 'roomOwner', as: 'user' })
      this.belongsToMany(models.Room, {
        foreignKey: 'user_id',
        through: 'Users_Rooms',
        as: 'rooms',
      })
    }
  }
  User.init(
    {
      type: DataTypes.STRING,
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      googleId: DataTypes.STRING,
      facebookId: DataTypes.STRING,
      type: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      verifyToken: DataTypes.STRING,
      role: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
