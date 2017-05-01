
var mysql = require('mysql');
var DB_NAME = 'TEST';
var db=null;
module.exports = function () {
    if(!db) {
            db = mysql.createPool({
	connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'a',
    database:DB_NAME
        });
    }
    return db;
};

/*
var pool  = mysql.createPool({
	connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'a',
    database:DB_NAME
  
});*/