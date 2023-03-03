const User = require('../models/user');

// register
exports.register = (req, res) => {
  const {
    name, email, password, active, deleted,
  } = req.body;

  User.findOne({ where: { email } })
    .then((userExist) => {
      if (userExist) {
        res.status(400).send('El correo electrónico ya está en uso');
      } else {
        const user = User.build({
          name,
          email,
          password: User.encriptPass(password),
          active,
          deleted,
        });
        user
          .save()
          .then(() => {
            res.status(201).send('El Usuario fue creado con éxito');
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
