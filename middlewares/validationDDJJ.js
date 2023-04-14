const dayjs = require('dayjs');
const { userByIdService } = require('../services/usersServices');

const validateDDJJ = async (req, res, next) => {
  const userRes = res.user;
  const dataValues = await userByIdService(userRes.id);
  console.log(dataValues);
  res.user = dataValues;
  const { user } = res;

  if (!user.dataValues || user.dataValues.deleted) {
    return res.status(404).json({
      msg: 'User Not found',
    });
  }

  const date = dayjs().format('YYYY-MM-DD');
  if (!user.dataValues.swornStatementId) {
    return next();
  }
  const ddjjDate = dayjs(
    user.dataValues.SwornStatements.dataValues.createdAt,
  ).format('YYYY-MM-DD');
  if (date === ddjjDate) {
    return res.status(404).json({
      msg: 'ya completaste la declaracion jurada hoy',
    });
  }
  return next();
};

module.exports = validateDDJJ;
