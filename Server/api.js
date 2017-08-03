// basic expressjs requires
const express = require('express'),
       app = module.exports = express(),
       routes = require('./routes/routes.js'),
       bodyParser = require('body-parser'),
	   cors = require('cors');
	   auth = require('basic-auth');


	   var ip = '91.2.119.113',
	   port = '3000';

// require config
const config = require('./config/config.json');
const mode = config.local;

// body-parser to get data from post request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// allow cross origin
app.use(cors());

// app.use(function(req, res, next) {
//     var user = auth(req);
//
//     if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
//         res.statusCode = 401;
//         res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
//         res.end('Unauthorized');
//     } else {
//         next();
//     }
// });

app.use('/', routes);

// start Server
app.listen(mode.port, () => {
    console.log('Listen on Port: ' + mode.port);
});
