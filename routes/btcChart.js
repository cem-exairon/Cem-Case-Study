const path = require('path');

const express = require('express');

const btcChartController = require('../controllers/priceChartController');

const router = express.Router();

// Route to get Btcusd best ask prices(last 24h)
router.get('/btcPrice', btcChartController.getBtcPrices);

// Route to create Btcusd best ask price data
router.post('/btcPrice', btcChartController.postBtcPrices);

// Route for index page
router.get('/', btcChartController.getIndexPage);

module.exports = router;
