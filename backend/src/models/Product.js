const mongoose = require('mongoose');

/**
 * Product — référentiel partagé de produits, identifié par son code-barres.
 * Alimenté par Open Food Facts (source: openfoodfacts) ou saisi à la main (manuel).
 * Un même produit peut être référencé par de nombreux Item.
 */
const productSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    category: { type: String, trim: true },
    imageUrl: { type: String },
    nutriScore: { type: String, enum: ['a', 'b', 'c', 'd', 'e', null], default: null },
    nutriments: { type: mongoose.Schema.Types.Mixed }, // bloc nutritionnel brut d'OFF
    source: { type: String, enum: ['openfoodfacts', 'manuel'], default: 'openfoodfacts' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
