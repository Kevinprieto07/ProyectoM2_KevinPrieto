const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { swaggerUi, swaggerDocument } = require('./config/swagger');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionando' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);
app.use(errorHandler);

module.exports = app;
