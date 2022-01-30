const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user');

// Importer nos middlewares
const emailValidator = require('../middleware/email');
const passwordSchema = require('../middleware/password');

router.post('/signup', emailValidator, passwordSchema, ctrlUser.signup);
router.post('/login', ctrlUser.login);
router.get('/getOneUser/:id', ctrlUser.getOneUser);
router.put('/modifyEmail/:id', ctrlUser.modifyEmail);
router.delete('/deleteUser/:id', ctrlUser.deleteUser);

module.exports = router;