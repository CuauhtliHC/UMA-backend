const express = require('express');
const swornStatementPost = require('../controllers/swornStatementControllers');
const {
  validationSwornStatementPost,
} = require('../middlewares/validations/SwornStatement');

const router = express.Router();

router.post('/', validationSwornStatementPost, swornStatementPost);

module.exports = router;
