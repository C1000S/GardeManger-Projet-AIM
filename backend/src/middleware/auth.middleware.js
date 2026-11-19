const jwt = require('jsonwebtoken');

/**
 * Protège une route : exige un header `Authorization: Bearer <token>`.
 * TODO(Adam): brancher sur la vraie génération de token côté /auth.
 */
function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-a-changer');
    return next();
  } catch {
    return res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

module.exports = { authRequired };
