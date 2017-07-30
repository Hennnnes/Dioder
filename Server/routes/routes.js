const routes = require('express').Router();
const Redoid = require('redoid');
let redoid;

routes.post('/api/status', (req, res) => {
    // init redoid
    if (!isRedoidOn()) {
        redoid = Redoid({color: '#ffffff'});
        res.json({message: 'dioder turned on!'});
    } else {
        redoid.turnOff([0]);
        redoid = null;
        res.json({message: 'dioder already turned on!'});
    }
});

routes.get('/api/status', (res,req) => {
	const status = (redoid) ? redoid.getColor() : false;

	if (status) {
		res.json({ color: status });
	} else {
		res.json({error: true, errorMsg: 'Dioder not turned on'});
	}
});

routes.post('/api/sunrise', (req, res) => {
    var duration = parseInt(req.body.time) || 1500;

    if (!redoid) {
        sunrise(duration);
        res.json({error: false, message: `sunrise duration: ${duration}`});
    } else {
        res.json({error: true, message: 'turn lights off first!'});
    }
});

routes.post('/api/alert', (req, res) => {
    var color = req.body.color;

    if (color && redoid.isColorValid(color)) {
        var current = redoid.getColorHexValue();

        redoid.transition(color, 1500, 'easeInOutQuint');
        redoid.transition(current, 1500, 'easeInOutQuint');

        res.json({ message: `alert with color: ${color}` });
    } else {
        res.json({error: 'oops. not a valid color'});
    }
});

routes.get('/api/color', (req, res) => {
    if (isRedoidOn()) {
        res.json({color: redoid.getColor()});
    } else {
        res.json({error: true, errorMsg: 'dioder off. Turn on first'});
    }
});

routes.post('/api/color', (req, res) => {
    var color = req.body.color;

    if (color && redoid.isColorValid(color)) {
        if (!redoid) { redoid = Redoid({color: color}); }

        redoid.change(color);
        res.json({ message: `color set: ${color}` });
    } else {
        res.json({error: true, errorMsg: 'oops. not a valid color.'});
    }
});

function isRedoidOn(){
	if (redoid) {
		return true;
	}
	return false;
}

function sunrise(duration) {
    redoid = Redoid({ color: '#110100' });

    redoid.transition('#220300', duration, 'easeInOutQuint');
    redoid.transition('#250300', duration, 'easeInOutQuint');
    redoid.transition('#260600', duration, 'easeInOutQuint');
    redoid.transition('#300c00', duration, 'easeInOutQuint');
    redoid.transition('#401000', duration, 'easeInOutQuint');
    redoid.transition('#501501', duration, 'easeInOutQuint');
    redoid.transition('#602002', duration, 'easeInOutQuint');
    redoid.transition('#803002', duration, 'easeInOutQuint');
    redoid.transition('#a04004', duration, 'easeInOutQuint');
    redoid.transition('#b54505', duration, 'easeInOutQuint');
    redoid.transition('#d05007', duration, 'easeInOutQuint');
    redoid.transition('#de5010', duration, 'easeInOutQuint');
}
