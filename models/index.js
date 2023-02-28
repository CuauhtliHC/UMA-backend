const InProgressOrders = require('./inProgressOrders');
const Log = require('./log');
const Order = require('./order');
const Packege = require('./packege');
const Role = require('./role');
const User = require('./user');

Role.hasMany(User, { as: 'Users', foreignKey: 'roleId' });
User.belongsTo(Role, { as: 'Role', foreignKey: 'roleId' });

InProgressOrders.hasMany(Order, {
  as: 'Orders',
  foreignKey: 'inProgressOrdersId',
});
Order.belongsTo(InProgressOrders, {
  as: 'InProgressOrders',
  foreignKey: 'inProgressOrdersId',
});

User.hasMany(Log, { as: 'Logs', foreignKey: 'userId' });
Log.belongsTo(User, { as: 'Users', foreignKey: 'userId' });

User.belongsToMany(Order, { through: 'UsersOrders' });
Order.belongsToMany(User, { through: 'UsersOrders' });

Packege.hasMany(Order, { as: 'Orders', foreignKey: 'packegeId' });
Order.belongsTo(Packege, { as: 'Packeges', foreignKey: 'packegeId' });

module.exports = {
  Order,
  User,
  Role,
  Log,
  Packege,
  InProgressOrders,
};
