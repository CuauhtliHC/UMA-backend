const {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  disableUserService,
  updateUserService,
  forgotPasswordService,
  resetPasswordService,
} = require('../services/usersServices');
const { sendEmailRestorePassword } = require('../utils/sendEmail');

const userRegister = (req, res) => {
  const { name, email, password } = req.body;
  console.log('------------------>>>');
  console.log(email);
  userRegisterService(name, email, password)
    .then(() => {
      res.status(201).json({ msg: 'El Usuario fue creado con éxito', email });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Register', error });
    });
};

const getAllUsers = (req, res) => {
  const { limit } = req.params;
  allUsersService(limit)
    .then((users) => res.status(200).json(users))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users', error });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userByIdService(id)
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get User By Id', error });
    });
};

const getAllUsersBanned = (req, res) => {
  const { limit } = req.params;
  usersBannedService(limit)
    .then((users) => res.status(200).json(users))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users Banned', error });
    });
};

const updateUser = (req, res) => {
  const {
    email, name, password, status,
  } = req.body;
  const { id } = req.params;
  updateUserService(id, email, name, password, status)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res
        .status(500)
        .json({ msg: 'Error - Update User In Status Banned', error });
    });
};

const disableUser = (req, res) => {
  const { id } = req.params;
  disableUserService(id)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res
        .status(500)
        .json({ msg: 'Error - Update User In Status Banned', error });
    });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  forgotPasswordService(email)
    .then((token) => {
      sendEmailRestorePassword(email, token) // revisar correctamente esta funcion
        .then(() => {
          res.status(200).json({ msg: 'Send Email' });
        })
        .catch((error) => {
          res.status(500).json({ msg: 'Error - Send Email', error });
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Generate token', error });
    });
};

const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  resetPasswordService(token, password)
    .then(() => {
      res.status(204).json({ msg: 'Rest Password Success' });
    })
    .catch((error) => {
      res.send(500).json({ msg: 'Error - Reset Password', error });
    });
};

module.exports = {
  userRegister,
  getAllUsers,
  getUserById,
  getAllUsersBanned,
  updateUser,
  disableUser,
  forgotPassword,
  resetPassword,
};
