function validatePost(req, res, next) {
  const { title, content, author_id } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'El campo "title" es obligatorio y no puede estar vacío' });
  }

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ message: 'El campo "content" es obligatorio y no puede estar vacío' });
  }

  if (author_id === undefined || author_id === null || author_id === '') {
    return res.status(400).json({ message: 'El campo "author_id" es obligatorio' });
  }

  next();
}

module.exports = validatePost;
