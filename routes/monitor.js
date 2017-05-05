//var express = require('express');
//var router = express.Router();

var db = require('./db');
var connection = db();

var second = 1*1000;
var set_amount="50"

module.exports = (socket)=>{
	//setInterval(callit,second);
	socket.on("test54",function(msg){console.log(msg)});
	socket.emit("test3","go to helasdasdl")
	function callit(){
		console.log("Monitor...ss")
		 var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + set_amount;
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)


		 });

	};
	//return router;
};

