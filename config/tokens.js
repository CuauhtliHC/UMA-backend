const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  const secret = process.env.SECRET;
  const token = jwt.sign({ user: payload }, secret, { expiresIn: '7d' });
  return token;
};

const validateToken = (token) => {
  const secret = process.env.SECRET;
  return jwt.verify(token, secret);
};

module.exports = { generateToken, validateToken };
