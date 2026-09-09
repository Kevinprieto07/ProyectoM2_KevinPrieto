require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('Falta la variable de entorno DATABASE_URL');
}

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
};
