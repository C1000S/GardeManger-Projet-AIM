const mongoose = require('mongoose');

/**
 * Connexion MongoDB. Non bloquante : si Mongo est absent, l'API démarre quand
 * même en MODE MOCK (les routes renvoient les fixtures), pour ne pas bloquer
 * le dev Android.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[db] MONGODB_URI absent — MODE MOCK (pas de persistance).');
    return false;
  }
  try {
    await mongoose.connect(uri);
    console.log('[db] Connecté à MongoDB');
    return true;
  } catch (err) {
    console.warn(`[db] Connexion MongoDB échouée (${err.message}) — MODE MOCK activé.`);
    return false;
  }
}

module.exports = connectDB;
