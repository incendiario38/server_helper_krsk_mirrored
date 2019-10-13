const express = require('express');
const router = express.Router();
const v1 = require('./v1');

router.get('/', function(req, res) {
  res.json({ message: 'default' });
});

router.use('/v1', v1);

module.exports = router;