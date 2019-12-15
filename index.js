/**
 * library imports
 */
require('dotenv/config');
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
   res.send('Aggregator Gateway Server Started');
});

app.listen(config.port, (err) => {
    console.log('Aggregator Gateway Server is running at port ',  config.port);
});


module.exports = app;