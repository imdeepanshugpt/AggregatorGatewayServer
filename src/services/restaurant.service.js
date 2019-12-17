const rp = require('request-promise');
const config = require('../../config/config');
const serverURLS = require('../../config/consul');

function getRestaurantIds(body) {
    const restaurantSearch = 'search';
    const options = {
        method: 'POST',
        uri: serverURLS().restaurantServer[0] + restaurantSearch,
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
    const orderList = 'order/list';
    const options = {
        method: 'POST',
        uri: serverURLS().orderServer[0] + orderList,
        body: restaurantsList,
        json: true // Automatically stringifies the body to JSON
    };
    console.log(options);
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