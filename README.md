# 🧪 OrangeHRM Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-E2E-45ba4b.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)
![GitHub Codespaces](https://img.shields.io/badge/Codespaces-Compatible-181717.svg)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Un framework de test End-to-End (E2E) pour la page de connexion de **OrangeHRM**, construit avec **Playwright** et **TypeScript**. Ce projet applique le modèle **Page Object Model (POM)** pour centraliser les sélecteurs et les actions, rendant les tests plus simples, lisibles et faciles à maintenir.

---

## 🎯 Objectif du projet

Ce dépôt sert de démonstration pour l'automatisation de tests sur une application web réelle (le site de démonstration Open Source d'OrangeHRM). Il a été conçu pour aider les débutants à comprendre comment :
- Structurer un projet d'automatisation professionnel
- Utiliser le modèle POM avec des méthodes réutilisables
- Exécuter des tests dans le cloud (GitHub Codespaces)
- Générer des rapports détaillés avec captures d'écran
- Intégrer des tests d'accessibilité et de régression visuelle

---

## 📋 Prérequis

- **Node.js** v22 ou plus ([Télécharger](https://nodejs.org/))
- Un compte **GitHub** (pour utiliser Codespaces) ou une installation locale de Git.
- (Optionnel) Un éditeur de code comme **VS Code**.

---

## 🚀 Installation et configuration

```bash
# 1. Cloner le dépôt
git clone https://github.com/Walid-Khalfa/playwright-gemini-automation.git
cd playwright-gemini-automation

# 2. Installer les dépendances
npm install

# 3. (Optionnel) Créer le fichier d'environnement
cp .env.example .env
```

---

## ⚙️ Configuration

La configuration principale se trouve dans `playwright.config.ts`. Elle inclut :
- **Variables d'environnement** pour les credentials (`.env`)
- Les traces, captures d'écran et vidéos en cas d'échec
- Les navigateurs cibles (Chromium, Firefox, WebKit)
- Reporters HTML, JSON et liste

---

## ▶️ Lancement des tests

```bash
# Exécution standard (headless)
npm test

# Exécuter uniquement sur Chromium
npx playwright test --project=chromium

# Mode "headed" (avec interface visible)
npm run test:headed

# Mode débogage (pas à pas)
npm run test:debug

# Tests visuels
npm run test:visual

# Tous les navigateurs
npx playwright test
```

---

## 📊 Rapport de test

Après l'exécution, Playwright génère un rapport HTML interactif :

```bash
npm run test:report -- --port 9324
```

---

## 🧪 Types de tests

| Fichier | Description |
|---------|-------------|
| `login.spec.ts` | Tests de connexion (succès, échec, champs vides) |
| `https.spec.ts` | Vérification du protocole HTTPS |
| `accessibility.spec.ts` | Tests WCAG d'accessibilité |
| `visual.spec.ts` | Tests de régression visuelle |
| `performance.spec.ts` | Tests de performance basiques |

---

## 🔄 CI/CD

Le workflow GitHub Actions (`.github/workflows/playwright.yml`) exécute automatiquement les tests à chaque push sur `main` ou `master`. Ajoutez les secrets suivants dans votre dépôt :

| Secret | Description |
|--------|-------------|
| `ORANGEHRM_USERNAME` | Nom d'utilisateur OrangeHRM |
| `ORANGEHRM_PASSWORD` | Mot de passe OrangeHRM |

Le workflow utilise les dernières versions des actions GitHub officielles et nécessite les permissions `id-token: write` et `contents: read` sur le jeton `GITHUB_TOKEN` pour déployer les rapports sur GitHub Pages.

---

## 🧹 Dépannage (Troubleshooting)

| Erreur | Solution |
| :--- | :--- |
| **`EADDRINUSE: address already in use`** | Changez de port avec `--port 9324` ou fermez l'onglet du rapport. |
| **`Host system is missing dependencies`** | Installez les dépendances : `sudo npx playwright install-deps` |
| **`Missing X server`** | Retenez l'option `--headed` ou utilisez `xvfb-run`. |

---

## 🐳 Lancer les tests avec Docker

Si vous ne voulez pas installer Node.js, Playwright ou les navigateurs sur votre machine, vous pouvez utiliser **Docker**. Docker va exécuter les tests dans un conteneur isolé. C'est utile si vous débutez ou si vous voulez éviter les problèmes de configuration.

### Prérequis

1. Installer Docker Desktop : https://www.docker.com/products/docker-desktop/
2. Vérifier que Docker fonctionne :
   ```bash
   docker --version
   ```

### Étape 1 : Préparer le fichier `.env`

Docker a besoin d'un fichier `.env` pour se connecter à OrangeHRM. Si ce n'est pas déjà fait :

```bash
cp .env.example .env
```

Puis ouvrez le fichier `.env` et vérifiez que les identifiants sont corrects.

### Étape 2 : Construire l'image

Depuis la racine du projet, lancez :

```bash
docker build -t playwright-gemini .
```

> **Explication** : Cette commande crée une "image" Docker (un modèle) nommée `playwright-gemini`. Elle installe Node.js, les dépendances du projet et le navigateur Chromium automatiquement.

### Étape 3 : Lancer les tests

Pour exécuter tous les tests :

```bash
docker run --rm playwright-gemini
```

> **Explication** : Cette commande démarre un conteneur temporaire (`--rm` signifie qu'il sera supprimé automatiquement après l'exécution) et lance les tests Playwright à l'intérieur.

### Étape 4 : Récupérer les résultats

Pour récupérer les rapports et captures d'écran après l'exécution :

```bash
docker run --rm -v $(pwd)/test-results:/app/test-results \
           -v $(pwd)/playwright-report:/app/playwright-report \
           playwright-gemini
```

> **Explication** :
> - `-v $(pwd)/test-results:/app/test-results` copie le dossier `test-results` depuis le conteneur vers votre machine.
> - `-v $(pwd)/playwright-report:/app/playwright-report` copie le rapport HTML vers votre machine.
> - Sur Windows, remplacez `$(pwd)` par `%cd%`.

### Étape 5 : Ouvrir le rapport HTML

Une fois les tests terminés, ouvrez le rapport dans votre navigateur :

```bash
npx playwright show-report
```

### Commandes Docker utiles

#### Avec Docker Compose (recommandé pour les débutants)

Un fichier `docker-compose.yml` est disponible pour simplifier les commandes :

```bash
# Lancer les tests (avec récupération automatique des rapports)
docker compose up --build

# Relancer sans reconstruire l'image
docker compose up

# Voir les logs en temps réel
docker compose logs -f

# Arrêter le conteneur
docker compose down
```

#### Avec Docker seul

| Commande | Description |
| :--- | :--- |
| `docker build -t playwright-gemini .` | Construire l'image Docker |
| `docker run --rm playwright-gemini` | Lancer tous les tests |
| `docker run --rm playwright-gemini npx playwright test --project=chromium` | Lancer uniquement les tests Chromium |
| `docker run --rm -v $(pwd)/test-results:/app/test-results playwright-gemini` | Lancer les tests et récupérer les résultats |
| `docker images` | Voir les images Docker installées |
| `docker rmi playwright-gemini` | Supprimer l'image Docker |

---

## 📁 Structure du projet

```text
playwright-gemini-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml     # CI/CD GitHub Actions
├── pages/
│   └── LoginPage.ts           # Page Object Model
├── tests/
│   ├── login.spec.ts          # Tests de connexion
│   ├── https.spec.ts          # Vérification HTTPS
│   ├── accessibility.spec.ts  # Tests WCAG
│   ├── visual.spec.ts         # Régression visuelle
│   └── performance.spec.ts      # Tests performance
├── playwright.config.ts       # Configuration
├── docker-compose.yml         # Configuration Docker Compose
├── Dockerfile                 # Image Docker pour les tests
├── .env.example              # Exemple variables d'environnement
└── package.json
```

---

## 🙏 Remerciements

Réalisé avec l'assistance de **GitHub Copilot** en mode Agent.

⭐ **N'hésitez pas à "star" le dépôt !**
