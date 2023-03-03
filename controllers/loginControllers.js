const User = require('../models/user');
const { generateToken } = require('../config/tokens');

exports.loginControllers = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .send('El correo electrónico no pertenece a ningun usuario');
      } else {
        const isValid = user.validatePassword(password);

        if (!isValid) { return res.status(400).send('La contraseña es incorrecta'); }

        const payload = {
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        };

        const token = generateToken(payload);
        res.cookie('token', token);

        res.send(payload);
      }
    })
    .catch((error) => {
      res.status(400).send(error, 'error');
    });
};
