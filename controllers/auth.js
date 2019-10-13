const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models').user;

const validateToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: config.jwt.expiresIn
    };
    try {
      req.decoded = jwt.verify(token, config.jwt.secret, options);
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    res.status(401).send({
      error: `Authentication error. Token required.`
    });
  }
};

const login = async (req, res) => {
  try {
    const {name, password} = req.body;

    if (!name || !password) {
      res.status(401).json({
        error: true,
        message: 'Name or password are empty'
      });
    }

    const user = await User.findOne({
      where: {name: name}
    });

    if (!user) {
      res.status(401).json({
        error: true,
        message: 'No such user found'
      });
    }

    if (user.password === password) {
      const payload = {user: user.name};
      const options = {expiresIn: config.jwt.expiresIn};
      const secret = config.jwt.secret;
      const token = jwt.sign(payload, secret, options);

      res.status(200).json({
        success: true,
        token: token
      });
    } else {
      res.status(401).json({
        error: true,
        message: 'Wrong username or password'
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: true,
      message: e.message
    });
  }
};

const register = async (req, res) => {
  try {
    const {name, password} = req.body;
    const user = await User.create({name, password});

    res.status(201).json({
      user,
      message: 'account created successfully'
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: true,
      message: e.message
    });
  }
};

module.exports = {login, register, validateToken};