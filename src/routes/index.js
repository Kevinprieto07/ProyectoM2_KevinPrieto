const { Router } = require('express');
const authorsRoutes = require('./authors.routes');

const router = Router();

router.use('/authors', authorsRoutes);

module.exports = router;
