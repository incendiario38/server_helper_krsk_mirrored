const User = require('../models').user;
const Area = require('../models').area;

module.exports = function (sequelize, DataTypes) {
  const Statement = sequelize.define('statement', {
      userID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          },
      },
      areaID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'areas',
              key: 'id',
          },
      },
      dateTime: {
          type: DataTypes.DATE,
          allowNull: false,
      },
      location: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      carNumber: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      carModel: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      comment: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  }, {
      timestamps:true,
      underscored: true,
      sequelize
  });
  return Statement;
};