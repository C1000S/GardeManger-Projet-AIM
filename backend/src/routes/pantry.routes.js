const express = require('express');
const router = express.Router();
const { pantries } = require('../mocks/fixtures');

// GET /api/pantries — garde-mangers de l'utilisateur
// TODO(Adam): filtrer par membre (req.user).
router.get('/', (req, res) => res.json(pantries));

// POST /api/pantries
router.post('/', (req, res) => {
  res.status(201).json({ id: 'pt_new', owner: 'u_1', members: ['u_1'], ...req.body });
});

// GET /api/pantries/:id
router.get('/:id', (req, res) => {
  res.json(pantries.find((p) => p.id === req.params.id) || pantries[0]);
});

// PATCH /api/pantries/:id
router.patch('/:id', (req, res) => res.json({ ...pantries[0], ...req.body }));

// DELETE /api/pantries/:id
router.delete('/:id', (req, res) => res.status(204).end());

// POST /api/pantries/:id/members — inviter un membre (garde-manger partagé)
router.post('/:id/members', (req, res) => {
  res.status(201).json({ ...pantries[0], members: ['u_1', req.body.userId || 'u_2'] });
});

module.exports = router;
