# MiniBlog API

API REST para gestionar `authors` y `posts`, desarrollada para DevSpark como base del servicio de contenidos MiniBlog. Construida con Node.js, Express y PostgreSQL, con queries SQL parametrizadas (sin ORM).

## Stack

- Node.js + Express 5
- PostgreSQL (librería `pg`, sin ORM)
- Jest + Supertest (tests)
- OpenAPI 3.0 (documentación, servida en vivo con Swagger UI)

## Requisitos

- Node.js 20+
- PostgreSQL 17 (u otra versión compatible) instalado y corriendo localmente

## Instalación y ejecución local

1. Clona el repositorio e instala las dependencias:
   ```
   npm install
   ```

2. Crea un archivo `.env` en la raíz (basado en `.env.example`):
   ```
   PORT=3000
   DATABASE_URL=postgresql://usuario:password@localhost:5432/miniblog
   ```

3. Crea la base de datos en Postgres (una vez):
   ```
   psql -U postgres -h localhost -c "CREATE DATABASE miniblog;"
   ```

4. Crea las tablas:
   ```
   psql -U postgres -h localhost -d miniblog -f sql/setup.sql
   ```

5. (Opcional) Carga datos de ejemplo:
   ```
   psql -U postgres -h localhost -d miniblog -f sql/seed.sql
   ```

6. Levanta el servidor en modo desarrollo (con recarga automática):
   ```
   npm run dev
   ```
   La API queda disponible en `http://localhost:3000`.

## Tests

Los tests usan una base de datos separada (`miniblog_test`), para no afectar tus datos de desarrollo.

1. Crea la base de datos de test:
   ```
   psql -U postgres -h localhost -c "CREATE DATABASE miniblog_test;"
   ```

2. Créale las tablas:
   ```
   psql -U postgres -h localhost -d miniblog_test -f sql/setup.sql
   ```

3. Crea un archivo `.env.test` en la raíz:
   ```
   PORT=3000
   DATABASE_URL=postgresql://usuario:password@localhost:5432/miniblog_test
   ```

4. Corre los tests:
   ```
   npm test
   ```

## Documentación OpenAPI

Tres formas de verla:

- **En producción**: https://proyectom2kevinprieto-production.up.railway.app/api-docs
- **En local**, con el servidor corriendo: `http://localhost:3000/api-docs`
- **Sin levantar el servidor**: pega el contenido de [`openapi.yaml`](./openapi.yaml) en [editor.swagger.io](https://editor.swagger.io)

## Endpoints

### Authors
| Método | Ruta | Descripción |
|---|---|---|
| GET | /authors | Listar authors |
| GET | /authors/:id | Detalle de un author |
| POST | /authors | Crear author |
| PUT | /authors/:id | Actualizar author |
| DELETE | /authors/:id | Borrar author (borra sus posts en cascada) |

### Posts
| Método | Ruta | Descripción |
|---|---|---|
| GET | /posts | Listar posts |
| GET | /posts/:id | Detalle de un post |
| GET | /posts/author/:authorId | Posts de un author, con su detalle incluido |
| POST | /posts | Crear post |
| PUT | /posts/:id | Actualizar post |
| DELETE | /posts/:id | Borrar post |

## Deployment (Railway)

1. Crea un proyecto en [Railway](https://railway.app) y agrega un servicio de PostgreSQL.
2. Conecta este repositorio de GitHub como otro servicio dentro del mismo proyecto.
3. Configura las variables de entorno del servicio de la API:
   - `DATABASE_URL`: referencia la variable interna del servicio de Postgres (`${{Postgres.DATABASE_URL}}`, seleccionada desde el autocompletado de Railway).
   - `PORT`: no se define a mano, Railway la asigna automáticamente.
4. Genera un dominio público para la API (Settings → Networking → Generate Domain).
5. Habilita el acceso público del servicio de Postgres (Settings → Networking → Add Public Access) para poder correr los scripts SQL desde tu máquina.
6. Corre `sql/setup.sql` contra la base de datos de producción usando el connection string público de Postgres.

**URL de producción:** https://proyectom2kevinprieto-production.up.railway.app

