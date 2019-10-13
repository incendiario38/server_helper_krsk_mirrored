module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true
  });

  User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('Error: User\'s model!\n', err.message));

  return User;
};