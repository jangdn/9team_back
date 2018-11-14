var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var product = require('./model/product');

var router = require('./routes')(app, product);

var server = app.listen(port, function(){
    console.log("Express server has started on port" + port);
});



var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongodb server");
});

mongoose.connect('mongodb://localhost/SEdb');
