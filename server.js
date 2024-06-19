// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transactionRoutes = require('./routes/transactionRoutes');
const exchangeRateRoutes = require('./routes/exchangeRatesRoutes');
const forexReserveRoutes = require('./routes/forexReservesRoutes');
const forexPurchaseRoutes = require('./routes/forexPurchasesRoutes');
const currencyPairRoutes = require('./routes/currencyPairRoutes');

app.use('/api/transactions', transactionRoutes);
app.use('/api/exchangeRates', exchangeRateRoutes);
app.use('/api/forexReserves', forexReserveRoutes);
app.use('/api/forexPurchases', forexPurchaseRoutes);
app.use('/api/currencyPairs', currencyPairRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
