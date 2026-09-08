const express = require('express');
const { port } = require('./src/config/envs');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
