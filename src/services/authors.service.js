const pool = require('../config/db');

async function getAllAuthors() {
  const { rows } = await pool.query('SELECT * FROM authors ORDER BY id;');
  return rows;
}

async function getAuthorById(id) {
  const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1;', [id]);
  return rows[0];
}

async function createAuthor({ name, email, bio }) {
  const { rows } = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *;',
    [name, email, bio]
  );
  return rows[0];
}

async function updateAuthor(id, { name, email, bio }) {
  const { rows } = await pool.query(
    'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *;',
    [name, email, bio, id]
  );
  return rows[0];
}

async function deleteAuthor(id) {
  const { rows } = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *;', [id]);
  return rows[0];
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
