const express = require('express');

const router = express.Router();
const {
  userRegister,
  getAllUsers,
  getUserById,
  getAllUsersBanned,
  disableUser,
  updateUser,
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

router.get('/me', validateAuth, validateControllers);
router.post('/register', validateRegister, userRegister);
router.get('/getAllUsers/:limit', validateAdmin, validateLimit, getAllUsers);
router.get('/getUserById/:id', validateCheckUserIdExists, getUserById);
router.get('/getAllUsersBanned/:limit', validateAdmin, validateLimit, getAllUsersBanned);
router.put('/updateUser/:id', validateUpdate, validateCheckUserIdExists, updateUser);
router.put('/disableUser/:id', validateAdmin, validateCheckUserIdExists, disableUser);

module.exports = router;
