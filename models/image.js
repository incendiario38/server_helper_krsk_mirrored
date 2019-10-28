const Statement = require('../models').statement;

module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('image', {
      statementID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'statements',
              key: 'id',
          },
      },
      path: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  },{
      timestamps: true,
      indexes: [
          {
              unique: true,
              fields:['path']
          }
      ],
      underscored: true,
      sequelize
  });
  return Image;
};