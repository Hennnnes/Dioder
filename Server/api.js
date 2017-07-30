// basic expressjs requires
const express = require('express'),
       app = module.exports = express(),
       routes = require('./routes/routes.js'),
       bodyParser = require('body-parser');

// require config
const config = require('./config/config.json');
const mode = config.local;

// body-parser to get data from post request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// start Server
app.listen(mode.port, () => {
    console.log('Listen on Port: ' + mode.port);
});
