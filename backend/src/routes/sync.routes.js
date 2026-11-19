const express = require('express');
const router = express.Router();
const { items } = require('../mocks/fixtures');

// GET /api/sync/changes?since=<ISO8601> — PULL
// TODO(Juanel): renvoyer les items modifiés depuis `since` pour le mode hors-ligne.
router.get('/changes', (req, res) => {
  res.json({
    since: req.query.since || null,
    serverTime: new Date().toISOString(),
    items,
  });
});

// POST /api/sync/push — PUSH
// TODO(Juanel): appliquer les changements locaux, résoudre les conflits
// (last-write-wins via updatedAtClient).
router.post('/push', (req, res) => {
  const changes = (req.body && req.body.changes) || [];
  res.json({ applied: changes.length, serverTime: new Date().toISOString(), conflicts: [] });
});

module.exports = router;
