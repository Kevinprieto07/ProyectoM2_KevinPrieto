const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/config/db');

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE;');
  await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3);',
    ['Ada Lovelace', 'ada@miniblog.dev', 'Bio de prueba']
  );
});

afterAll(async () => {
  await pool.end();
});

describe('GET /authors', () => {
  it('responde 200 con la lista de authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Ada Lovelace');
  });
});

describe('POST /authors', () => {
  it('crea un author y responde 201', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Alan Turing',
      email: 'alan@miniblog.dev',
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Alan Turing');
  });

  it('responde 400 si falta el name', async () => {
    const res = await request(app).post('/authors').send({
      email: 'sinname@miniblog.dev',
    });
    expect(res.status).toBe(400);
  });
});

describe('PUT /authors/:id', () => {
  it('actualiza un author existente y responde 200', async () => {
    const created = await request(app).post('/authors').send({
      name: 'Original',
      email: 'original@miniblog.dev',
    });

    const res = await request(app).put(`/authors/${created.body.id}`).send({
      name: 'Actualizado',
      email: 'original@miniblog.dev',
      bio: 'Bio nueva',
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Actualizado');
  });
});

describe('GET /authors/:id', () => {
  it('responde 404 si el author no existe', async () => {
    const res = await request(app).get('/authors/9999');
    expect(res.status).toBe(404);
  });
});

describe('DELETE /authors/:id', () => {
  it('borra un author existente y responde 204', async () => {
    const created = await request(app).post('/authors').send({
      name: 'Temporal',
      email: 'temporal@miniblog.dev',
    });
    const res = await request(app).delete(`/authors/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});
