const {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  disableUserService,
  updateUserService,
} = require('../services/usersServices');

const userRegister = (req, res) => {
  const {
    name, email, password,
  } = req.body;
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
      res.status(500).json({ msg: 'Error - Update User In Status Banned', error });
    });
};

const disableUser = (req, res) => {
  const { id } = req.params;
  disableUserService(id)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Update User In Status Banned', error });
    });
};

module.exports = {
  userRegister,
  getAllUsers,
  getUserById,
  getAllUsersBanned,
  updateUser,
  disableUser,
};
