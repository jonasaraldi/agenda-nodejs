var express = require('express');
var load = require('express-load');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var app = express();
var db = require('./libs/connect')();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendfile('./views/index.html');
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(3000);
module.exports = app;
