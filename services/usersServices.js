const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const User = require('../models/user');
const {
  Role,
} = require('../models');
const RecoveryToken = require('../models/recoveryToken');
const StatusUsers = require('../models/statusUser');
const { statusUser } = require('../config/statusUsers.json');

const userRegisterService = async (name, email, password) => {
  const role = await Role.findOne({ where: { rol: 'USER_ROL' } });
  if (!role) {
    const error = new Error('No fue encontrado el rol en la BBDD');
    return error;
  }
  const userStatus = await StatusUsers.findOne({ where: { status: statusUser.inavtive } });
  if (!userStatus) {
    const error = new Error('No fue encontrado el userStatus en la BBDD');
    return error;
  }
  const user = await User.create({
    name,
    email,
    password: User.encriptPass(password),
  });
  user.setRole(role);
  user.setUserStatus(userStatus);
  return user;
};

const allUsersService = async (limit) => {
  const users = await User.findAndCountAll({
    limit,
    offset: 0,
    where: { deleted: false, roleId: { [Sequelize.Op.ne]: 1 } },
    attributes: ['id', 'name', 'email', 'active', 'deleted', 'roleId'],
    order: [['id', 'ASC']],
    include: [
      {
        all: true,
        nested: true,
      },
    ],
  });
  return users;
};

const userByIdService = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'name', 'email', 'active', 'deleted', 'roleId'],
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    return user;
  } catch (error) {
    return error;
  }
};

const usersBannedService = async (limit) => {
  const users = await User.findAndCountAll({
    limit,
    offset: 0,
    where: { deleted: true },
    attributes: ['id', 'name', 'email', 'active', 'deleted', 'roleId'],
    order: [['id', 'ASC']],
  });
  return users;
};

const updateUserService = async (id, email, name, password, status) => {
  const user = await User.update(
    {
      email,
      name,
      password,
      status,
    },
    { where: { id } },
  );
  return user;
};

const disableUserService = async (id) => {
  const findUser = await User.findOne({ where: { id } });
  const user = await User.update(
    { deleted: !findUser.deleted },
    { where: { id } },
  );
  return user;
};

const forgotPasswordService = async (email) => {
  const user = await User.findOne({ where: { email } });
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  const recoveryToken = await RecoveryToken.create({ token });
  await recoveryToken.setUser(user);
  return token;
};

const resetPasswordService = async (token, password) => {
  const recoveryToken = await RecoveryToken.findOne({ where: { token } });
  const user = await User.findByPk(recoveryToken.userId);
  const updatePassword = await user.update({
    password: User.encriptPass(password),
  });
  await recoveryToken.destroy();
  return updatePassword;
};

module.exports = {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  updateUserService,
  disableUserService,
  forgotPasswordService,
  resetPasswordService,
};
