var express = require('express');
var app = express();

var api = require('./api/api.js');
var frontend = require('./frontend/frontend.js');

app.use(api);
app.use(frontend);


var port = process.env.PORT || 8080;

// start Server
app.listen(port);
console.log('Listen on Port: ' + port);
