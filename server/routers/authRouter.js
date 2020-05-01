var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');
/* GET users listing. */



router.post('/login', function (req, res) {    
    
    if(req.cookies.AdminLogin == 'true'){
        res.redirect('/#/main');
        return;
    }
    
    if(connection == null){
        connection = mysql_dbc.get();
    }
    

    var data = req.body;    
    
    var stmt = 'select * from auth_admin where auth_id = \''+data.userId+'\' and auth_pw = \''+md5(data.userPw)+'\'';        
    connection.query(stmt, function (err, result) {
        res.json(result);
    })
});
  
router.post('/pwcheck',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    var data = req.body;
    console.log(data.pw);
    var stmt = 'select * from auth_admin where auth_id = \'admin\' and auth_pw = \''+md5(data.pw)+'\'';
    
    connection.query(stmt, function (err, result) {
        res.json(result);
    })
})

router.post('/pwchange',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    var data = req.body;    
    var stmt = 'update maindb.auth_admin set auth_pw=md5(\''+data.pw+'\') where auth_id="admin";';
    var resultJson = {};
    console.log(md5(data.pw) + " / " + md5(md5(data.pw)));
    connection.query(stmt, function (err, result) {                
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;
            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
})

router.get('/callList',function(req,res){    
    if(connection == null){
        connection = mysql_dbc.get();
    }
    var data = req.query;
    
    var stmt = 'select * from customer_info';      
    var resultJson = {};
    switch(req.query.type){
        case 'all':
            stmt = 'select * from customer_info';      
        break;
        case 'id':
            stmt += ' where customer_id = \''+req.query.id+'\'';            
        break;
        case 'name':
            stmt += ' where customer_name like \'%'+req.query.id+'%\'';
        break;
        case 'addr':
            stmt += ' where customer_addr like \'%'+req.query.id+'%\'';
        break;
        case 'phone':
            stmt += ' where customer_phone like \'%'+req.query.id+'%\'';
        break;        
    }
    
    connection.query(stmt, function (err, result) {   
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;
            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);  
    })
})

router.post('/addcustomer', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    var data = req.body;    
    var resultJson = {};
    var stmt = 'insert into maindb.customer_info(customer_name,customer_addr,customer_phone,customer_date) values(\''+data.name+'\',\''+data.addr+'\',\''+data.phone+'\',now())';        
    connection.query(stmt, function (err, result) {
        if(err) {                 
            resultJson.err = err;            
            // res.json(err);
        }else{            
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);  
        
    })
  });


  router.post('/deletecustomer', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;    
    console.log(data);
    var resultData = [];    
    var resultJson = {};
    var stmt = 'delete from customer_info where customer_id=\''+data.id+'\'';        
    connection.query(stmt, function (err, result) {            
        if(err) {     
            resultJson.id = data.id;       
            resultJson.err = err;
            
            // res.json(err);
        }else{
            resultJson.id = data.id;       
            resultJson.result = result;            
            //   res.json(result);
        }   
        
        res.json(resultJson);
    })
    
    
    
    // var stmt = 'update customer_info set customer_name=\''+data.name+'\', customer_addr=\''+data.addr+'\', customer_phone=\''+data.phone+'\',customer_updatedate=now() where customer_id=\''+data.id+'\'';        
    // connection.query(stmt, function (err, result) {
        
    //     if(err) {            
    //         res.json(err);
    //     }else{
            
    //         res.json(result);
    //     }
        
    // })
  });
module.exports = router;