'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate({User, Appointment}) {
      this.belongsTo(User, {foreignKey: 'userID', as: 'user'});
      this.belongsTo(Appointment, {foreignKey: 'appointmentID', as: 'appointment'});
    }
  };
  Notification.init({
    message: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};