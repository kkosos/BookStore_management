var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
var set_amount=50;
/* GET users listing. */


function detect_stock(req, res,change){
   var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + 50 + " AND store='" + req.session.store + "'";
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)
			if(typeof change=="undefined"&&change!="true")
				res.render('sys/trade_page',{results:results,id:req.session.username});
			else{
				
				var sql_str = "SELECT trade_id,name,date FROM trade_record WHERE location='" + req.session.store + "'" ;
				 connection.query(sql_str, function(err, trade_result) {
					if (err) {
						console.log(err);
					}
					
						res.render('sys/trade_page_list',{results:results,trade_result:trade_result,id:req.session.username});

				 });
				
				
				
			
			}
		 });
}
router.get('/get_trade_list',function(req,res,next){   console.log("HAHA")
	if(!req.session.logined)res.redirect("/")
	
	detect_stock(req, res,"true")
	
	
	
	
});

router.get('/get_trade',function(req,res,next){   console.log("HAHA")
		if(!req.session.logined)res.redirect("/")
	 detect_stock(req, res)
});
router.get('/sell',function(req,res,next){
	
    if(!req.session.logined){    
    res.redirect('/');
    return
    }
	var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + set_amount + " AND store='" + req.session.store + "'";
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)
			res.render('sys/trade_page_sell',{results:results,id:req.session.username});

		 });
	
	
}); 
	
	

router.post('/sellit',function(req,res,next){
	
    if(!req.session.logined||req.body.name==""){    
    res.redirect('/get_trade');
    return
    }
	
	var 
	  book_name=req.body['name'],
      trade_time=parseInt(req.body['time'])||1,
      book_store=req.body['store']||req.session.store,      
      book_publishment=req.body['publishment'];
	
	
	var sql_str = "SELECT * FROM Book_Stock WHERE store='" + book_store+"'";	
	
	 if(book_name!=""){sql_str+=" AND"+" name='"+book_name+"' "}     
     if(book_publishment!=""){sql_str+=" AND "+" publishment='"+book_publishment+"' ";}
	
	
	console.log(sql_str)
	connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }	
		console.log(results)
		var results_tmp = results[0];
		console.log("GG2")
		var i=0;
		for(i=0;i<trade_time;i++)
			if(results_tmp.amount>0)
			{
				results_tmp.amount--;
				console.log("GG")
				var sql_update = "UPDATE Book_Stock SET amount='"+ results_tmp.amount+"' WHERE name='"+results_tmp.name+"'  AND store='"+results_tmp.store + "'"  ;
				console.log(sql_update)
				connection.query(sql_update, function(err, results) {
					if(err)
						console.log(err)


						var a = new Date().getTime();
						var b = new Date().getTimezoneOffset()*60000;
						var date_now = new Date(a-b).toISOString().replace('T',' ').substr(0,19);
						sql_str = "INSERT INTO trade_record (trade_id,name,price,date,location) VALUES (NULL,'"+results_tmp.name+"','"+results_tmp.price+"','"+date_now+"','"+book_store+"')";
						console.log(sql_str);
						connection.query(sql_str, function(err, results) {
							if(err)
								console.log(err)
				
						});	



				});




			}
			else{
				//notify system

			}//out of stock

		var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + set_amount + " AND store='" + req.session.store + "'";
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)
			if(i==trade_time)res.render('sys/trade_page_sell',{results:results,id:req.session.username});

		 });
		
     });  
	
});



module.exports = router;
