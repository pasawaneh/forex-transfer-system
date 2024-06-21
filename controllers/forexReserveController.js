// controllers/forexReserveController.js

const ForexReserve = require('../models/forexReserve');
const CurrencyPair = require('../models/currencyPair');

// Function to ensure reserves for all currency pairs
async function ensureReservesForAllCurrencyPairs() {
  try {
    const currencyPairs = await CurrencyPair.find();
    for (const pair of currencyPairs) {
      await ForexReserve.updateOne(
        { currency: pair.fromCurrency },
        { $setOnInsert: { currency: pair.fromCurrency, amount: 0 } },
        { upsert: true }
      );
      await ForexReserve.updateOne(
        { currency: pair.toCurrency },
        { $setOnInsert: { currency: pair.toCurrency, amount: 0 } },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error('Error ensuring reserves for all currency pairs:', error);
  }
}

exports.createOrUpdateReserve = async (req, res) => {
  const { currency, amount } = req.body;
  try {
    let reserve = await ForexReserve.findOne({ currency });
    if (reserve) {
      reserve.amount += amount;
    } else {
      reserve = new ForexReserve({ currency, amount });
    }
    await reserve.save();
    await ensureReservesForAllCurrencyPairs();  // Ensure reserves after updating
    res.status(201).send(reserve);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getReserves = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    await ensureReservesForAllCurrencyPairs();  // Ensure reserves when fetching
    const reserves = await ForexReserve.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ForexReserve.countDocuments();
    res.status(200).json({
      reserves,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.resetReserveByCurrency = async (req, res) => {
  const { currency } = req.params;
  try {
    const reserve = await ForexReserve.findOne({ currency });
    if (reserve) {
      reserve.amount = 0;
      await reserve.save();
      res.status(200).send({ message: 'Reserve reset successfully' });
    } else {
      res.status(404).send({ message: 'Reserve not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.ensureReservesForAllCurrencyPairs = ensureReservesForAllCurrencyPairs;
