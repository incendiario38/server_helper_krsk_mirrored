module.exports = function (sequelize, DataTypes) {
  const Area = sequelize.define('area', {
     email: {
       type: DataTypes.STRING,
         allowNull: false,
     },
  }, {
      timestamps: true,
      underscored: true,
      sequelize
    });
  return Area;
};