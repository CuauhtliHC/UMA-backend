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

router.get('/validate', validateAuth, validateControllers);
router.post('/register', userRegister, validateRegister);
router.get('/getAllUsers', validateAdmin, getAllUsers);
router.get('/getUserById', getUserById);
router.get('/getAllUsersBanned', getAllUsersBanned);
router.put('/updateUser', updateUser);
router.put('/disableUser', disableUser);
// get all users
// get by id
// get all users banned
// put update users
// delete user

module.exports = router;
