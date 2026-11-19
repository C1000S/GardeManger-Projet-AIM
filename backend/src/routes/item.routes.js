const express = require('express');
const router = express.Router();
const { items } = require('../mocks/fixtures');

// GET /api/pantries/:pantryId/items?category=&location=&status=&expiringBefore=
// TODO(Adam): filtres réels + population du produit.
router.get('/pantries/:pantryId/items', (req, res) => {
  let result = items.filter((i) => i.pantry === req.params.pantryId);
  if (!result.length) result = items;
  const { location, status } = req.query;
  if (location) result = result.filter((i) => i.location === location);
  if (status) result = result.filter((i) => i.status === status);
  res.json(result);
});

// POST /api/pantries/:pantryId/items
router.post('/pantries/:pantryId/items', (req, res) => {
  res.status(201).json({ id: 'i_new', pantry: req.params.pantryId, status: 'actif', ...req.body });
});

// GET /api/pantries/:pantryId/items/expiring?days=3 — alertes / suggestions
// TODO(Adam + Rémi côté client): items qui périment sous `days` jours.
router.get('/pantries/:pantryId/items/expiring', (req, res) => {
  res.json(items.slice(0, 2));
});

// GET /api/items/:id
router.get('/items/:id', (req, res) => {
  res.json(items.find((i) => i.id === req.params.id) || items[0]);
});

// PATCH /api/items/:id — ex. marquer consommé
router.patch('/items/:id', (req, res) => res.json({ ...items[0], ...req.body }));

// DELETE /api/items/:id
router.delete('/items/:id', (req, res) => res.status(204).end());

module.exports = router;
