const mongoose = require('mongoose');

const currencyPairSchema = new mongoose.Schema({
  fromCurrency: {
    type: String,
    required: true
  },
  toCurrency: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CurrencyPair', currencyPairSchema);
