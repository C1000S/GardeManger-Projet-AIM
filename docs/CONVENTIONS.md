# Conventions de travail — GardeManger

## Branches

```
main          # toujours stable et démontrable — protégée, pas de push direct
└── develop   # intégration continue des features
    ├── feature/backend-auth-jwt
    ├── feature/android-inventaire
    ├── feature/off-integration
    └── feature/offline-room
```

- Format : `feature/<couche>-<description-courte>` (ex. `feature/backend-items-crud`).
- On ne pousse **jamais** directement sur `main`. Tout passe par une **merge request** vers `develop`.
- `main` ne reçoit que des merges de `develop` validés (fin de phase / démo).

## Merge requests

- 1 relecture minimum avant merge.
- La MR doit **builder** (CI verte) et ne pas casser le `docker compose up`.
- Décrire en 2-3 lignes ce qui change et comment le tester.

## Commits (Conventional Commits)

```
feat(backend): ajout du CRUD des items
fix(android): corrige le crash au scan
docs(api): met à jour openapi.yaml
chore(infra): bump image mongo 7
```

Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Contrat d'API figé

`openapi.yaml` et les schémas `backend/src/models/*` sont le **contrat** entre le back et l'Android.
Toute modification se discute avec l'équipe (surtout Android + back) **avant** merge, car elle
impacte les deux côtés.

## Contributions croisées

Chaque membre lead sa couche, mais prend **une contribution secondaire** dans une autre couche
(ex. le back écrit un écran Android, l'Android écrit quelques routes). But : tout le monde pratique
plusieurs couches.
