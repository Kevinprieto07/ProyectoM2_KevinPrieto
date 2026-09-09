const { Router } = require('express');
const postsController = require('../controllers/posts.controller');
const validatePost = require('../middlewares/validatePost');

const router = Router();

router.get('/', postsController.getAllPosts);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.get('/:id', postsController.getPostById);
router.post('/', validatePost, postsController.createPost);
router.put('/:id', validatePost, postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
