const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');
const emailValidator = require('../middleware/email');
const passwordSchema = require('../middleware/password');

router.post('/signup', emailValidator, passwordSchema, ctrlUser.signup);
router.post('/login', ctrlUser.login);

module.exports = router;