// routes/sellerRoutes.js
const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

router.post('/', sellerController.createSeller);
router.put('/:id/rate', sellerController.updateSellerRate);
router.get('/', sellerController.getSellers);
router.get('/rates/:fromCurrency/:toCurrency', sellerController.getSellerRates);

module.exports = router;
