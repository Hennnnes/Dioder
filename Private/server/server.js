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

var redoid;

// start api page
router.get('/', function(req, res) {
  res.json({ message: 'welcome to my api! '});
});

router.post('/start', function(req, res) {
  // init redoid
  redoid = Redoid({
    color: '#ffffff'
  })
  res.json({ message: 'dioder turned on! '});
});

//  more routes for sample stuff
app.use('/api', router);

router.route('/color')
  .get(function(req, res) {
      if (redoid != null) {
        res.json({color: redoid.getColorHexValue()});
      } else {
        res.json({message: 'dioder off. Turn on first'});
      }
  })

router.route('/color/:color_id')
  .post(function(req, res) {
      if (redoid != null) {
        var color = req.params.color_id;
        var colorCheck = isColor(color);
        if (colorCheck != false) {
          if (redoid.isColorValid(colorCheck)) {
                redoid.change(color);
                res.json({message: 'color set: ' + colorCheck});
          } else {
              res.json({message: 'oops. not a valid color1'});
          }
        } else {
          res.json({message: 'oops. not a valid color' + colorCheck + color});
        }
      } else {
        res.json({message: 'dioder turned off. turn on first'});
      }
  });

router.route('/stop')
  .post(function(req, res) {
    if (redoid != null) {
      redoid.turnOff([0]);
      redoid = null;
      res.json({message: 'Dioder turned off'});
    } else {
      res.json({message: 'Dioder already turned off.'});
    }

  })


// START Server
app.listen(port);
console.log('Magically Port: ' + port);


function isColor(color) {
  var withHash =  /(^#[0-9A-F]{6}$)|([0-9a-f]{6}$)|([0-9a-f]{3}$)|(^#[0-9A-F]{3}$)/i.test(color);
  var withoutHash = /(^[0-9A-F]{6}$)|([0-9a-f]{6}$)|([0-9a-f]{3}$)|(^#[0-9A-F]{3}$)/i.test(color);
  if (withHash) {
    return color;
  }
  if (withoutHash) {
    return '#' + color;
  }
  return false;
}
