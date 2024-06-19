const mongoose = require('mongoose');

const forexReserveSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('ForexReserve', forexReserveSchema);
