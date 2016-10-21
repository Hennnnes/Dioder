var express = require('express');
var app = express();
var fs = require("fs");

var Redoid = requie('redoid');
var redoid = Redoid({
    color: '#ff3200'
});

var filename = __dirname + "/../Data/" + "users.json";



app.get('/start', function (req, res) {
   fs.readFile(filename, 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

app.get('/stop', function (req, res) {
  redoid.stop();
  res.redirect('/');
});

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile(filename, 'utf8', function (err, data) {
      data = JSON.parse( data );
      var user = data["user" + req.params.id]
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.get('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile(filename, 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})


// not working
app.get('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( filename, 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + id];

      console.log( data );
      res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
