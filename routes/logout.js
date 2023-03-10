const express = require('express');
const { logoutControllers } = require('../controllers/logoutControllers');

const router = express.Router();

router.post('/', logoutControllers);

module.exports = router;
