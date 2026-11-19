const mongoose = require('mongoose');

/**
 * Pantry — garde-manger. Appartient à un owner, partageable avec des members
 * (colocation / famille). Unité de synchronisation entre appareils.
 */
const pantrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pantry', pantrySchema);
