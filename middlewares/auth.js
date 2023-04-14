const { validateToken } = require('../config/tokens');
const { userByIdService } = require('../services/usersServices');

// validate auth

function validateAuth(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).send('sarasa');

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  res.user = user;

  next();
}

// validate ADMIN_ROL

function validateAdmin(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  if (user.rol !== 'ADMIN_ROL') return res.sendStatus(401);
  res.user = user;

  next();
}
// validate USER_ROL

function validateUser(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);
  if (user.rol !== 'USER_ROL') return res.sendStatus(401);
  res.user = user;

  next();
}

module.exports = { validateAuth, validateAdmin, validateUser };
