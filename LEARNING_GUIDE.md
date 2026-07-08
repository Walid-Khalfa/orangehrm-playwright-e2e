# Guide d'apprentissage Playwright

Ce guide est conçu pour vous aider à comprendre les concepts de base de Playwright et comment ils sont appliqués dans ce projet.

## Qu'est-ce que Playwright ?

Playwright est une bibliothèque d'automatisation de tests end-to-end développée par Microsoft. Elle permet d'automatiser les navigateurs Chromium, Firefox et WebKit avec une seule API.

### Caractéristiques principales de Playwright

- **Multi-navigateurs** : Support de Chromium, Firefox et WebKit
- **Multi-langages** : Disponible en JavaScript/TypeScript, Python, Java et .NET
- **Auto-attente** : Attend automatiquement que les éléments soient prêts avant d'agir
- **Traçage** : Capture des traces détaillées pour le débogage
- **Isolation des tests** : Chaque test s'exécute dans son propre contexte de navigateur
- **Mode sans tête et avec tête** : Peut s'exécuter avec ou sans interface graphique

## Structure du projet

Ce projet utilise plusieurs bonnes pratiques pour l'automatisation de tests :

### 1. Modèle Page Object Model (POM)

Le POM est un modèle de conception qui permet de créer une couche d'abstraction pour interagir avec les pages web.

Dans ce projet, vous trouverez l'implémentation POM dans `pages/LoginPage.ts` :

```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  // ... autres éléments

  constructor(page: Page) {
    this.page = page;
    // Initialisation des localisateurs
    this.usernameInput = page.locator('input[placeholder="Username"]');
    // ...
  }

  // Méthodes d'action
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

**Avantages du POM** :
- Séparation des préoccupations : les localisateurs sont séparés des méthodes de test
- Réutilisabilité : les mêmes méthodes peuvent être utilisées dans différents tests
- Maintenance facilitée : si l'UI change, vous n'avez besoin de mettre à jour qu'un seul fichier
- Lisibilité : les tests deviennent plus lisibles et ressemblent à du langage naturel

### 2. Fixtures et hooks de test

Playwright fournit des fixtures puissantes pour gérer l'état des tests :

Dans ce projet utilise `test.describe` pour regrouper les tests liés et `test` pour définir les cas de test individuels.

### 3. Attentes intelligentes

Au lieu d'utiliser des `waitForTime` fixes, Playwright utilise des attentes intelligentes qui attendent automatiquement que les éléments soient prêts.

Exemple dans `LoginPage.ts` :
```typescript
async waitForPageToLoad(): Promise<void> {
  await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
  await expect(this.passwordInput).toBeVisible();
  await expect(this.loginButton).toBeEnabled();
}
```

### 4. Gestion de l'environnement

Le projet utilise `dotenv` pour gérer les variables d'environnement, ce qui permet de garder les identifiants sécurisés hors du code source.

### 5. Rapports et traçabilité

Playwright génère automatiquement :
- Des rapports HTML détaillés
- Des traces pour le débogage
- Des captures d'écran en cas d'échec
- Des vidéos des tests échoués

## Concepts clés de Playwright démontrés dans ce projet

### Localisateurs (Locators)

Playwright introduit un nouveau concept de localisateurs qui sont plus résistants aux changements de l'interface :

```typescript
// Bon : utiliser des rôles ARIA (recommandé)
this.loginButton = page.getByRole('button', { name: 'Login' });

// Alternatif : utiliser des placeholders
this.usernameInput = page.locator('input[placeholder="Username"]');
```

### Assertions

Les assertions de Playwright sont expressives et incluent des fonctionnalités d'attente automatique :

```typescript
await expect(loginPage.dashboardHeading).toBeVisible();
await expect(page).toHaveURL(/\/dashboard\/index$/);
await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
```

### Gestion des états de la page

Plutôt que d'attendre des temps fixes, attendez des états spécifiques :

```typescript
// Attendre qu'un élément soit visible
await expect(element).toBeVisible();

// Attendre qu'un élément soit activé
await expect(button).toBeEnabled();

// Attendre qu'un texte soit présent
await expect(element).toHaveText("Bienvenue");

// Attendre qu'une valeur d'entrée soit spécifique
await expect(input).toHaveValue("texte attendu");
```

### Gestion des erreurs et débogage

Playwright offre plusieurs mécanismes pour faciliter le débogage :

1. **Mode tête** : Exécuter les tests avec l'interface visible
   ```bash
   npm run test:headed
   ```

2. **Mode débogage** : Exécuter pas à pas avec des points d'arrêt
   ```bash
   npm run test:debug
   ```

3. **Traces** : Enregistrement détaillé de l'exécution des tests
   ```bash
   # Dans playwright.config.ts
   trace: 'on-first-retry'  # ou 'retain-on-failure' ou 'on'
   ```

4. **Outils de développement intégrés** : 
   ```bash
   npx playwright codegen  # Générateur de code
   npx playwright show-report  # Visionneuse de rapports
   ```

## Bonnes pratiques démontrées

### Organisation des tests

Les tests sont organisés par fonctionnalité dans le dossier `tests/` :
- `login.spec.ts` : Tests liés à la connexion
- `accessibility.spec.ts` : Tests d'accessibilité
- `visual.spec.ts` : Tests de régression visuelle
- `performance.spec.ts` : Tests de performance
- `https.spec.ts` : Vérification de sécurité de base

### Séparation des préoccupations

- **Pages** (`pages/`) : Contiennent les localisateurs et les méthodes d'interaction
- **Tests** (`tests/`) : Contiennent uniquement la logique de test et les assertions
- **Configuration** (`playwright.config.ts`) : Configuration globale de Playwright
- **Ressources** (`.env`) : Variables d'environnement séparées du code

## Exercices pratiques

Pour approfondir votre compréhension, essayez ces exercices :

1. **Ajouter un nouveau test** :
   - Créez un test pour vérifier le lien "Forgot your password?"
   - Vérifiez que la page de réinitialisation de mot de passe s'ouvre correctement

2. **Modifier un localisateur** :
   - Essayez de remplacer un localisateur par un autre (par exemple, utiliser `getByLabel` au lieu de `locator` avec un sélecteur CSS)
   - Observez comment cela affecte la robustesse du test

3. **Ajouter une attente explicite** :
   - Ajoutez une attente pour un élément spécifique qui apparaît après une action
   - Utilisez `expect().toBeVisible()` avec un timeout personnalisé

4. **Expérimenter avec les rapports** :
   - Exécutez les tests avec différents niveaux de traçage
   - Analysez le trace.zip généré pour comprendre ce qui s'est passé pendant le test

5. **Intégrer de nouvelles vérifications** :
   - Ajoutez une vérification pour s'assurer que le logo de l'entreprise est présent sur la page de connexion
   - Vérifiez que certains éléments sont cachés jusqu'à ce que certaines conditions soient remplies

## Ressources supplémentaires

- [Documentation officielle de Playwright](https://playwright.dev/docs/intro)
- [Guide des sélecteurs Playwright](https://playwright.dev/docs/selectors)
- [Guide des tests Playwright](https://playwright.dev/docs/test-intro)
- [Guide du tracé Playwright](https://playwright.dev/docs/trace-viewer)
- [Exemples Playwright sur GitHub](https://github.com/microsoft/playwright/tree/main/examples)

Bon apprentissage et bon codage !