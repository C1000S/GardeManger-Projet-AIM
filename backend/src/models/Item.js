const mongoose = require('mongoose');

const LOCATIONS = ['frigo', 'congelateur', 'armoire', 'autre'];
const STATUSES = ['actif', 'consomme', 'perime', 'jete'];

/**
 * Item — instance concrète d'un produit dans un garde-manger
 * (« j'ai 2 de ça, qui périme le X, dans le frigo »).
 * product peut être null (saisie manuelle) ; label prend alors le relais.
 */
const itemSchema = new mongoose.Schema(
  {
    pantry: { type: mongoose.Schema.Types.ObjectId, ref: 'Pantry', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    label: { type: String, trim: true },
    quantity: { type: Number, default: 1, min: 0 },
    unit: { type: String, default: 'piece' }, // piece, g, kg, ml, l, portion
    expirationDate: { type: Date },
    location: { type: String, enum: LOCATIONS, default: 'frigo' },
    status: { type: String, enum: STATUSES, default: 'actif', index: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String },
    updatedAtClient: { type: Date }, // horodatage client pour la synchro hors-ligne
  },
  { timestamps: true }
);

// Requête fréquente : items actifs d'un garde-manger triés par péremption
itemSchema.index({ pantry: 1, status: 1, expirationDate: 1 });

const Item = mongoose.model('Item', itemSchema);
Item.LOCATIONS = LOCATIONS;
Item.STATUSES = STATUSES;

module.exports = Item;
