// models/exchangeRate.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const exchangeRateSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
