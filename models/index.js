const InProgressOrders = require('./inProgressOrders');
const Log = require('./log');
const Order = require('./order');
const Package = require('./package');
const Role = require('./role');
const SwornStatement = require('./swornStatement');
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

User.hasMany(Order, { as: 'Orders', foreignKey: 'orderId' });
Order.belongsTo(User, { as: 'User', foreignKey: 'userId' });

User.hasMany(SwornStatement, {
  as: 'SwornStatement',
  foreignKey: 'swornStatementId',
});
SwornStatement.belongsTo(User, { as: 'User', foreignKey: 'userId' });

Package.hasMany(Order, { as: 'Order', foreignKey: 'PackageId' });
Order.belongsTo(Package, { as: 'Package', foreignKey: 'PackageId' });

module.exports = {
  Order,
  User,
  Role,
  Log,
  Package,
  InProgressOrders,
};
