const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models').user;
const Token = require('../models').token;

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
      const token = jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
      const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {expiresIn: config.jwt.refreshExpiresIn});

      await Token.create({
        value: refreshToken,
        status: true,
        userId: user.id
      });

      res.status(200).json({
        success: true,
        token: token,
        refreshToken: refreshToken
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

const refresh = async (req, res) => {
  try {
    const decoded = req.decoded;

    const expirationDate = new Date(decoded.exp * 1000);
    const currentDate = new Date();

    if (currentDate.getTime() > expirationDate.getTime()) {
      res.status(500).json({
        error: true,
        message: 'RefreshToken is expired'
      });
    }

    const payload = {user: decoded.user};
    const token = jwt.sign(payload, config.jwt.secret, {expiresIn: config.jwt.expiresIn});

    res.status(200).json({
      success: true,
      token: token,
    });
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

module.exports = {login, register, refresh};