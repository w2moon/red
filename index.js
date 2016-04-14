var express = require('express');
var http = require('http');
var config = require('./config')();
var signature = require('./signature');
var template = require('art-template');
var bodyParser = require('body-parser');
var createSig = signature.getSignature(config);
var path = require('path');

var app = express();
template.config('base','');
template.config('extname','.html');
app.engine('.html',template.__express);
app.set('view engine','html');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '/public')));

//app.get('/red',function(req,res){
    //res.render('../public/index.html');
//})

 app.get('/sig',function(req,res){


    //var url = req.protocol + "://" + req.get('Host') + req.url;
    var url = "http://www.lovigame.com/"

    //var url = req.protocol + "://" + req.get('Host') + req.url;
    //var url = req.body.url;
    console.log(url)
    console.log(req.query);
    if(req.query && req.query.echostr){
        res.send(req.query.echostr);
        return;
    }
    createSig(url,function(error,result){
        res.send(result);
    })
});


http.createServer(app).listen(3002,function(){
     console.log("start");
})
