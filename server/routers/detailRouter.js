var express = require('express');
var router = express.Router();
var mysql_dbc = require('../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');
/* GET users listing. */

  router.get('/get', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.query;        
    
    var resultJson = {};
    var stmt = 'select customer_id,customer_name,customer_addr,customer_phone,date_format(customer_date,"%Y-%m-%d") as customer_date,customer_memo from customer_info where customer_id=\''+data.id+'\'';        
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
  });

  


router.post('/updatecustomer', function (req, res) {       
  if(connection == null){
      connection = mysql_dbc.get();
  }
  
  var data = req.body;    
  
  var stmt = 'update customer_info set customer_name=\''+data.name+'\', customer_addr=\''+data.addr+'\', customer_phone=\''+data.phone+'\',customer_updatedate=now(),customer_memo=\''+data.memo+'\' where customer_id=\''+data.id+'\'';        
  connection.query(stmt, function (err, result) {
      
      if(err) {            
          res.json(err);
      }else{
          
          res.json(result);
      }
      
  })
});

router.get('/surgerylist',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var stmt = 'select * from surgery'
    connection.query(stmt,function(err,result){
        if(err) {            
            res.json(err);
        }else{
            
            res.json(result);
        }
    })
})
router.get('/detailsurgerylist',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data=req.query;
    console.log(data);

    var stmt = 'select * from surgery_detail where surgery_id=\''+data.id+'\''
    connection.query(stmt,function(err,result){
        if(err) {            
            res.json(err);
        }else{
            
            res.json(result);
        }
    })
})

router.get('/getHistoryList',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data=req.query;
    
    var stmt = 'select det.detail_name,det.detail_pay,his.pay,date_format(his.his_date,"%Y-%m-%d %h:%i") as his_date,his.his_type,his.memo from maindb.surgery_detail as det '+
    'join ( SELECT  his.history_id, his.history_pay as pay, cus.customer_name as name, his.detail_id as det_id, his.history_date as his_date, his.history_type as his_type,'+
        'his.history_memo as memo FROM maindb.surgery_history AS his join maindb.customer_info AS cus ON his.customer_id = cus.customer_id '+
    'where his.customer_id = \''+data.id+'\') as his on det.detail_id = his.det_id'
    connection.query(stmt,function(err,result){
        if(err) {            
            res.json(err);
        }else{
            
            res.json(result);
        }
    })
})

router.post('/addHistory',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data=req.body;
    var stmt = 'insert into surgery_history(customer_id,history_pay,detail_id,history_date,history_type,history_memo) values(\''+data.id+'\',\''+data.pay+'\',\''+data.category+'\',now(),\''+data.type+'\',\''+data.memo+'\')';        
    connection.query(stmt, function (err, result) {
        if(err) {            
            res.json(err);
        }else{            
            res.json(result);
        }
        
    })
})
module.exports = router;