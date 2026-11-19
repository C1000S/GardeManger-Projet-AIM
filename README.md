# GardeManger — application anti-gaspillage alimentaire

Application Android (Kotlin / Jetpack Compose) adossée à une **API REST Node.js + MongoDB**,
qui aide une personne ou un foyer à gérer son garde-manger, suivre les dates de péremption
et réduire le gaspillage.

> **IFT 604 / IFT 717 — Internet et mobilité — Automne 2026**

---

## Pourquoi ce dépôt démarre par le back + un contrat

Le point bloquant d'un projet d'équipe, c'est **l'attente séquentielle** (l'Android attend l'API,
l'API attend le modèle…). On le supprime dès le jour 1 :

1. Le **modèle de données** est figé (`backend/src/models/` + [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)).
2. Le **contrat d'API** est figé ([`openapi.yaml`](openapi.yaml)).
3. Le squelette Express **répond déjà** avec des données mockées (`backend/src/mocks/fixtures.js`).

Résultat : l'équipe Android développe **contre le vrai serveur mocké** pendant que l'équipe back
remplit les handlers. Personne n'attend.

---

## Démarrage rapide (toute l'équipe)

Prérequis : [Docker](https://www.docker.com/) + Docker Compose.

```bash
# 1. Copier les variables d'environnement
cp backend/.env.example backend/.env

# 2. Lancer l'API + MongoDB
docker compose up --build

# 3. Vérifier
curl http://localhost:3000/api/health
curl http://localhost:3000/api/pantries   # renvoie des données mockées
```

L'API écoute sur **http://localhost:3000**. Les endpoints et leurs schémas sont décrits dans
[`openapi.yaml`](openapi.yaml) (ouvrable dans [editor.swagger.io](https://editor.swagger.io)).

### Sans Docker (dev back uniquement)

```bash
cd backend
npm install
npm run dev        # nodemon, port 3000, mode mock si pas de Mongo
```

---

## Structure du dépôt

```
.
├── backend/                 # API REST Node.js / Express / Mongoose
│   ├── src/
│   │   ├── models/          # Schémas Mongoose = contrat de données (FIGÉ)
│   │   ├── routes/          # Endpoints (handlers mockés → à remplir par les leads)
│   │   ├── middleware/      # auth JWT, gestion d'erreurs
│   │   ├── config/          # connexion MongoDB
│   │   ├── mocks/           # fixtures renvoyées tant que les handlers ne sont pas faits
│   │   ├── app.js           # application Express
│   │   └── server.js        # point d'entrée
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── DATA_MODEL.md        # diagramme + description des entités et relations
│   └── CONVENTIONS.md       # branches, commits, merge requests
├── docker-compose.yml       # API + MongoDB
├── openapi.yaml             # contrat d'API (FIGÉ)
└── README.md
```

L'app Android vivra dans `android/` (squelette de navigation à venir).

---

## Répartition des tâches

Voir [`Repartition_taches.md`](Repartition_taches.md). Chaque membre **lead** une couche
mais tout le monde peut contribuer ailleurs (contributions croisées encouragées).

| Couche | Lead | Dossier principal |
| ------ | ---- | ----------------- |
| Fondations / modèle / infra | Cheikh Ahmadou Tidiane Ly | `backend/src/models`, `docker-compose.yml`, `openapi.yaml` |
| API REST CRUD + auth JWT | Adam Vermote | `backend/src/routes`, `backend/src/controllers` |
| Open Food Facts + sync | Juanel Walop | `backend/src/routes/product.routes.js`, `sync.routes.js` |
| Client Android (MVVM/Compose) | Anaëlle Benoist | `android/` |
| IA ML Kit (scan + OCR) | Jean Bonheur Brillant Nguema | `android/` (caméra, scan) |
| Offline Room / WorkManager / géoloc | Rémi Défosse | `android/` (persistance, tâches) |

---

## Conventions

Branches, commits et merge requests : voir [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md).
