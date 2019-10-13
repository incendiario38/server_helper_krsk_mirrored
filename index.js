const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const routes = require('./routes');
const models = require('./models');

const app = express();

models.sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Register routes
app.use('/', routes);

app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: `Sorry, page "${req.originalUrl}" not found`
  });
});

app.listen(config.port, function () {
  console.log(`Express is running on port ${config.port}`);
});

module.exports = app;