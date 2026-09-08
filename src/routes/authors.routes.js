const { Router } = require('express');
const authorsController = require('../controllers/authors.controller');
const validateAuthor = require('../middlewares/validateAuthor');

const router = Router();

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', validateAuthor, authorsController.createAuthor);
router.put('/:id', validateAuthor, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
