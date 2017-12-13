var express = require('express');
var router = express.Router();
var Partitura = require('../model/partituras.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  Partitura.find()
	.sort({obra:1})
	.exec((err, docs)=>{
		if(!err){
			res.render('index', {plist:docs})
		}
		else{
			return next(err)
		}
	})
});

module.exports = router;
