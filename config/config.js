require('dotenv/config');

const config = {
    mongoUrls: { orders: process.env.MONGODB_URL_ORDERS, restaurant: process.env.MONGODB_URL_RESTAURANT },
    port: 8000
}

module.exports = config;