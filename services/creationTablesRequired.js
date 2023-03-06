const { Role, InProgressOrders, User } = require('../models');

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
};

module.exports = {
  creationStatusOrdersRequired,
  creationRolesRequired,
  creationUserAdmin,
};
