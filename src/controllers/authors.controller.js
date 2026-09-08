const authorsService = require('../services/authors.service');

async function getAllAuthors(req, res) {
  const authors = await authorsService.getAllAuthors();
  res.json(authors);
}

async function getAuthorById(req, res) {
  const author = await authorsService.getAuthorById(req.params.id);
  if (!author) {
    return res.status(404).json({ message: 'Author no encontrado' });
  }
  res.json(author);
}

async function createAuthor(req, res, next) {
  try {
    const newAuthor = await authorsService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Ya existe un author con ese email' });
    }
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    const updatedAuthor = await authorsService.updateAuthor(req.params.id, req.body);
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author no encontrado' });
    }
    res.json(updatedAuthor);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Ya existe un author con ese email' });
    }
    next(err);
  }
}

async function deleteAuthor(req, res) {
  const deletedAuthor = await authorsService.deleteAuthor(req.params.id);
  if (!deletedAuthor) {
    return res.status(404).json({ message: 'Author no encontrado' });
  }
  res.status(204).send();
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
