const { validationResult } = require('express-validator');
const {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  disableUserService,
  updateUserService,
} = require('../services/usersServices');

// register
const userRegister = (req, res) => {
  const {
    name, email, password, userRol,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  userRegisterService(name, email, password)
    .save()
    .then((userCreated) => {
      userCreated.setRole(userRol);
      res.status(201).json({ msg: 'El Usuario fue creado con éxito', email });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Register', error });
    });
};

const getAllUsers = (req, res) => {
  allUsersService()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users', error });
    });
};

const getUserById = (req, res) => {
  const { id } = req.body;
  userByIdService(id)
    .then((user) => res.status(200).json({ user }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get User By Id', error });
    });
};

const getAllUsersBanned = (req, res) => {
  const { id } = req.body;
  usersBannedService(id)
    .then((users) => res.status(200).json({ users }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users Banned', error });
    });
};

const updateUser = (req, res) => {
  const {
    id, email, name, password, status,
  } = req.body;
  updateUserService(id, email, name, password, status)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Update User In Status Banned', error });
    });
};

const disableUser = (req, res) => {
  disableUserService()
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
