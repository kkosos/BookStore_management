var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
/* GET users listing. */

function detect_stock(req, res){
   var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + 50 + " AND store='" + req.session.store + "'";
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)
			res.render('sys/stock_page',{results:results,id:req.session.username});

		 });
}



router.post('/input_stock',function(req,res,next){
  res.locals.error="";
  res.locals.input=[];
  if(req.body.name==""){  
     res.locals.error="Name Field can't be empty"
     res.locals.input = req.body;
     res.render('sys/stock_page_insert',{id:req.session.username});
    return
  }
  
  
  
  //quick for update amount
  if(req.body.price==""||req.body.date==""||req.body.publishment==""||req.body.store==""||req.body.amount==""||req.body.category==""||req.body.language=="")
  {
     var sql_str = "SELECT * FROM Book_Stock WHERE  name='"+req.body.name+"'AND store='" + req.session.store+"'";
     //detcet if a book exist
     connection.query(sql_str,book_name, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results==""){
         res.locals.error="Can't find book"
         res.locals.input = req.body;
         res.render('sys/stock_page_insert',{id:req.session.username});
         return
        }
        else{//find the book then update amount
          
          var results_tmp = results[0];
          results_tmp.amount += parseInt(req.body.amount);
          var sql_update = "UPDATE Book_Stock SET amount='"+ results_tmp.amount+"' WHERE name='"+results_tmp.name+"'  AND store='"+results_tmp.store + "'"  ;
        				
        
        connection.query(sql_update, function(err, results) {
					if(err)
						console.log(err)

          
          res.render('sys/stock_page_insert',{id:req.session.username});
          return;
        
				});
          
          
          
        }
       
       
     });
    
    
  }
  
  else{
  //normal insert 
          
  var book_name=req.body['name'],
      book_price=req.body['price'],
      book_date=req.body['date'],      
      book_publishment=req.body['publishment'],
      book_store=req.body['store'],
      book_amount=req.body['amount'],
      book_category=req.body['category'],  
      book_language=req.body['language'];        
 
     var sql_str = "SELECT * FROM Book_Stock WHERE  name='"+book_name+"' store='" + book_store+"'";
     connection.query(sql_str,book_name, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results!=""){
          console.log("Already exist");
          tmp = results.amount + book_amount;
          sql_str = "UPDATE Book_Stock SET amount='" + tmp + "'";
          
                connection.query(sql_str, function(err, rows) {
                          if (err) {
                              console.log(err);


                          }
                           res.redirect('/users/get_stock_insert'); 
                           return;

                      });        
          
        }
         else{
                var sql_str = "INSERT INTO Book_Stock (name,price,date,publishment,store,amount,category)\
                                value('"+book_name+"',"+book_price+",'"+book_date+"','"+book_publishment+"',\
                                  '"+book_store+"',"+book_amount+",'"+book_category+"','"+book_language+"')"
                  //console.log(sql_str);
                connection.query(sql_str, function(err, rows) {
                    if (err) {
                        console.log(err);
                       

                    }
                     res.redirect('/users/get_stock_insert'); 
                     return;
                  
                });         
         }     
     
     });  

  
  
  }
  
});




router.post('/search_stock',function(req,res,next){
  /*if(req.body.name==""||req.body.price==""||req.body.date==""||req.body.publishment==""||req.body.store==""||req.body.amount==""||req.body.category==""){    
    res.redirect('/get_stock_insert')
    return
  }//*/
	console.log(req.body)
  var count_flag=0;
  var book_name=req.body['name'],
      book_price=req.body['price'],
      book_date=req.body['date'],      
      book_publishment=req.body['publishment'],
      book_store=req.body['store'],
      book_amount=req.body['amount'],
      book_category=req.body['category'],      
      book_language=req.body['language'];    
 
  

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
     console.log(sql_str)
     connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results==""){
          console.log("Found Nothing");
	  
	  res.render('sys/stock_page_search',{results:[],id:req.session.username})
          return;
        }
         console.log(results)
         //res.redirect('/users/get_stock_search'); 
        res.render('sys/stock_page_search',{results:results,id:req.session.username})
     });  

});


router.get('/get_stock_list',function(req,res,next){        
	var sql_str ="select * from Book_Stock where store='" + req.session.store+"'";
	//var sql_str ="select Storename from Book_Store ";
	
	//var sql_str ="select DISTINCT category from Book_Stock ";
        //var sql_str ="select DISTINCT publishment from Book_Stock ";
	connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }	
		  res.render('sys/stock_page_search',{results:results,id:req.session.username})
     });  

});



router.get('/get_stock',function(req,res,next){   
  detect_stock(req, res);
});



router.get('/get_stock_insert',function(req,res,next){ 
	if(!req.session.logined){res.redirect('/');return;}
	res.locals.error="";
  	res.locals.input=[];
    res.render('sys/stock_page_insert',{id:req.session.username});

});

module.exports = router;
