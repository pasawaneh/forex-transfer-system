// controllers/currencyPairComparisonController.js
const ForexReserve = require('../models/forexReserve');

exports.compareCurrencyPairs = async (req, res) => {
  const { targetCurrency, rates, targetAmount } = req.body;
  if (!targetCurrency || !rates || !targetAmount) {
    return res.status(400).send({ error: 'Target currency, rates, and target amount are required for comparison.' });
  }

  try {
    const reserves = await ForexReserve.find();
    const recommendations = [];
    const reserveMap = {};

    reserves.forEach(reserve => {
      reserveMap[reserve.currency] = reserve.amount;
    });

    for (const fromCurrency in rates) {
      const rate = rates[fromCurrency];
      const fromReserve = reserves.find(r => r.currency === fromCurrency);

      if (!fromReserve) {
        continue;
      }

      const cost = targetAmount / rate;
      const potentialProfit = (reserveMap[fromCurrency] >= cost) ? reserveMap[fromCurrency] * rate : 0;

      recommendations.push({
        fromCurrency,
        toCurrency: targetCurrency,
        rate,
        cost,
        potentialProfit,
        availableReserve: reserveMap[fromCurrency]
      });
    }

    const bestRecommendation = recommendations.sort((a, b) => b.potentialProfit - a.potentialProfit)[0];

    res.status(200).send({ recommendations, bestRecommendation });
  } catch (error) {
    console.log('Error comparing currency pairs:', error);
    res.status(500).send(error);
  }
};
