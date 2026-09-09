const pool = require('../config/db');

async function getAllPosts() {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY id;');
  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1;', [id]);
  return rows[0];
}

async function getPostsByAuthorId(authorId) {
  const { rows } = await pool.query(
    `SELECT
       p.id, p.title, p.content, p.published, p.created_at,
       a.id AS author_id, a.name AS author_name, a.email AS author_email, a.bio AS author_bio
     FROM posts p
     JOIN authors a ON a.id = p.author_id
     WHERE p.author_id = $1
     ORDER BY p.id;`,
    [authorId]
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    published: row.published,
    created_at: row.created_at,
    author: {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email,
      bio: row.author_bio,
    },
  }));
}

async function createPost({ author_id, title, content, published }) {
  const { rows } = await pool.query(
    'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *;',
    [author_id, title, content, published ?? true]
  );
  return rows[0];
}

async function updatePost(id, { author_id, title, content, published }) {
  const { rows } = await pool.query(
    'UPDATE posts SET author_id = $1, title = $2, content = $3, published = $4 WHERE id = $5 RETURNING *;',
    [author_id, title, content, published ?? true, id]
  );
  return rows[0];
}

async function deletePost(id) {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *;', [id]);
  return rows[0];
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};
