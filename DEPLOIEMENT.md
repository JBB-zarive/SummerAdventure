# 🌍 Summer Adventure – Guide de déploiement

## Structure du projet

```
summer-adventure/
├── index.html          ← Application principale
├── style.css           ← Feuille de styles
├── app.js              ← Logique applicative
├── api.js              ← Couche API
├── manifest.json       ← Configuration PWA
├── service-worker.js   ← Cache hors-ligne
├── Code.gs             ← Backend Google Apps Script
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 1. Déploiement GitHub Pages

### Étape 1 – Créer le dépôt

1. Aller sur [github.com](https://github.com) et créer un **nouveau dépôt public** nommé `summer-adventure`
2. Ne pas initialiser avec un README

### Étape 2 – Pousser les fichiers

```bash
cd summer-adventure
git init
git add .
git commit -m "🌍 Initial commit – Summer Adventure"
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/summer-adventure.git
git push -u origin main
```

### Étape 3 – Activer GitHub Pages

1. Aller dans **Settings** → **Pages** du dépôt
2. Source : **Deploy from a branch**
3. Branch : **main** / **(root)**
4. Cliquer **Save**

⏱️ L'app sera disponible en quelques minutes sur :
`https://VOTRE_PSEUDO.github.io/summer-adventure/`

---

## 2. Configuration Google Sheets + Apps Script

### Étape 1 – Créer le Google Spreadsheet

1. Aller sur [sheets.google.com](https://sheets.google.com)
2. Créer un **nouveau classeur** nommé `Summer Adventure – Base de données`
3. Copier l'**ID** depuis l'URL :
   `https://docs.google.com/spreadsheets/d/`**`VOTRE_ID_ICI`**`/edit`

### Étape 2 – Créer le projet Apps Script

1. Depuis le classeur : **Extensions** → **Apps Script**
2. Supprimer le code existant
3. Coller intégralement le contenu de `Code.gs`
4. Remplacer `VOTRE_SPREADSHEET_ID_ICI` par l'ID copié à l'étape précédente :
   ```javascript
   const SPREADSHEET_ID = 'abc123xyz...'; // ← votre ID ici
   ```
5. Enregistrer (**Ctrl+S**) et nommer le projet `Summer Adventure API`

### Étape 3 – Initialiser la structure

1. Dans l'éditeur Apps Script, sélectionner la fonction `initSpreadsheet`
2. Cliquer **▶ Exécuter**
3. Accepter les autorisations demandées (accès Sheets)
4. Vérifier que les feuilles ont été créées dans le classeur

### Étape 4 – Déployer comme API Web

1. Cliquer **Déployer** → **Nouveau déploiement**
2. Type : **Application Web**
3. Description : `Summer Adventure API v1`
4. Exécuter en tant que : **Moi** (votre compte Google)
5. Qui a accès : **Tout le monde** (requis pour l'app)
6. Cliquer **Déployer**
7. **Copier l'URL** du déploiement (format : `https://script.google.com/macros/s/XXX/exec`)

### Étape 5 – Premier lancement de l'app

1. Ouvrir l'URL de l'app dans le navigateur
2. L'**écran de configuration** s'affiche automatiquement au premier lancement
3. **Étape 1** : saisir le prénom de l'enfant et choisir le genre (Fille / Garçon / Neutre)
4. **Étape 2** : coller l'URL du script Google Apps Script
5. Cliquer **🚀 Lancer l'aventure !**

> ℹ️ La configuration peut être modifiée à tout moment depuis **⚙️ Parents → Paramètres**.

---

## 3. Installation sur l'écran d'accueil

### iPhone (Safari)
1. Ouvrir l'URL dans **Safari** (pas Chrome)
2. Appuyer sur l'icône **Partager** (rectangle avec flèche vers le haut)
3. Sélectionner **Sur l'écran d'accueil**
4. Nommer `Summer Adventure` → **Ajouter**

### Android (Chrome)
1. Ouvrir l'URL dans **Chrome**
2. Menu **⋮** → **Ajouter à l'écran d'accueil**
3. Confirmer → l'icône apparaît sur l'écran d'accueil

---

## 4. Configuration initiale

### Code PIN parents
Le PIN par défaut est **1234**. Pour le changer :
1. ⚙️ Parents → Paramètres → Nouveau code PIN
2. Saisir 4 chiffres → Enregistrer

### Infos de l'enfant (modifiables)
1. ⚙️ Parents → Paramètres → Infos de l'enfant
2. Modifier prénom et/ou genre → Enregistrer

### Ajouter des missions
1. ⚙️ Parents → Missions → **+ Nouvelle mission**
2. Remplir le formulaire et enregistrer

### Ajouter des récompenses
1. ⚙️ Parents → Récompenses → **+ Nouvelle récompense**
2. Remplir et enregistrer

### Attribuer / déduire des points
- **Bonus** : Parents → Paramètres → Bonus de points → saisir XP + raison → Attribuer
- **Malus** : Parents → Paramètres → Déduire des points → saisir XP + raison obligatoire → Déduire

---

## 5. Structure des feuilles Google Sheets

| Feuille         | Colonnes principales                                             |
|-----------------|------------------------------------------------------------------|
| `utilisateurs`  | id, name, xp, totalXp, streak, level, missionsDone             |
| `missions`      | id, title, desc, cat, diff, xp, icon, freq, validation         |
| `validations`   | id, missionId, userId, status, submittedAt, validatedAt         |
| `points`        | id, userId, amount, reason, createdAt                           |
| `badges`        | id, userId, badgeId, unlockedAt                                 |
| `recompenses`   | id, title, desc, cost, icon, available                          |
| `parametres`    | key, value                                                       |
| `historique`    | id, userId, type, title, icon, xp, createdAt                   |

---

## 6. Fonctionnement hors-ligne

L'application fonctionne **entièrement sans connexion** grâce au Service Worker et au `localStorage`. Les données se synchronisent automatiquement avec Google Sheets lorsque la connexion est rétablie.

---

## 7. Mise à jour de l'application

Pour mettre à jour l'application :
1. Modifier les fichiers localement
2. `git add . && git commit -m "description" && git push`
3. GitHub Pages se met à jour automatiquement en ~1 minute
4. Sur les téléphones, forcer le rechargement ou désinstaller/réinstaller

Pour mettre à jour l'API :
1. Modifier `Code.gs` dans l'éditeur Apps Script
2. **Déployer** → **Gérer les déploiements** → Modifier → **Déployer**

---

## 8. Personnalisation du genre

L'application adapte automatiquement :
- Les **noms de badges** (ex : "Aventurière" / "Aventurier" / "Aventurier·ère")
- Les **titres de niveaux** (ex : "Exploratrice" / "Explorateur" / "Explorateur·ice")
- Les **messages de félicitations**

Le genre est configurable à tout moment depuis **Parents → Paramètres → Infos de l'enfant**, sans perte de données.

---

*Summer Adventure – Chaque jour est une aventure !* 🌍
