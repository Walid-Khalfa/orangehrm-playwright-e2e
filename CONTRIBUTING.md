# Guide de contribution

Merci pour votre intérêt à contribuer au projet Playwright Gemini Automation ! Ce document décrit le processus pour contribuer au projet.

## Comment contribuer

1. **Fork** le dépôt
2. **Clone** votre fork localement
3. Créez une **branche** pour votre modification (`git checkout -b feature/amazing-feature`)
4. Faites vos modifications
5. **Commit** vos changements (`git commit -m 'Add amazing feature'`)
6. **Push** votre branche (`git push origin feature/amazing-feature`)
7. Ouvrez une **Pull Request** vers la branche `main` du dépôt original

## Standards de code

### TypeScript
- Nous utilisons TypeScript avec une configuration stricte
- Suivez le style de code existant dans le projet
- Utilisez des noms de variables et de fonctions descriptifs
- Ajoutez des commentaires pour expliquer le pourquoi, pas le quoi

### Tests
- Écrivez des tests clairs et concis
- Utilisez le modèle Page Object Model (POM)
- Isoler les tests les uns des autres
- Utilisez les données de test centralisées dans `tests/test-data.ts`
- Nommez vos tests de manière descriptive en français

### Documentation
- Mettez à jour le README.md si nécessaire
- Ajoutez des commentaires explicatifs dans le code
- Maintenez LEARNING_GUIDE.md à jour

## Processus de revue de code

1. Toutes les Pull Requests doivent être revues par au moins un mainteneur
2. Les PR doivent passer tous les tests CI
3. Les changements doivent être bien documentés
4. Respectez les conventions de nommage et de style

## Signalement de problèmes

Si vous trouvez un bug ou avez une suggestion d'amélioration :
1. Vérifiez si le problème n'a pas déjà été signalé
2. Ouvrez une issue avec un titre clair et descriptif
3. Incluez les étapes pour reproduire le problème
4. Ajoutez des captures d'écran si pertinent
5. Spécifiez votre environnement (OS, Node.js version, etc.)

## Licence

En contribuant à ce projet, vous acceptez que vos contributions soient licenciées sous la licence MIT du projet.