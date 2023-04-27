const searchStatusUser = require('../services/statusUsersRequests');
const {
  userRegisterService,
  allUsersService,
  userByIdService,
  usersBannedService,
  disableUserService,
  updateUserService,
  forgotPasswordService,
  resetPasswordService,
  totalUserAFService,
} = require('../services/usersServices');
const { sendEmailRestorePassword } = require('../utils/sendEmail');

const userRegister = (req, res) => {
  const { name, email, password } = req.body;
  userRegisterService(name, email, password)
    .then(() => {
      res.status(201).json({ msg: 'El Usuario fue creado con éxito', email });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Register', error });
    });
};

const getAllUsers = (req, res) => {
  const { limit } = req.params;
  allUsersService(limit)
    .then(({ rows, count }) => {
      const dataUser = rows.map(
        ({
          id, name, email, active, deleted, roleId, Orders, Logs, Role, StatusUserId,
        }) => {
          return {
            id,
            name,
            email,
            active,
            deleted,
            roleId,
            Orders,
            percentage: Orders.length === 0 ? 0 : 1,
            Logs,
            StatusUserId,
            Role,
          };
        },
      );
      res.status(200).json({ count, rows: dataUser });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users', error });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  userByIdService(id)
    .then(({
      Logs, Orders, Role, active, deleted, email, name, roleId,
    }) => {
      res.status(200).json({
        id,
        Logs,
        Orders,
        Role,
        active,
        deleted,
        email,
        name,
        roleId,
      });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get User By Id', error });
    });
};

const getAllUsersBanned = (req, res) => {
  const { limit } = req.params;
  usersBannedService(limit)
    .then((users) => res.status(200).json(users))
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Get All Users Banned', error });
    });
};

const updateUser = (req, res) => {
  const {
    email, name, password, status,
  } = req.body;
  const { id } = req.params;
  updateUserService(id, email, name, password, status)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res
        .status(500)
        .json({ msg: 'Error - Update User In Status Banned', error });
    });
};

const disableUser = (req, res) => {
  const { id } = req.params;
  disableUserService(id)
    .then(() => res.status(201).json({ msg: 'User Updated' }))
    .catch((error) => {
      res
        .status(500)
        .json({ msg: 'Error - Update User In Status Banned', error });
    });
};
const changeStatus = async (req, res) => {
  const { path } = req;
  const userLogin = res.user;
  const user = await userByIdService(userLogin.id);
  const status = path.slice(1);
  const userStatus = await searchStatusUser(status);
  await user.setStatusUsers(userStatus);
  const userUpdate = await userByIdService(userLogin.id);

  res.status(200).json({
    msg: `Cambio de estado del usuario a ${status}`,
    userUpdate,
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  forgotPasswordService(email)
    .then((token) => {
      sendEmailRestorePassword(email, token) // revisar correctamente esta funcion
        .then(() => {
          res.status(200).json({ msg: 'Send Email' });
        })
        .catch((error) => {
          res.status(500).json({ msg: 'Error - Send Email', error });
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Error - Generate token', error });
    });
};

const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  resetPasswordService(token, password)
    .then(() => {
      res.status(204).json({ msg: 'Rest Password Success' });
    })
    .catch((error) => {
      res.send(500).json({ msg: 'Error - Reset Password', error });
    });
};

const getTotalUserAF = (req, res) => {
  totalUserAFService().then(({ userActives, userTotal }) => {
    const percentage = (userActives * 100) / userTotal;
    res.status(200).json({ userActives, userTotal, percentage });
  }).catch((error) => {
    res.send(500).json({ msg: 'Error - Get total user Actives', error });
  });
};

module.exports = {
  userRegister,
  getAllUsers,
  getUserById,
  getAllUsersBanned,
  updateUser,
  disableUser,
  forgotPassword,
  resetPassword,
  changeStatus,
  getTotalUserAF,
};
