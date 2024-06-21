// models/seller.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const sellerSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Seller', sellerSchema);
