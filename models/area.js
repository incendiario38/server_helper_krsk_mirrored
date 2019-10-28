module.exports = function (sequelize, DataTypes) {
  const Area = sequelize.define('area', {
     email: {
       type: DataTypes.STRING,
         allowNull: false,
         validate: {
           isEmail: {
               msg: "Email address must be valid"
           },
             notEmpty: true,
         },
     },
  }, {
      timestamps: true,
      indexes: [
          {
              unique: true,
              fields:['email']
          }
      ],
      underscored: true,
      sequelize
    });
  return Area;
};