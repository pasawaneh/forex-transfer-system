const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    amount: { type: Number, required: true },
    exchangeRate: { type: Number, required: true },
    fee: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
