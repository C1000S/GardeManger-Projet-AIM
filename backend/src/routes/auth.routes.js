const express = require('express');
const router = express.Router();
const { users } = require('../mocks/fixtures');

// POST /api/auth/register
// TODO(Adam): créer l'utilisateur, hasher le mot de passe (bcrypt), renvoyer un JWT.
router.post('/register', (req, res) => {
  res.status(201).json({ token: 'mock.jwt.token', user: users[0] });
});

// POST /api/auth/login
// TODO(Adam): vérifier email + mot de passe, renvoyer un JWT.
router.post('/login', (req, res) => {
  res.json({ token: 'mock.jwt.token', user: users[0] });
});

// GET /api/auth/me
// TODO(Adam): renvoyer l'utilisateur du token (middleware authRequired).
router.get('/me', (req, res) => {
  res.json(users[0]);
});

module.exports = router;
