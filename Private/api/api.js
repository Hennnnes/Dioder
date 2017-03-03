var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var Redoid = require('redoid');
var redoid;


// body-parser to get data from post request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/api', function(req, res) {
  res.json({message: 'welcome to /api'});
});

app.post('/api/start', function(req, res) {
    // init redoid
    if (typeof redoid === 'undefined') {
      redoid = Redoid({ color: '#ffffff' });
      res.json({ message: 'dioder turned on! '});
    } else {
      res.json({ message: 'dioder already turned on! '});
    }
  });

app.post('/api/sunrise', function(req, res) {
    var time = parseInt(req.body.time);
    time = time || 1500;

    if (redoid == null) {
      // init redoid with cool color
      redoid = Redoid({
        color: '#110100'
      });

      redoid.transition('#220300', time, 'easeInOutQuint');
      redoid.transition('#250300', time, 'easeInOutQuint');
      redoid.transition('#260600', time, 'easeInOutQuint');
      redoid.transition('#300c00', time, 'easeInOutQuint');
      redoid.transition('#401000', time, 'easeInOutQuint');
      redoid.transition('#501501', time, 'easeInOutQuint');
      redoid.transition('#602002', time, 'easeInOutQuint');
      redoid.transition('#803002', time, 'easeInOutQuint');
      redoid.transition('#a04004', time, 'easeInOutQuint');
      redoid.transition('#b54505', time, 'easeInOutQuint');
      redoid.transition('#d05007', time, 'easeInOutQuint');
      redoid.transition('#de5010', time, 'easeInOutQuint');

      res.json({message: 'sunrise done. ease time: ' + time});
    } else {
      res.json({message: 'turn lights off first!'});
    }
});

app.post('/api/alert', function(req, res) {
  var color = req.body.color;
  var colorCheck = isColor(color);

  if (colorCheck !== 'undefined') {
    if (redoid.isColorValid(colorCheck)) {
          var current = redoid.getColorHexValue();

          redoid.transition(colorCheck, 1500, 'easeInOutQuint');
          redoid.transition(current, 1500, 'easeInOutQuint');

          res.json({message: 'alert with color: ' + colorCheck});
    } else {
        res.json({message: 'oops. not a valid color'});
    }
  } else {
    res.json({message: 'oops. not a valid color'});
  }
});

app.get('/api/color', function(req, res) {
  if (typeof redoid !== 'undefined') {
    res.json({color: redoid.getColorHexValue()});
  } else {
    res.json({message: 'dioder off. Turn on first'});
  }
});

app.post('/api/color', function(req, res) {
  if (typeof redoid !== 'undefined') {
    var color = req.body.color;
    var colorCheck = isColor(color);
    if (colorCheck) {
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

app.post('/api/stop', function(req, res) {
  if (redoid != null) {
    redoid.turnOff([0]);
    redoid = null;
    res.json({message: 'Dioder turned off'});
  } else {
    res.json({message: 'Dioder already turned off'});
  }
});



// custom is color
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
