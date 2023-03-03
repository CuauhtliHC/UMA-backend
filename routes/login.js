const express = require('express');

const router = express.Router();
const User = require('../models/user');
const { generateToken } = require('../config/tokens');

router.post('/', (req, res) => {
  // const { email, password } = req.body;
  console.log('Hello world');
  res.status(200).send('Hello world');
  // User.findOne({ where: { email } }).then((user) => {
  //   if (!user) return res.sendStatus(401);
  //   user.validatePassword(password).then((isValid) => {
  //     if (!isValid) return res.sendStatus(401);

  //     const payload = {
  //       name: this.name,
  //       email: this.email,
  //       roleId: this.roleId,
  //     };

  //     const token = generateToken(payload);
  //   });
  // });
});

module.exports = router;
