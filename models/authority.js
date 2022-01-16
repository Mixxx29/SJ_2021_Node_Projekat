'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userID', as: 'user'});
    }
  };
  Authority.init({
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isEmployee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Authority',
  });
  return Authority;
};