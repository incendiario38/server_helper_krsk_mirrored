const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Router version 1.0' });
});

module.exports = router;