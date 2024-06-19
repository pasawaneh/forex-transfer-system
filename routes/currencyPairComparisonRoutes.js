const express = require('express');
const router = express.Router();
const currencyPairComparisonController = require('../controllers/currencyPairComparisonController');

router.get('/compare', currencyPairComparisonController.compareCurrencyPairs);

module.exports = router;
