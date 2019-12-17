const restaurantService = require('../services/restaurant.service');

function getAllOrders(req, res) {
    restaurantService.getRestaurantIds(req.body)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
}

function getRevenue(req, res) {
    restaurantService.getRevenueByOrders(req.body)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
}


module.exports = {
    getAllOrders,
    getRevenue
};

