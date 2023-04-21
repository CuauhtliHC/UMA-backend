const { dbConection, dbClose } = require('../database/conectBD');
const {
  Role, InProgressOrders, User, StatusUsers,
} = require('../models');

const creationRolesRequired = async () => {
  await Role.findOrCreate({ where: { rol: 'ADMIN_ROL' } });
  await Role.findOrCreate({ where: { rol: 'USER_ROL' } });
  console.log('Roles Creados');
};

const creationStatusOrdersRequired = async () => {
  await InProgressOrders.findOrCreate({ where: { status: 'PENDING' } });
  await InProgressOrders.findOrCreate({ where: { status: 'IN_PROGRESS' } });
  await InProgressOrders.findOrCreate({ where: { status: 'FINISHED' } });
  await InProgressOrders.findOrCreate({ where: { status: 'CANCELLED' } });
  console.log('Estados de orders creados');
};
const creationStatusUsersRequired = async () => {
  await StatusUsers.findOrCreate({ where: { status: 'FINISHED' } });
  await StatusUsers.findOrCreate({ where: { status: 'IN_PROGRESS' } });
  await StatusUsers.findOrCreate({ where: { status: 'INACTIVE' } });
  console.log('Estados de usuarios creados');
};

const creationUserAdmin = async () => {
  const [role, created] = await Role.findOrCreate({
    where: { rol: 'ADMIN_ROL' },
  });
  const [user, userCreated] = await User.findOrCreate({
    where: {
      email: 'admin@admin.com',
    },
    defaults: {
      name: 'Admin',
      password: User.encriptPass('adminUma.'),
    },
  });
  const existingRole = await user.getRole();

  if (existingRole === null || existingRole !== 1) {
    await user.setRole(role);
  }
  console.log('UserAdmin');
};

const creationUser = async () => {
  const [role, createdRole] = await Role.findOrCreate({
    where: { rol: 'USER_ROL' },
  });
  const [userStatus, createdUserStatus] = await StatusUsers.findOrCreate({
    where: { status: 'INACTIVE' },
  });
  const [user, userCreated] = await User.findOrCreate({
    where: {
      email: 'test@test.com',
    },
    defaults: {
      name: 'test',
      password: User.encriptPass('testUma.'),
    },
  });
  const existingRole = await user.getRole();
  const existingUserStatus = await user.getStatusUsers();

  if (existingRole === null || existingRole !== 1) {
    await user.setRole(role);
  }
  if (existingUserStatus === null) {
    await user.setStatusUsers(userStatus);
  }

  console.log('User');
};

const creationUsers = async () => {
  await creationUserAdmin();
  await creationUser();
};

const addDataBbDd = async () => {
  await dbConection();
  await creationStatusUsersRequired();
  await creationRolesRequired();
  await creationStatusOrdersRequired();
  await creationUserAdmin();
  await creationUser();
  await dbClose();
};

module.exports = {
  creationUsers,
  addDataBbDd,
};
