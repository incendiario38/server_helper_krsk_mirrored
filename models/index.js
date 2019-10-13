const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);

let db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== "index.js");
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user.sync({force: true})
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('Error: User\'s model!\n', err.message));

db.token.sync({force: true})
  .then(() => console.log('Token table created successfully'))
  .catch(err => console.log('Error: Token\'s model!\n', err.message));

module.exports = db;