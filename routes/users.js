var express = require('express');
var router = express.Router();


/* Dans le cadre du projet IAforall - Botilicious, nous n'utilisons pas cette page */


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
