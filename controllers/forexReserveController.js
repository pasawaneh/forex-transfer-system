const ForexReserve = require('../models/forexReserve');

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
    res.status(201).send(reserve);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.getReserves = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
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

  