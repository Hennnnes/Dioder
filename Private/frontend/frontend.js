var express = require('express');
var app = module.exports = express();

// viewengine
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('frontend.ejs');
});
