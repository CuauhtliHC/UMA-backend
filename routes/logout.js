const express = require('express');
const { logoutControllers } = require('../controllers/logoutControllers');

const router = express.Router();

router.post('/logout', logoutControllers);

module.exports = router;
