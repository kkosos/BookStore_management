var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
var socket = require('./notify')(require('socket.io')());

var second = 30*1000;
var set_amount="50"


setInterval(callit,second)

function callit(){
	console.log("Monitor...ss")
 	 var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + set_amount;
	 connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }
	 	//console.log(results)
	 
		console.log(socket.sockets.emit("test2","go to hell"))
	 socket.sockets.emit("test2","go to hell")
	 
	 });
	
};



module.exports = router;
