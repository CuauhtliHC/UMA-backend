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
  validateRegister,
} = require('../middlewares/validations/users_validation');
const { validateAuth, validateAdmin } = require('../middlewares/auth');
const {
  validateUpdate,
  validateForBanUser,
} = require('../middlewares/validations/validate_update_user');

router.get('/me', validateAuth, validateControllers);
router.post('/register', userRegister, validateRegister);
router.get('/getAllUsers', validateAdmin, getAllUsers);
router.get('/getUserById/:id', getUserById);
router.get('/getAllUsersBanned', getAllUsersBanned, validateAdmin);
router.put('/updateUser/:id', updateUser, validateUpdate);
router.put('/disableUser', disableUser, validateAdmin, validateForBanUser);

module.exports = router;
