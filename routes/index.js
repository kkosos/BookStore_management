var express = require('express');
var router = express.Router();


var db = require('./db');
var connection = db();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logined){res.render('sys/main_page');return;}
  res.render('index', { error_msg: '' });
});

router.get('/main', function(req, res, next) {
  if(!req.session.logined){res.redirect('/');return;}
  res.render('sys/main_page', { title: 'Express' });
});

router.post('/reg', function(req, res, next) {
  if(req.body.username==""||req.body.username==""||req.body.username==""||req.body.username==""){
    
    res.redirect('/')
    return
  }
  
  console.log("reg...");
    var username=req.body['username'],
        password=req.body['password'],
        auth_level=req.body['auth_level'],
        location=req.body['location'];
     var sql_str = "SELECT * FROM Staff_status WHERE  Username=?"
     connection.query(sql_str,username, function(err, results) {
        if (err) {
            console.log(err);
        }
        if(results!=""){
          console.log("Already exist");
          res.redirect('/reg_error');          
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
              console.log("right")
             
              res.locals.username = username;
              console.log(req.session)
            //設定session
              req.session.username = username; 
               
              req.session.logined=true;
              res.locals.authenticated = req.session.logined;
              //res.redirect('/');
               console.log("done")
               res.redirect('/');
               res.render('sys/main_page', { title: 'Express' });
            }
        }
        // use index.ejs
         
    });
});

router.get('/login_error',function(req,res){

  var error_str = "Username or password wrong."
   
  res.render('index', { error_msg: error_str ||null});
});

router.get('/logout', function(req, res) {
  req.session.logined=false;
  res.redirect('/');
});


router.get('/reg_error', function(req, res) {
 var error_str = "Username exists."
   
 res.render('index', { error_msg: error_str ||null});
});


module.exports = router;



