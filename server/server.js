const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const app = express();
const auth = require('./routers/authRouter');
const detail = require('./routers/detailRouter');
const home = require('./routers/homeRouter');
const cors = require('cors');
var cookie = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookie());
app.use(express.static(path.join(__dirname,'../dist')));

var mysql_dbc = require('./database/db')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

app.use('/auth',auth);
app.use('/detail',detail);
app.use('/home',home);
app.get('/pageChange/:url',(req,res)=>{
    console.log(req.params.url);
    res.redirect('/#/'+req.params.url);
    //console.log(req.params.url);
})
 
const port = process.env.PORT || 3000;
app.set('port' , port );

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));