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
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ],
    underscored: true,
    sequelize
  });

  return User;
};