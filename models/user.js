const S = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../database/database');

class User extends S.Model {
  static encriptPass(password) {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
  }

  static validatePassword(password) {
    return this.encriptPass(password).then((newPassword) => newPassword === this.password);
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    deleted: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  },
);

User.beforeCreate((user) => {
  user.encriptPass(user.password);
});

module.exports = User;
