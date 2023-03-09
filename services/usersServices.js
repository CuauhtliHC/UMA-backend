const User = require('../models/user');

const userRegisterService = async (name, email, password) => {
  const user = await User.create({
    name,
    email,
    password: User.encriptPass(password),
  });
  return user;
};

const allUsersService = async () => {
  const users = await User.findAll();
  return users;
};

const userByIdService = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const usersBannedService = async () => {
  const users = await User.findAll({ deleted: true });
  return users;
};

const updateUserService = async (id, email, name, password, status) => {
  const user = await User.update({
    email, name, password, status,
  }, { where: { id } });
  return user;
};

const disableUserService = async (id) => {
  const findUser = await User.findOne({ where: { id } });
  const user = await User.update({ deleted: !findUser.deleted }, { where: { id } });
  return user;
};

module.exports = {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  updateUserService,
  disableUserService,
};
