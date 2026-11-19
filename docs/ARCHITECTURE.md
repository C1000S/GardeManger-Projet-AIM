# Architecture technique — GardeManger

Système distribué à 3 tiers : **client Android** ↔ **API REST** ↔ **MongoDB**,
l'API s'appuyant sur des **services Web externes** (Open Food Facts, cartes).

## Vue en couches

```mermaid
flowchart TB
    subgraph Android["Client Android (Kotlin / Jetpack Compose, MVVM)"]
        UI["UI Compose\n(écrans inventaire, ajout)"]
        VM["ViewModel\n(StateFlow, coroutines)"]
        REPO["Repository"]
        ROOM[("Room / SQLite\ncache hors-ligne")]
        MLKIT["ML Kit\n(Barcode + OCR)"]
        WM["WorkManager\n(notifications périmés)"]
        RETRO["Retrofit\n(HTTP + Moshi)"]
        UI --> VM --> REPO
        REPO --> ROOM
        REPO --> RETRO
        MLKIT --> VM
        WM --> REPO
    end

    subgraph Backend["API REST (Node.js / Express)"]
        AUTH["Auth JWT"]
        CRUD["CRUD\nUser / Pantry / Item / Product"]
        SYNC["Service de synchro\npull / push"]
        OFF["Intégration\nOpen Food Facts"]
        DB[("MongoDB\nMongoose")]
        AUTH --> CRUD --> DB
        SYNC --> DB
        OFF --> DB
    end

    OFFAPI[["Open Food Facts\n(service public)"]]
    MAPS[["Places / OpenStreetMap\n(magasins à proximité)"]]

    RETRO -- "HTTPS / JSON" --> AUTH
    RETRO -- "HTTPS / JSON" --> CRUD
    RETRO -- "HTTPS / JSON" --> SYNC
    OFF --> OFFAPI
    REPO -. "géoloc" .-> MAPS
```

## Flux de synchronisation hors-ligne (pull / push)

L'inventaire reste consultable et modifiable sans réseau ; les changements sont
réconciliés à la reconnexion.

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant A as App (Room)
    participant S as API (/sync)
    participant M as MongoDB

    Note over A: Hors-ligne
    U->>A: Ajoute / modifie un item
    A->>A: Écrit dans Room + file d'attente\n(updatedAtClient)

    Note over A,S: Reconnexion
    A->>S: POST /sync/push {changes[]}
    S->>M: Applique (last-write-wins via updatedAtClient)
    S-->>A: {applied, conflicts[]}
    A->>S: GET /sync/changes?since=<ts>
    S->>M: Lit les modifications serveur
    S-->>A: {items[], serverTime}
    A->>A: Met à jour Room + horloge locale
```

## Choix techniques

| Décision | Raison |
| --- | --- |
| **MongoDB (NoSQL)** | Documents flexibles (produits OFF hétérogènes), itération rapide. |
| **JWT stateless** | Pas de session serveur → l'API scale et reste simple. |
| **Product séparé d'Item** | Référentiel partagé mis en cache ; on ne duplique pas les données OFF. |
| **Room comme source locale** | L'UI lit toujours Room (réactif), le réseau alimente Room en tâche de fond. |
| **Contrat OpenAPI figé** | Back et Android avancent en parallèle contre le même contrat. |

## Les 8 illusions de l'informatique distribuée (traitées)

| Illusion | Traitement dans GardeManger |
| --- | --- |
| Le réseau est fiable | File de synchro + retries ; mode hors-ligne via Room. |
| La latence est nulle | UI optimiste sur Room ; appels réseau asynchrones (coroutines). |
| La bande passante est infinie | Pagination/filtres sur l'inventaire ; images mises en cache. |
| Le réseau est sûr | Auth JWT, HTTPS en production, validation des entrées. |
| La topologie ne change pas | Reconnexion gérée ; `BASE_URL` configurable. |
| Il y a un seul administrateur | Garde-manger partagé avec owner + members. |
| Le coût de transport est nul | Synchro incrémentale (`since`) plutôt que tout retélécharger. |
| Le réseau est homogène | JSON + REST standard, indépendant du client. |

> Ce tableau alimentera directement la section « illusions » du rapport final.
