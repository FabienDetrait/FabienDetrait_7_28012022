const express = require('express');
const router = express.Router();
const ctrlComment = require('../controllers/comment');

// Importer nos middlewares
const auth = require('../middleware/auth');

router.post('/', auth, ctrlComment.createComment);
router.get('/:publicationId', auth, ctrlComment.getAllComment);
router.put('/:id', auth, ctrlComment.updateComment);
router.delete('/:id', auth, ctrlComment.deleteComment);

module.exports = router;