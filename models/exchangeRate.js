const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    rate: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
