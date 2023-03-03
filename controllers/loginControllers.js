const User = require('../models/user');
const { generateToken } = require('../config/tokens');

exports.loginControllers = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ msg: `El correo electrónico ${email} no pertenece a ningun usuario` });
      } else {
        const isValid = user.validatePassword(password);

        if (!isValid) { return res.status(400).json({ mgs: 'La contraseña es incorrecta' }); }

        const payload = {
          name: user.name,
          email: user.email,
          roleId: user.roleId,
        };

        const token = generateToken(payload);
        res.cookie('token', token);

        res.status(200).json({
          msg: 'Loguin - User',
          payload,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Login', error });
    });
};
