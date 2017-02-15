var express = require('express');
var app = express();
//var fs = require("fs");

var bodyParser = require("body-parser");
var Redoid = require('redoid');


// body-parser to get data from post request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// init redoid
var redoid = Redoid({
  color: '#ffffff'
})

// sample route
router.get('/', function(req, res) {
  res.json({ message: 'welcome to my api! '});
});


//  more routes for sample stuff
app.use('/api', router);

router.route('/color')
  .get(function(req, res) {
      res.json({color: redoid.getColorHexValue()});
  })

  router.route('/color/:color_id')

      // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
      .get(function(req, res) {
          var color = req.params.color_id;
          if (redoid.isColorValid(color)) {
              redoid.change(color);
              res.json({message: 'color set: ' + color});
          } else {
            res.json({message: 'oops. not a valid color'});
          }
      });

router.route('/stop')
  .get(function(req, res) {
    redoid.turnOff([0]);
    res.json({message: 'Dioder turned off'});
  })


// START Server
app.listen(port);
console.log('Magically Port: ' + port);



// var redoid = Redoid({
//     color: '#ff3200'
// });
//
// app.get('/', function (req, res) {
//       res.end( JSON.stringify('startseite'));
// });
//
//
// app.get('/start', function (req, res) {
//       console.log( data );
//       res.end( data );
//    });
// });
//
// app.get('/stop', function (req, res) {
//   redoid.stop();
//   console.log('redoid stopped');
//   res.redirect('/');
// });
//
//
// app.get('/off', function (req, res) {
//   redoid.turnOff([200]);
//   console.log('Dioder turned off');
//   res.redirect('/');
// });
//
// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)
// })
