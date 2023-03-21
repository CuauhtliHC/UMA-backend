const InProgressOrders = require('./inProgressOrders');
const Log = require('./log');
const Order = require('./order');
const Package = require('./package');
const RecoveryToken = require('./recoveryToken');
const Role = require('./role');
const User = require('./user');

Role.hasMany(User, { as: 'Users', foreignKey: 'roleId' });
User.belongsTo(Role, { as: 'Role', foreignKey: 'roleId' });

InProgressOrders.hasMany(Order, {
  as: 'Order',
  foreignKey: 'inProgressOrdersId',
});
Order.belongsTo(InProgressOrders, {
  as: 'InProgressOrder',
  foreignKey: 'inProgressOrdersId',
});

User.hasMany(Log, { as: 'Logs', foreignKey: 'userId' });
Log.belongsTo(User, { as: 'User', foreignKey: 'userId' });

User.belongsToMany(Order, { through: 'UsersOrders' });
Order.belongsToMany(User, { through: 'UsersOrders' });

Package.hasMany(Order, { as: 'Order', foreignKey: 'PackageId' });
Order.belongsTo(Package, { as: 'Package', foreignKey: 'PackageId' });

User.hasMany(RecoveryToken, { as: 'Logs', foreignKey: 'userId' });
RecoveryToken.belongsTo(User, { as: 'User', foreignKey: 'userId' });

module.exports = {
  Order,
  User,
  Role,
  Log,
  Package,
  InProgressOrders,
};
