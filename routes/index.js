var express = require('express');
var router = express.Router();
var update  = require('./update.json')
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json(update);
});

router.post('/download/ios-v1.1.1.zip', function(req, res, next) {
  var buf = fs.readFileSync(__dirname + '/ios-v1.1.1.zip');
  res.send(buf, { 'Content-Type': 'application/zip' }, 200);
});

module.exports = router;
