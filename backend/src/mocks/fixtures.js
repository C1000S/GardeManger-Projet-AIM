// Données SYNTHÉTIQUES renvoyées par les handlers tant qu'ils ne sont pas branchés
// sur MongoDB. Elles respectent le contrat (openapi.yaml + models/).
// À retirer au fur et à mesure que les vraies implémentations arrivent.

const users = [
  {
    id: 'u_1',
    email: 'demo@gardemanger.app',
    name: 'Demo Utilisateur',
    dietaryPreferences: { restrictions: ['vegetarien'], allergens: ['arachides'] },
  },
];

const products = [
  {
    id: 'p_1', barcode: '3017620422003', name: 'Pâte à tartiner', brand: 'Nutella',
    category: 'Petit-déjeuner', imageUrl: null, nutriScore: 'e', source: 'openfoodfacts',
  },
  {
    id: 'p_2', barcode: '7622210449283', name: 'Biscuits', brand: 'LU',
    category: 'Biscuits', imageUrl: null, nutriScore: 'd', source: 'openfoodfacts',
  },
];

const pantries = [
  { id: 'pt_1', name: 'Coloc rue King', owner: 'u_1', members: ['u_1'] },
];

const items = [
  {
    id: 'i_1', pantry: 'pt_1', product: 'p_1', label: 'Pâte à tartiner', quantity: 1,
    unit: 'piece', expirationDate: '2026-12-01T00:00:00Z', location: 'armoire',
    status: 'actif', addedBy: 'u_1',
  },
  {
    id: 'i_2', pantry: 'pt_1', product: 'p_2', label: 'Biscuits', quantity: 2,
    unit: 'piece', expirationDate: '2026-11-24T00:00:00Z', location: 'armoire',
    status: 'actif', addedBy: 'u_1',
  },
  {
    id: 'i_3', pantry: 'pt_1', product: null, label: 'Lait', quantity: 1,
    unit: 'l', expirationDate: '2026-11-22T00:00:00Z', location: 'frigo',
    status: 'actif', addedBy: 'u_1',
  },
];

module.exports = { users, products, pantries, items };
