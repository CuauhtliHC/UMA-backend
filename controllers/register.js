const User = require('../models/user');

// register
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ where: { email } })
    .then((userExist) => {
      if (userExist) {
        res.status(400).json({ msg: `El correo ${email} ya está en uso` });
      } else {
        const user = User.build({
          name,
          email,
          password: User.encriptPass(password),
        });
        user
          .save()
          .then(() => {
            res
              .status(201)
              .json({ msg: 'El Usuario fue creado con éxito', email });
          })
          .catch((error) => {
            res.status(500).json({ msg: 'Error - Register', error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Register', error });
    });
};
