module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: 3,
          msg: 'First name must be at least 3 character in length'
        }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        len: {
          args: 3,
          msg: "First name must be at least 3 character in length"
        }
      }
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
        fields: ['name, email']
      }
    ],
    underscored: true,
    sequelize
  });

  return User;
};