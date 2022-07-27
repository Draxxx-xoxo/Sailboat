const router = require('express').Router();
const { getPermissions } = require('../utils/utils');

router.get('/', (req, res) => {

    res.render('docs', {

    });
});


module.exports = router;