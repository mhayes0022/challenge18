const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./usersRoutes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;