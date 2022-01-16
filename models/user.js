'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Authority, Appointment, Notification}) {
      this.hasOne(Authority, {
        foreignKey: 'userID',
        as: 'authority',
        onDelete: 'cascade',
        hooks: true
      });

      this.hasMany(Appointment, {
        foreignKey: 'userID',
        as: 'userAppointments',
        onDelete: 'cascade',
        hooks: true
      });

      this.hasMany(Appointment, {
        foreignKey: 'employeeID',
        as: 'employeeAppointments',
        onDelete: 'cascade',
        hooks: true
      });

      this.hasMany(Notification, {
        foreignKey: 'userID',
        as: 'notifications',
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};