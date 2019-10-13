const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});

app.listen(config.port, function() {
  console.log(`Express is running on port ${config.port}`);
});