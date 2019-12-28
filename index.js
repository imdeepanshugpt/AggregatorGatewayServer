/**
 * library imports
 */
require('dotenv/config');
require('./config/consul');
const express = require('express');
const bodyParser = require('body-parser');

console.log('enviornment', process.env.NODE_ENV);

/**
 * configuration imports
 */
const config = require('./config/config');

const app = express();
app.use(bodyParser.json());

/**
 * routers imports
 */
const restaurant = require('./src/routes/restaurant');
app.use('/aggregator', restaurant);

app.get('/', (req, res) => {
    res.send('Aggregator Gateway Server Started Started process id is ' + process.pid +' and port is '+ PORT);
});

const PORT = process.env.PORT || 4444;
const IP_ADDRESS = process.env.IP_ADDRESS || '127.0.0.1';

app.listen(PORT, (err) => {
    console.log('Aggregator Gateway Server is running at IP, Port Number ', IP_ADDRESS, PORT);
});


module.exports = app;