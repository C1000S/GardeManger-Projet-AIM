const mongoose = require('mongoose');

/**
 * User — compte utilisateur. dietaryPreferences sert à filtrer et prioriser
 * les suggestions de consommation.
 */
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    dietaryPreferences: {
      restrictions: [{ type: String }], // ex. 'sans-gluten', 'vegetarien'
      allergens: [{ type: String }], // ex. 'arachides'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
