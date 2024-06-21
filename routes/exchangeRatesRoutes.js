// routes/exchangeRatesRoutes.js

const express = require('express');
const router = express.Router();
const exchangeRateController = require('../controllers/exchangeRateController');

router.post('/', exchangeRateController.createOrUpdateExchangeRate);
router.get('/', exchangeRateController.getExchangeRates);
router.delete('/:id', exchangeRateController.deleteExchangeRate);

module.exports = router;
