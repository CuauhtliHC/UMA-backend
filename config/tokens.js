const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  const secret = process.env.SECRET;
  const token = jwt.sign(payload, secret, {});
  return token;
};

const validateToken = () => {};

module.exports = { generateToken, validateToken };
