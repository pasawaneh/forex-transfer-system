// /backend/routes/exchangeRates.js
const express = require('express');
const router = express.Router();
const exchangeRateController = require('../controllers/exchangeRateController');

router.post('/', exchangeRateController.setExchangeRate);
router.get('/', exchangeRateController.getExchangeRates);

module.exports = router;