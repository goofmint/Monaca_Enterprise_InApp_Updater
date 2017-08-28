var express = require('express');
var router = express.Router();
var update  = require('./update.json')
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json(update);
});

router.post('/download', function(req, res, next) {
  console.log(req);
  var buf = fs.readFileSync(__dirname + `/${req.params.os}-v1.0.0.zip`);
  res.send(buf, { 'Content-Type': 'application/zip' }, 200);
});

module.exports = router;
