const express = require('express');
const router = express.Router();
const forexPurchaseController = require('../controllers/forexPurchaseController');

router.post('/', forexPurchaseController.createForexPurchase);
router.get('/', forexPurchaseController.getForexPurchases);

module.exports = router;
