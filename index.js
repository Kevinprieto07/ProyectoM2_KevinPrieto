const app = require('./src/app');
const { port } = require('./src/config/envs');

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
