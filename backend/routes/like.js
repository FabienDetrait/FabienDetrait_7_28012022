const express = require('express');
const router = express.Router();
const ctrlLike = require('../controllers/like');

// Importer nos middlewares
const auth = require('../middleware/auth');

router.post('/:id/like', auth, ctrlLike.likePublication);

module.exports = router;