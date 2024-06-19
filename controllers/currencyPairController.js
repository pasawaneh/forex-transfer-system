// controllers/currencyPairController.js
const CurrencyPair = require('../models/currencyPair');

exports.getCurrencyPairs = async (req, res) => {
  try {
    const pairs = await CurrencyPair.find();
    res.status(200).send(pairs);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addCurrencyPair = async (req, res) => {
  const { fromCurrency, toCurrency } = req.body;
  if (!fromCurrency || !toCurrency) {
    return res.status(400).send({ error: 'From currency and to currency are required.' });
  }

  const pair = new CurrencyPair({ fromCurrency, toCurrency });

  try {
    await pair.save();
    res.status(201).send(pair);
  } catch (error) {
    res.status(500).send(error);
  }
};
