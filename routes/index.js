var express = require('express');
var router = express.Router();
var update  = require('./update.json')
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json(update);
});

router.post('/download', function(req, res, next) {
  var path = __dirname + `../files/${req.body.os}-v${req.body.app_version}-${req.body.update_number}.zip`;
  try {
    fs.statSync(path);
    var buf = fs.readFileSync(path);
    res.send(buf, { 'Content-Type': 'application/zip' }, 200);
  }catch(e) {
    res.status(404).json({});
  }
});

module.exports = router;
