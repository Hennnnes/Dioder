var express = require('express');
var app = express();

var api = require('./api/api.js');
var frontend = require('./frontend/frontend.js');

app.use(express.static(__dirname + '/../Public'));
app.use(api);
app.use(frontend);
