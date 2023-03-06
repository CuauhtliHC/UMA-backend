const { Role } = require('../models');
const User = require('../models/user');

// register
exports.register = (req, res) => {
  const { name, email, password } = req.body;
  Role.findOne({ where: { rol: 'USER_ROL' } }).then((resp) => {
    if (!resp) {
      return res.status(404).json({
        msg: 'No fue encontrado el rol en la BBDD',
      });
    }
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
            .then((userCreated) => {
              userCreated.setRole(resp);
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
  });
};
