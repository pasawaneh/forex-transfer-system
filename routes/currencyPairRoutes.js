// routes/currencyPairRoutes.js
const express = require('express');
const router = express.Router();
const currencyPairController = require('../controllers/currencyPairController');
const currencyPairComparisonController = require('../controllers/currencyPairComparisonController');

router.get('/', currencyPairController.getCurrencyPairs);
router.post('/', currencyPairController.addCurrencyPair);
router.post('/compare', currencyPairComparisonController.compareCurrencyPairs);

module.exports = router;
