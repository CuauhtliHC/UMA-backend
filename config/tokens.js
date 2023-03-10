const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, secret, { expiresIn: '7d' });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, validateToken };
