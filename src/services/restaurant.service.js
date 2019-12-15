const rp = require('request-promise');
const config = require('../../config/config');

function getRestaurantIds(body) {
    const restaurantSearch = '/search';
    const options = {
        method: 'POST',
        uri: config.mongoUrls.restaurant + restaurantSearch,
        body: body,
        json: true // Automatically stringifies the body to JSON
    };
    return new Promise((resolve, reject) => {
        rp(options)
            .then(function (res) {
                let restaurantsList = { restaurants: [], date: body.date };
                res.data.result.forEach((restaurant) => {
                    restaurantsList.restaurants.push(restaurant._id);
                });
                getOrdersList(restaurantsList).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                })
            })
            .catch(function (err) {
                reject(err);
            });
    })
}
function getRevenueByOrders(body) {
    return new Promise((resolve, reject) => {
        getRestaurantIds(body)
            .then((res) => {
                let sum = 0;
                res.data.result.forEach((order) => {
                    sum += Number(order.total_amount);
                });
                let result = { sum: sum, NumberOfOrders: res.data.result.length };
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
    });
}

function getOrdersList(restaurantsList) {
    const orderList = '/list';
    const options = {
        method: 'POST',
        uri: config.mongoUrls.orders + orderList,
        body: restaurantsList,
        json: true // Automatically stringifies the body to JSON
    };
    return new Promise((resolve, reject) => {
        rp(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (err) {
                reject(err);
            });
    })
}

module.exports = {
    getRestaurantIds,
    getRevenueByOrders
}