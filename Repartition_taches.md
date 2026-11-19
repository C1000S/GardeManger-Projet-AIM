# Répartition des tâches — Projet GardeManger

**Cours :** IFT 604 / IFT 717 — Internet et mobilité — Automne 2026
**Projet :** GardeManger — application Android anti-gaspillage alimentaire


| Membre                                            | Responsabilité principale                                                                               | Couche(s)                                |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Cheikh Ahmadou Tidiane Ly** (lyzc3821)    | Fondations, conteneurisation, modélisation des données, rapport final                                  | Infrastructure / Modèle / Documentation |
| **Adam Vermote** (vera6304)                 | API REST CRUD + authentification JWT                                                                     | Backend Node.js/Express                  |
| **Juanel Walop** (walj3890)                 | Intégration Open Food Facts + logique de synchronisation pull/push                                      | Service externe / Sync                   |
| **Anaëlle Benoist** (bena4248)             | Interface Android (MVVM, Jetpack Compose, navigation, Retrofit)                                          | Client mobile                            |
| **Jean Bonheur Brillant Nguema** (nguj3557) | IA embarquée ML Kit (Barcode + OCR) et capture caméra                                                  | Intégration IA                          |
| **Rémi Défosse** (defr7862)               | Persistance locale Room + hors-ligne, WorkManager/notifications, géolocalisation/magasins à proximité | Offline / Arrière-plan / Localisation   |

---

## Détail par personne

### Cheikh Ahmadou Tidiane Ly — lyzc3821

*Fondations, conteneurisation, modélisation, rapport*

- Mise en place du dépôt GitLab, structure du projet et conventions (branches, CI de base).
- **Conteneurisation** : Dockerfile de l'API, `docker-compose` (API Node + MongoDB), variables d'environnement, volumes et scripts de démarrage.
- **Modélisation des données** : schémas Mongoose `User`, `Pantry`, `Item`, `Product` ; relations et diagramme du modèle de données.
- Squelette de l'API et de la navigation Android pour démarrer les autres (Phase 1).
- Architecture technique globale et diagrammes (couches, flux de synchronisation).
- **Rédaction du rapport final** (8–15 p.) : consolidation des contributions, traitement explicite des 8 illusions de l'informatique distribuée, scénario de démonstration.

### Adam Vermote — vera6304

*Backend — API REST et authentification*

- Routes CRUD (User, Pantry, Item, Product) sur Node.js + Express.
- Authentification JWT, middleware de protection des routes.
- Validation des entrées, gestion des erreurs et codes HTTP.
- Tests des endpoints (ex. collection Postman / tests automatisés).

### Juanel Walop — walj3890

*Service externe et synchronisation*

- Intégration de l'**API Open Food Facts** (code-barres → nom, marque, catégorie, image, Nutri-Score).
- Fusion des données externes avec le modèle interne, gestion des produits introuvables et des erreurs réseau.
- Service secondaire pour la carte des magasins (Google Places ou OpenStreetMap / Overpass).
- Logique de **synchronisation pull/push** côté API (file de synchronisation, résolution de conflits).

### Anaëlle Benoist — bena4248

*Client mobile — interface et architecture Android*

- Application Android native (Kotlin, MVVM, Jetpack Compose).
- Écran d'inventaire : liste filtrable par catégorie, date d'expiration et emplacement (frigo, congélateur, armoire).
- Navigation, écrans d'ajout/édition de produit, profil et préférences alimentaires.
- Appels réseau vers l'API via **Retrofit** + Coroutines/Flow.

### Jean Bonheur Brillant Nguema — nguj3557

*Intégration IA — ML Kit*

- **Barcode Scanning** (ML Kit) : identification du produit et déclenchement de l'appel à Open Food Facts.
- **Text Recognition / OCR** : lecture de la date de péremption sur l'emballage.
- Post-traitement pour normaliser les formats de date.
- Gestion de la caméra et pré-remplissage du formulaire d'ajout.

### Rémi Défosse — defr7862

*Hors-ligne, arrière-plan et localisation*

- Persistance locale **Room (SQLite)** et cache hors-ligne (inventaire consultable sans réseau).
- **WorkManager** : tâche périodique qui recalcule les produits bientôt périmés et pousse des notifications, même application fermée.
- Alertes proactives et suggestions de consommation prioritaire.
- **Géolocalisation** : affichage des magasins pertinents à proximité quand un produit est épuisé.

---

## Calendrier (phases du projet)

| Phase             | Objectif                                                                      | Semaines |
| ----------------- | ----------------------------------------------------------------------------- | -------- |
| **Phase 1** | Repo GitLab, modèle de données, squelette API + MongoDB, navigation Android | S1       |
| **Phase 2** | API CRUD + auth ; écran inventaire + Room ; intégration Open Food Facts     |          |
| **Phase 3** | ML Kit (scan + OCR), géolocalisation et magasins à proximité               |          |
| **Phase 4** | WorkManager / notifications, synchro hors-ligne, personnalisation             |          |
| **Phase 5** | Finition UI, tests, rapport (8–15 p.) et scénario de démonstration         |          |

---

## Notes

- Chaque membre documente sa partie au fur et à mesure (pas oblige de le faire seul )
- Chacun a sa partie qu'il lead mais on peut tous travailler dessus avec lui
- La conteneurisation (Docker) permet à toute l'équipe de lancer l'API + MongoDB de façon identique en local.
- Les contributions sont intégrées via des *merge requests* sur Git
- Je vais mettre en place un github pour quon puisse travailler dessus ensemble ou a defauft on va pusher sur le gitlab de lequipe pour suivre la contribution et les avancees de chacun
