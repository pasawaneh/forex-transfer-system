// controllers/exchangeRateController.js

const ExchangeRate = require('../models/exchangeRate');

exports.createOrUpdateExchangeRate = async (req, res) => {
  const { seller, fromCurrency, toCurrency, rate, date } = req.body;

  try {
    let exchangeRate = await ExchangeRate.findOneAndUpdate(
      { seller, fromCurrency, toCurrency },
      { rate, date },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).send(exchangeRate);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getExchangeRates = async (req, res) => {
  try {
    const exchangeRates = await ExchangeRate.find().populate('seller');
    res.status(200).json(exchangeRates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExchangeRate = async (req, res) => {
  try {
    await ExchangeRate.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Exchange rate deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
};
