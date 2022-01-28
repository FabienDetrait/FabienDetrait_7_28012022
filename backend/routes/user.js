const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');
const emailValidator = require('../middleware/email');

router.post('/signup', emailValidator, ctrlUser.signup);
router.post('/login', ctrlUser.login);

module.exports = router;