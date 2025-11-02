## [mobile/react-native] Github user search

## Context

### Instructions

Create a search input text where users can type in and get results straight away, without submit required.
Results will list Github users like the mock below.

<img width="329" alt="hiring test mid senior" src="https://user-images.githubusercontent.com/5455556/181717810-ffdef922-cf76-425c-ab1d-70e772a67b58.png">

#### The subject

1. Query against Github Api: GET https://api.github.com/search/users?q={USER}.
2. Try to not add any dependency library on a freshly created
   [react native app](https://reactnative.dev/docs/environment-setup) (Only testing libraries accepted).
3. Don't forget to check against modern ways to make HTTP requests on frontend side.
4. Manage edge cases:
   - No results
   - Github api rate limit
   - User type in quickly and going back and forth on his search
5. Add a checkbox on each card item
6. Add a checkbox for select all cards with the number of selected items
7. Add two actions depending selected items
   - Duplicate items
   - Delete items

These actions are only front-end and will be reset when the search change

#### Bonus

Add an edit mode

- When edit mode is on:
  - display checkboxes on cards
  - display the select all checkbox
  - display duplicate and delete actions

- When edit mode is off:
  - hide checkboxes
  - hide duplicate and delete actions

#### Guidelines

- Use official React Native CLI to generate a new project
- Push your code to a Github repository
- Document what you've done

#### Evaluation

- Quality of the code
- Scalability of the algorithm
- Usage of good practices and modern javascript
- Respect of the mock
- Types
- Tests

## Comment démarrer le projet

### Prérequis

- **Node.js** >= 20.19.4 et **npm** >= 10.8.2
- **Xcode** >= 16.1 (Xcode 16.2 recommandé pour iOS)
- **Simulateur iOS** configuré (via Xcode) ou appareil physique connecté
- **Android Studio** avec émulateur configuré (optionnel, pour Android)

### Installation des dépendances

1. Clonez le repository :

   ```bash
   git clone <url-du-repo>
   cd github-search-user
   ```

2. Installez les dépendances du projet :
   ```bash
   npm install
   ```

### Lancement du projet

1. Démarrez le serveur de développement Expo :

   ```bash
   npm run start
   ```

2. Choisissez votre plateforme :
   - Appuyez sur `i` pour lancer sur le simulateur iOS
   - Appuyez sur `a` pour lancer sur l'émulateur Android
   - Scannez le QR code avec l'app Expo Go sur votre appareil mobile

### Dépendances utilisées

#### Dépendances principales

- **expo** : Framework de développement React Native
- **react** : Bibliothèque JavaScript pour l'interface utilisateur
- **react-native** : Framework pour applications mobiles natives
- **@expo/vector-icons** : Icônes vectorielles pour Expo/React Native
- **expo-status-bar** : Composant pour la barre de statut
- **react-native-safe-area-context** : Gestion des zones sécurisées

#### Dépendances de développement

- **TypeScript** : Langage typé basé sur JavaScript
- **ESLint** : Outil de linting pour JavaScript/TypeScript
- **Prettier** : Formateur de code
- **Jest** : Framework de tests JavaScript
- **@testing-library/react-native** : Utilitaires pour tester React Native
- **Husky** : Hooks Git pour automatiser les tâches

### Scripts disponibles

- `npm run start` : Démarre le serveur de développement Expo
- `npm run test` : Exécute les tests unitaires
- `npm run lint` : Vérifie le style de code (ESLint + Prettier)
- `npm run lint:fix` : Corrige automatiquement les problèmes de style
- `npm run tsc` : Vérifie la compilation TypeScript
