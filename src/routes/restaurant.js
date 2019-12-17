const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const aggregatorController = require('../controller/aggregator');

router.use(bodyParser.json());

router.post('/todaysOrder', aggregatorController.getAllOrders);
router.post('/todaysRevenue', aggregatorController.getRevenue);

module.exports = router;