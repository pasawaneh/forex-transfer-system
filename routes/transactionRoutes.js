const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Ensure all routes have valid callback functions
router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);

module.exports = router;
