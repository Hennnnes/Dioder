var express = require('express');
var app = module.exports = express();
var Redoid = require('redoid');
var redoid;

// viewengine
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('frontend.ejs');
});
