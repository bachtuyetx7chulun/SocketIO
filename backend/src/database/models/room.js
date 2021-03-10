'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: 'room', as: 'messages' })
      this.belongsToMany(models.User, {
        foreignKey: 'room_id',
        through: 'Users_Rooms',
        as: 'users',
      })
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      roomLimit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  )
  return Room
}
