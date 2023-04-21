const express = require('express');

const router = express.Router();
const {
  userRegister,
  getAllUsers,
  getUserById,
  getAllUsersBanned,
  disableUser,
  updateUser,
  forgotPassword,
  resetPassword,
  changeStatus,
} = require('../controllers/usersControllers');
const { validateControllers } = require('../controllers/validateControllers');
const {
  validateRegister, validateCheckUserIdExists,
} = require('../middlewares/validations/users_validation');
const { validateAuth, validateAdmin } = require('../middlewares/auth');
const {
  validateUpdate,
} = require('../middlewares/validations/validate_update_user');
const { validateLimit } = require('../middlewares/validations/validate_limit');
const { validateCheckEmail } = require('../middlewares/validations/validate_email');
const { validateTokenRestorePassword } = require('../middlewares/validations/validate_token_restore');

router.get('/me', validateAuth, validateControllers);
router.post('/register', validateRegister, userRegister);
router.get('/getAllUsers/:limit', validateAdmin, validateLimit, getAllUsers);
router.get('/getUserById/:id', validateCheckUserIdExists, getUserById);
router.get('/getAllUsersBanned/:limit', validateAdmin, validateLimit, getAllUsersBanned);
router.put('/updateUser/:id', validateCheckUserIdExists, validateUpdate, updateUser);
router.put('/disableUser/:id', validateAdmin, validateCheckUserIdExists, disableUser);
router.put('/finished', validateAuth, changeStatus);
router.put('/inavtive', validateAuth, changeStatus);
router.put('/forgotPassword', validateCheckEmail, forgotPassword);
router.get('/reset-password/:token', validateTokenRestorePassword, resetPassword);

module.exports = router;
