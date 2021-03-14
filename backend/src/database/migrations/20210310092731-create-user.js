'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM('FACEBOOK', 'GOOGLE', 'LOCAL'),
        defaultValue: 'LOCAL',
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebookId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verifyToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM('ADMIN', 'MANAGER', 'USER'),
        defaultValue: 'USER',
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
    await queryInterface.dropTable('Users')
  },
}
