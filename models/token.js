const User = require('../models').user;

module.exports = function (sequelize, DataTypes) {
  let Token = sequelize.define('token',{
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['value']
      }
    ],
    underscored: true,
    sequelize
  });

  return Token;
};