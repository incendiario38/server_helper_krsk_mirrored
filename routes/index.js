const express = require('express');
const router = express.Router();
const {validate, validateRefresh} = require('../middlewares/auth');
const {login, register, refresh} = require('../controllers/auth');
const v1 = require('./v1');

router.get('/', function (req, res) {
  res.json({message: 'default'});
});

router.post('/login', login);
router.post('/register', register);
router.post('/refresh', validateRefresh, refresh);

router.use('/v1', validate, v1);

module.exports = router;