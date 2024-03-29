const InProgressOrders = require('./inProgressOrders');
const Log = require('./log');
const Order = require('./order');
const Package = require('./package');
const RecoveryToken = require('./recoveryToken');
const Role = require('./role');
const StatusUsers = require('./statusUser');
const SwornStatement = require('./swornStatement');
const User = require('./user');

Role.hasMany(User, { as: 'Users', foreignKey: 'roleId' });
User.belongsTo(Role, { as: 'Role', foreignKey: 'roleId' });

StatusUsers.hasMany(User, { as: 'Users', foreignKey: 'StatusUserId' });
User.belongsTo(StatusUsers, { as: 'StatusUsers', foreignKey: 'StatusUserId' });

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

User.hasMany(Order, { as: 'Orders', foreignKey: 'orderId' });
Order.belongsTo(User, { as: 'User', foreignKey: 'userId' });

SwornStatement.hasMany(User, { as: 'Users', foreignKey: 'roleId' });
User.belongsTo(SwornStatement, {
  as: 'SwornStatements',
  foreignKey: 'swornStatementId',
});

Package.hasMany(Order, { as: 'Order', foreignKey: 'PackageId' });
Order.belongsTo(Package, { as: 'Package', foreignKey: 'PackageId' });

User.hasMany(RecoveryToken, { as: 'RecoveryToken', foreignKey: 'userId' });
RecoveryToken.belongsTo(User, { as: 'User', foreignKey: 'userId' });

module.exports = {
  Order,
  User,
  Role,
  Log,
  Package,
  InProgressOrders,
  StatusUsers,
};
