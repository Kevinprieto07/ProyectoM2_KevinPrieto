function validateAuthor(req, res, next) {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'El campo "name" es obligatorio y no puede estar vacío' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'El campo "email" es obligatorio y debe tener un formato válido' });
  }

  next();
}

module.exports = validateAuthor;
