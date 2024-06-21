// controllers/sellerController.js

const Seller = require('../models/seller');
const ExchangeRate = require('../models/exchangeRate');

exports.createSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateSellerRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { fromCurrency, toCurrency, rate } = req.body;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found' });
    }
    const exchangeRate = new ExchangeRate({ seller: id, fromCurrency, toCurrency, rate });
    await exchangeRate.save();
    res.send(exchangeRate);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.send(sellers);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSellerRates = async (req, res) => {
  try {
    const { fromCurrency, toCurrency } = req.params;
    const rates = await ExchangeRate.find({ fromCurrency, toCurrency })
      .populate('seller')
      .sort({ date: -1 })
      .exec();
    const latestRates = rates.reduce((acc, rate) => {
      if (!acc[rate.seller.name]) {
        acc[rate.seller.name] = rate.rate;
      }
      return acc;
    }, {});
    res.send(latestRates);
  } catch (error) {
    res.status(400).send(error);
  }
};
