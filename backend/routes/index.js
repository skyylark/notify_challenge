const router = require('express').Router();
const superRoutes = require('./superRoutes');

router.use('/api', superRoutes);

module.exports = router;
