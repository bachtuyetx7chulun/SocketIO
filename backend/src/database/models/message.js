'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'owner', as: 'ownerMessage' })
      this.belongsTo(models.Room, { foreignKey: 'room', as: 'roomMessage' })
    }
  }
  Message.init(
    {
      message: DataTypes.STRING,
      owner: DataTypes.STRING,
      room: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  )
  return Message
}
