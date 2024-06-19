const express = require('express');
const router = express.Router();
const forexReserveController = require('../controllers/forexReserveController');

router.post('/', forexReserveController.createOrUpdateReserve);
router.get('/', forexReserveController.getReserves);

module.exports = router;
