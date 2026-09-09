const postsService = require('../services/posts.service');

async function getAllPosts(req, res) {
  const posts = await postsService.getAllPosts();
  res.json(posts);
}

async function getPostById(req, res) {
  const post = await postsService.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post no encontrado' });
  }
  res.json(post);
}

async function getPostsByAuthor(req, res) {
  const posts = await postsService.getPostsByAuthorId(req.params.authorId);
  res.json(posts);
}

async function createPost(req, res, next) {
  try {
    const newPost = await postsService.createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(400).json({ message: 'El author_id indicado no existe' });
    }
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const updatedPost = await postsService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.json(updatedPost);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(400).json({ message: 'El author_id indicado no existe' });
    }
    next(err);
  }
}

async function deletePost(req, res) {
  const deletedPost = await postsService.deletePost(req.params.id);
  if (!deletedPost) {
    return res.status(404).json({ message: 'Post no encontrado' });
  }
  res.status(204).send();
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};
