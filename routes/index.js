const express = require('express');
const router = express.Router();
const User = require('../models').user;
const {login, register, validateToken} = require('../controllers/auth');
const v1 = require('./v1');

router.get('/', function (req, res) {
  res.json({message: 'default'});
});

router.post('/login', login);
router.post('/register', register);

router.use('/v1', validateToken, v1);

module.exports = router;