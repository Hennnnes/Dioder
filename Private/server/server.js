var express = require('express');
var app = express();
var fs = require("fs");

var Redoid = require('redoid');
var redoid = Redoid({
    color: '#ff3200'
});

app.get('/', function (req, res) {
      res.end( JSON.stringify('startseite'));
});


app.get('/start', function (req, res) {
      console.log( data );
      res.end( data );
   });
});

app.get('/stop', function (req, res) {
  redoid.stop();
  console.log('redoid stopped');
  res.redirect('/');
});


app.get('/off', function (req, res) {
  redoid.turnOff([200]);
  console.log('Dioder turned off');
  res.redirect('/');
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
