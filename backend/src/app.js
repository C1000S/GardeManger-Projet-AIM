const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const pantryRoutes = require('./routes/pantry.routes');
const itemRoutes = require('./routes/item.routes');
const productRoutes = require('./routes/product.routes');
const syncRoutes = require('./routes/sync.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'gardemanger-api', time: new Date().toISOString() });
});

// Routes métier
app.use('/api/auth', authRoutes);
app.use('/api/pantries', pantryRoutes);
app.use('/api', itemRoutes); // /pantries/:pantryId/items et /items/:id
app.use('/api/products', productRoutes);
app.use('/api/sync', syncRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
