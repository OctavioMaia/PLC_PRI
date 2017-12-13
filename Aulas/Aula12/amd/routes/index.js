var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var partituras = req.db.get('partituras')
  partituras.find({},{sort: {obra:1}}).then((docs)=>{
    res.render('index', {plist:docs})
  })
})

module.exports = router;
