function notFound(req, res, next) { // eslint-disable-line no-unused-vars
  res.status(404).json({ error: `Route introuvable : ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('[error]', err);
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' });
}

module.exports = { notFound, errorHandler };
