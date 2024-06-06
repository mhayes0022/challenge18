const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//console.log(); Figure out how to log which URL we're requesting
router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;
