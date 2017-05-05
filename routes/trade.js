var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
/* GET users listing. */


router.get('/get_trade',function(req,res,next){   console.log("HAHA")
	var sql_str ="select * from trade_record";
											   res.render('sys/trade_page');
});
router.get('/sell',function(req,res,next){

	var sql_str=""
	

});




module.exports = router;
