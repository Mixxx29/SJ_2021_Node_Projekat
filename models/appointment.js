'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate({User, Notification}) {
      this.belongsTo(User, {foreignKey: 'userID', as: 'user'});
      this.belongsTo(User, {foreignKey: 'employeeID', as: 'employee'});

      this.hasMany(Notification, {
        foreignKey: 'appointmentID',
        as: 'notifications',
        onDelete: 'cascade',
        hooks: true
      });
    }
  };
  Appointment.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['PENDING', 'APPROVED', 'DECLINED'],
      allowNull: false,
      defaultValue: 'PENDING'
    }
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};