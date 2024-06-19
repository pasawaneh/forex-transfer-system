const ForexPurchase = require('../models/forexPurchase');
const ForexReserve = require('../models/forexReserve');

exports.createForexPurchase = async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount, rate } = req.body;
  const quoteAmount = baseAmount * rate; // Calculate quoteAmount based on rate

  const forexPurchase = new ForexPurchase({
    baseCurrency,
    quoteCurrency,
    baseAmount,
    quoteAmount,
    rate
  });

  try {
    let baseReserve = await ForexReserve.findOne({ currency: baseCurrency });
    let quoteReserve = await ForexReserve.findOne({ currency: quoteCurrency });

    if (!baseReserve) {
      baseReserve = new ForexReserve({ currency: baseCurrency, amount: 0 });
    }
    if (!quoteReserve) {
      quoteReserve = new ForexReserve({ currency: quoteCurrency, amount: 0 });
    }

    baseReserve.amount -= baseAmount;
    quoteReserve.amount += quoteAmount;

    if (baseReserve.amount < 0) {
      return res.status(400).send({ error: 'Insufficient base currency reserve.' });
    }

    await baseReserve.save();
    await quoteReserve.save();
    await forexPurchase.save();
    res.status(201).send({ forexPurchase, baseReserve, quoteReserve });
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.getForexPurchases = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const purchases = await ForexPurchase.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ForexPurchase.countDocuments();
    res.status(200).json({
      purchases,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

  
