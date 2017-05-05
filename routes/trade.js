var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
/* GET users listing. */


router.get('/get_trade',function(req,res,next){   console.log("HAHA")
	
	res.render('sys/trade_page');
});
router.get('/sell',function(req,res,next){
	
    if(!req.session.logined){    
    res.redirect('/');
    return
    }
	
	
	res.render('sys/trade_page_sell');
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
		
		//INSERT INTO `trade_record`(`name`, `date`, `price`, `location`, `backup`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
		
		 // res.render('sys/trade_page_sell',{results:results})
		
		
		if(i==trade_time)res.render('sys/trade_page_sell');
     });  
	
	

});
/*
  

     var sql_str = "SELECT * FROM Book_Stock WHERE"
     if(book_name!=""){sql_str+=" name='"+book_name+"' ";count_flag++;}
     
     if(book_price!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" price="+book_price+" ";count_flag++;}
     if(book_date!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" date='"+book_date+"' ";count_flag++;}
     if(book_publishment!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" publishment='"+book_publishment+"' ";count_flag++;}
     if(book_store!=""){if(count_flag)sql_str+=" AND";sql_str+=" store='"+book_store+"' ";count_flag++;}
     if(book_amount!=""){if(count_flag)sql_str+=" AND";sql_str+=" amout="+book_amount+" ";count_flag++;}
     if(book_category!=""){if(count_flag)sql_str+=" AND";sql_str+=" category='"+book_category+"' ";count_flag++;}
     if(book_language!=""){if(count_flag)sql_str+=" AND";sql_str+=" language='"+book_language+"' ";count_flag++;}

     if(!count_flag){sql_str += " store='" + req.session.store + "'" ;}

*/


module.exports = router;
