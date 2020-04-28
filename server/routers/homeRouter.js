var express = require('express');
var router = express.Router();
var mysql_dbc = require('../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');
/* GET users listing. */

router.get('/getsurgerycount', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }

    var data = req.query;        
    
    var resultJson = {};
    var stmt = "SELECT count(*) as count, date_format(history_date,'%d') thisDay FROM maindb.surgery_history where date_format(history_date,'%Y-%m-%d') between '"+data.first+"' and '"+data.last+"' group by thisDay";        
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

router.get('/getsurgerylist', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.query;    
    var resultJson = {};
    var stmt = "select h.id,h.pay,date_format(history_date,'%d') as _day,date_format(history_date,'%r') as his_time,customer_name,detail_name from maindb.surgery_detail as sdet join (select h.id,h.pay,h.det_id,history_date,customer_name from maindb.customer_info as cus join  (SELECT history_id as id, customer_id as cus_id, history_pay as pay, detail_id as det_id, history_date FROM maindb.surgery_history where date_format(history_date,'%Y-%m-%d') between '"+data.first+"' and '"+data.last+"') as h on cus.customer_id = h.cus_id) as h on det_id = detail_id order by his_time asc";            
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

module.exports = router;