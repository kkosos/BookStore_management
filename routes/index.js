var express = require('express');
var router = express.Router();


var db = require('./db');
var connection = db();

function detect_stock(req, res){
   var sql_str = "SELECT * FROM Book_Stock WHERE amount<" + 50 + " AND store='" + req.session.store + "'";
		 connection.query(sql_str, function(err, results) {
			if (err) {
				console.log(err);
			}
			console.log(results)
			res.render('sys/main_page',{results:results});

		 });
}



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logined){    
   
    detect_stock(req, res);
    
    
    ;return;}
   res.locals.error="";
  res.render('index');
});

router.get('/main', function(req, res, next) {
  if(!req.session.logined){res.redirect('/');return;}
  detect_stock(req, res)
  //res.render('sys/main_page', { title: 'Express' });
});

router.post('/reg', function(req, res, next) {
  if(req.body.username==""||req.body.username==""||req.body.username==""||req.body.username==""){
    
    res.redirect('/')
    return
  }
  
  console.log("reg...");
    var username=req.body['username'],
        password=req.body['password'],
	password2=req.body['password2'],
        auth_level=req.body['auth_level'],
        location=req.body['location'];
     if(password!=password2){
	  res.locals.error =  {type:0,text:"Username exists."}
	
          res.render('index');   
	  return;      
	}
     var sql_str = "SELECT * FROM Staff_status WHERE  Username=?"
     connection.query(sql_str,username, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results!=""){
          console.log("Already exist");
          //res.redirect('/reg_error'); 
		 var error_str = {type:0,text:"Username exists."}
		   res.locals.error=error_str||null;
		 res.render('index');
         
        }
         else{
                var sql_str = "INSERT INTO Staff_status (Username,password,auth_level,location,backup) value('"+username+"','"+password+"',"+auth_level+",'"+location+"',null)"
                  //console.log(sql_str);
                connection.query(sql_str, function(err, rows) {
                    if (err) {
                        console.log(err);

                    }console.log(rows);
                     res.render('index', { error_msg: 'Express' });
                });         
         }     
     
     });
 
});

router.post('/login', function(req, res, next) {
   if(req.body.username==""||req.body.username==""||req.body.username==""||req.body.username==""){
    
    res.redirect('/')
    return
  }
  console.log("login...");
    var username=req.body['username'],
        password=req.body['password'],
        auth_level=req.body['auth_level'],
        location=req.body['location'];        
  
    var sql_str = "SELECT * FROM Staff_status WHERE  Username=?"
       connection.query(sql_str,username, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results==""){
          console.log("Not exist");
          

          res.redirect('/login_error');          
        }
         
        else{
            if(username != results[0].Username||password != results[0].password){
              console.log("wrong")
               res.render('index', { title: 'Express' });
            }
            else {
             // console.log("right")
             
              res.locals.username = username;

            //設定session
              req.session.username = username; 
              req.session.store = results[0].location;
              req.session.logined=true;
              res.locals.authenticated = req.session.logined;
  	      console.log(req.session.store);
              //res.redirect('/');
               console.log("done")
               //res.redirect('/');
               detect_stock(req, res);
              // res.render('sys/main_page', { title: 'Express' });
            }
        }
        // use index.ejs
         
    });
});

router.get('/login_error',function(req,res){

  var error_str = {type:1,text:"Username or password wrong."}
   res.locals.error=error_str||null;
  res.render('index');
});

router.get('/logout', function(req, res) {
  req.session.logined=false;
  res.redirect('/');
});


router.get('/reg_error', function(req, res) {
 var error_str = "Username exists."
   res.locals.error=error_str||null;
 res.render('index');
});


module.exports = router;



