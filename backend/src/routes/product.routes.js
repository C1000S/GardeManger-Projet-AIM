const express = require('express');
const router = express.Router();
const { products } = require('../mocks/fixtures');

// GET /api/products?search=
router.get('/', (req, res) => {
  const { search } = req.query;
  let result = products;
  if (search) {
    const q = String(search).toLowerCase();
    result = products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(q));
  }
  res.json(result);
});

// GET /api/products/:barcode
// TODO(Juanel): si absent en base → appeler Open Food Facts, fusionner, cacher, renvoyer.
router.get('/:barcode', (req, res) => {
  res.json(products.find((p) => p.barcode === req.params.barcode) || products[0]);
});

// POST /api/products — création manuelle (produit introuvable sur OFF)
router.post('/', (req, res) => {
  res.status(201).json({ id: 'p_new', source: 'manuel', ...req.body });
});

module.exports = router;
