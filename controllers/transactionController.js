const Transaction = require('../models/transaction');
const ForexReserve = require('../models/forexReserve');

exports.createTransaction = async (req, res) => {
    const { fromCurrency, toCurrency, amount, exchangeRate, fee } = req.body;
    const transaction = new Transaction({ fromCurrency, toCurrency, amount, exchangeRate, fee });

    try {
        console.log('Transaction Data:', req.body);  // Log the request body

        // Update Forex reserves
        const fromReserve = await ForexReserve.findOne({ currency: fromCurrency });
        let toReserve = await ForexReserve.findOne({ currency: toCurrency });

        console.log('From Reserve:', fromReserve);
        console.log('To Reserve:', toReserve);

        if (!fromReserve || fromReserve.amount < amount) {
            return res.status(400).send({ error: 'Insufficient funds in the reserve for ' + fromCurrency });
        }

        fromReserve.amount -= amount;

        if (toReserve) {
            toReserve.amount += amount * exchangeRate;
        } else {
            // Create a new reserve for the toCurrency if it doesn't exist
            toReserve = new ForexReserve({ currency: toCurrency, amount: amount * exchangeRate });
        }

        await fromReserve.save();
        await toReserve.save();

        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        console.error(error);  // Log the error
        res.status(400).send(error);
    }
};



exports.getTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const transactions = await Transaction.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Transaction.countDocuments();
    res.status(200).json({
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

