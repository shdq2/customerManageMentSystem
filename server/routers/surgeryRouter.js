var express = require('express');
var router = express.Router();
var mysql_dbc = require('../database/db')();
var connection = mysql_dbc.get();

var md5 = require('md5');
/* GET users listing. */

router.get('/searchtitle',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }

    var data = req.query;        
    var resultJson = {};
    var stmt = "SELECT * from surgery where surgery_name = '" + data.title+"'";        
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

router.post('/addtitle', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "insert into surgery(surgery_name,surgery_date) values('"+data.title+"',now())";
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

router.get('/searchsurgery',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }

    var data = req.query;        
    console.log(data);
    var resultJson = {};
    var stmt = "SELECT * from surgery_detail where surgery_id = '" + data.title+"' and detail_name='"+data.name+"'";        
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

router.post('/addsurgery', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "insert into surgery_detail(surgery_id,detail_name,detail_pay,detail_date) values('"+data.title+"','"+data.name+"','"+data.pay+"',now())";
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
router.post('/updatesurgeryuse', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "update surgery set surgery_use = "+data.surgery_use+" where surgery_id = '"+data.surgery_id+"'";
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
 router.post('/updatedetailuse', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "update surgery_detail set detail_use = "+data.detail_use+" where detail_id = '"+data.detail_id+"'";
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
 router.post('/updatesurgeryname', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "update surgery set surgery_name = '"+data.name+"' where surgery_id = '"+data.surgery_id+"'";
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
 router.post('/updatedetaildata', function (req, res) {       
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};
    var stmt = "update surgery_detail set detail_name = '"+data.name+"', detail_pay='"+data.pay+"', surgery_id="+data.title+" where detail_id = '"+data.id+"'";
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

 router.post('/deletecategory',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }
    
    var data = req.body;        
    console.log(data);
    var resultJson = {};

    var stmt = "delete from "+data.table+" where "+data.colum+" = " + data.id;
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
module.exports = router;