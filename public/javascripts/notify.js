//javascript html

//var socket = io.connect();
/*
io.on('connection',function(socket){

	socket.on('test',function(msg){console.log("haha")})


});
*/
var socket=io();


$(document).keyup(function(e) {
	if (e.keyCode == 49) {
	console.log("ha")
	socket.emit('test',"go to hell")	
	socket.emit('test2',"go to hell222")	
  }
});