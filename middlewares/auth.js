const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Token = require('../models').token;

const validate = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: config.jwt.expiresIn
    };

    jwt.verify(token, config.jwt.secret, options, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Unauthorized access.'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).send({
      error: true,
      message: 'No token provided.'
    });
  }
};

const validateRefresh = async (req, res, next) => {
  if (req.body.refreshToken) {
    const refreshToken = req.body.refreshToken; // Bearer <token>
    const options = {
      expiresIn: config.jwt.refreshExpiresIn
    };

    const token = await Token.findOne({
      where: {
        value: refreshToken
      }
    });

    if (!token) {
      return res.status(403).json({
        error: true,
        message: 'Unauthorized access.'
      });
    }

    if(!token.status) {
      return res.status(403).json({
        error: true,
        message: 'Token is locked.'
      });
    }

    jwt.verify(refreshToken, config.jwt.refreshSecret, options, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          error: true,
          message: 'Unauthorized access.'
        });
      }

      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).send({
      error: true,
      message: 'No token provided.'
    });
  }
};

module.exports = {validate, validateRefresh};