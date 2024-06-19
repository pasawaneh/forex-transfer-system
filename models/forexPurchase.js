const mongoose = require('mongoose');

const forexPurchaseSchema = new mongoose.Schema({
  baseCurrency: {
    type: String,
    required: true
  },
  quoteCurrency: {
    type: String,
    required: true
  },
  baseAmount: {
    type: Number,
    required: true
  },
  quoteAmount: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ForexPurchase', forexPurchaseSchema);
