const fs = require('fs');


exports = module.exports = function(io){

	io.on("connection",function(socket){
	
		console.log("systenon")
		
	function a(){
		console.log("hahah")
	
	}
    socket.on('test',function(msg){console.log(msg)});
		socket.on('test2',function(msg){console.log(msg)});
	});

	return io;


}

/*

function callit(){
	console.log("Monitor...")
 	var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + set_amount;
	 connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }
	 	console.log(results)
		exports.a();
	 
	 });
};


setInterval(callit,second)
*/


/*
var socket_io = require("socket.io")();

socket_io.on('connection',function(socket){
	console.log("Socket on")
	
	
})

module.exports = socket_io;*/