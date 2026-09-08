const express = require('express');
const { port } = require('./src/config/envs');
const routes = require('./src/routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionando' });
});

app.use(routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

