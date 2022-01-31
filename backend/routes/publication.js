const express = require('express');
const router = express.Router();
const ctrlPublication = require('../controllers/publication');

// Importer nos middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ctrlPublication.createPublication);
router.get('/', auth, ctrlPublication.getAllPublication);
router.get('/:id', auth, ctrlPublication.getOnePublication);
router.put('/:id', auth, multer, ctrlPublication.updatePublication);
router.delete('/:id', auth, ctrlPublication.deletePublication);

module.exports = router;