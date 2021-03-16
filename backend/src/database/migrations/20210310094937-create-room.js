'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      // roomOwner: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   references: {
      //     model: 'Users',
      //     key: 'id',
      //   },
      // },
      // roomType: {
      //   type: Sequelize.ENUM('PRIVATE', 'PUBLIC'),
      //   defaultValue: 'PUBLIC',
      // },
      // roomKey: {
      //   type: Sequelize.STRING,
      // },
      roomName: {
        type: Sequelize.STRING,
      },
      roomLimit: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleteAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms')
  },
}
