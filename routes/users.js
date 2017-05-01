var express = require('express');
var router = express.Router();

var db = require('./db');
var connection = db();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/input_stock',function(req,res,next){
  if(req.body.name==""||req.body.price==""||req.body.date==""||req.body.publishment==""||req.body.store==""||req.body.amount==""||req.body.category==""){    
    res.redirect('/get_stock_insert')
    return
  }
  var book_name=req.body['name'],
      book_price=req.body['price'],
      book_date=req.body['date'],      
      book_publishment=req.body['publishment'],
      book_store=req.body['store'],
      book_amount=req.body['amount'],
      book_category=req.body['category'];        
 
     var sql_str = "SELECT * FROM Book_Stock WHERE  name=?"
     connection.query(sql_str,book_name, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results!=""){
          console.log("Already exist");
          res.redirect('/users/get_stock_insert'); 
          return;
        }
         else{
                var sql_str = "INSERT INTO Book_Stock (name,price,date,publishment,store,amount,category)\
                                value('"+book_name+"',"+book_price+",'"+book_date+"','"+book_publishment+"',\
                                  '"+book_store+"',"+book_amount+",'"+book_category+"')"
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

});


function StrAdd(str,str_add){
  str = str+str_add
  console.log("haha"+str)
  return str;
}


router.post('/search_stock',function(req,res,next){
  /*if(req.body.name==""||req.body.price==""||req.body.date==""||req.body.publishment==""||req.body.store==""||req.body.amount==""||req.body.category==""){    
    res.redirect('/get_stock_insert')
    return
  }*/
  var count_flag=0;
  var book_name=req.body['name'],
      book_price=req.body['price'],
      book_date=req.body['date'],      
      book_publishment=req.body['publishment'],
      book_store=req.body['store'],
      book_amount=req.body['amount'],
      book_category=req.body['category'];        
 
  
  
     var sql_str = "SELECT * FROM Book_Stock WHERE"
     if(book_name!=""){sql_str+=" name='"+book_name+"' ";count_flag++;}
     
     if(book_price!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" price="+book_price+" ";count_flag++;}
     if(book_date!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" date='"+book_date+"' ";count_flag++;}
     if(book_publishment!=""){if(count_flag>0)sql_str+=" AND";sql_str+=" publishment='"+book_publishment+"' ";count_flag++;}
     if(book_store!=""){if(count_flag)sql_str+=" AND";sql_str+=" store='"+book_store+"' ";count_flag++;}
     if(book_amount!=""){if(count_flag)sql_str+=" AND";sql_str+=" amout="+book_amount+" ";count_flag++;}
     if(book_category!=""){if(count_flag)sql_str+=" AND";sql_str+=" category='"+book_category+"' ";}
         
     //console.log(sql_str)
     connection.query(sql_str, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results==""){
          console.log("Found Nothing");
          res.redirect('/users/get_stock_search'); 
          return;
        }
         console.log(results)
         //res.redirect('/users/get_stock_search'); 
        res.render('sys/stock_page_search',{results:results})
     });  

});


router.get('/get_stock',function(req,res,next){   
    res.render('sys/stock_page');

});

router.get('/get_stock_insert',function(req,res,next){    
    res.render('sys/stock_page_insert');

});

router.get('/get_stock_search',function(req,res,next){    
    res.render('sys/stock_page_search',{results:[]});

});



module.exports = router;
