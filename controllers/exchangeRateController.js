const ExchangeRate = require('../models/exchangeRate');

exports.setExchangeRate = async (req, res) => {
    const { fromCurrency, toCurrency, rate } = req.body;
    const exchangeRate = new ExchangeRate({ fromCurrency, toCurrency, rate });
    try {
        await exchangeRate.save();
        res.status(201).send(exchangeRate);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getExchangeRates = async (req, res) => {
    try {
        const exchangeRates = await ExchangeRate.find();
        res.status(200).send(exchangeRates);
    } catch (error) {
        res.status(400).send(error);
    }
};
