'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      message: {
        type: DataTypes.STRING
      },
      userID: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
      },
      appointmentID: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Notifications');
  }
};