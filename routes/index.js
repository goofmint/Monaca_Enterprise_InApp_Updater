var express = require('express');
var router = express.Router();
var update  = require('./update.json')

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json(update);
});

module.exports = router;
