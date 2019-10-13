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
    ]
  });

  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('Error: User\'s model!\n', err.message));

  return User;
};