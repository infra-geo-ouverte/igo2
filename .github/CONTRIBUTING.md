## Table des matières (Français)

- [Soumettre un bogue](#soumettre-un-bogue)
- [Soumettre un Pull Request](soumettre-un-pull-request)
- [Guide pour les commits Git](#guide-pour-les-commits-git)

***

## Table of content (English)

- [Submitting bug reports](#submitting-bug-reports)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Git Commit Guidelines](#git-commit-guidelines)

***

## Soumettre un bogue

* Détailler les navigateurs et les sytèmes d'exploitation affectés
* Indiquer la version de node utilisée
* Décrire la méthode pour reproduire le bogue


## Soumettre un Pull Request

* Faire un rebase de votre branche
* Exécuter ```npm install``` pour être sûr que les dépendances soient à jour
* S'assurer que les tests sont toujours valides en exécutant:
 * ```npm test```
* Ajouter des tests pour les nouvelles fonctionnalités
* Si possible, indiquer les issues concernés par le pull request


## Guide pour les commits Git

### Format du message du commit

```
<type>(<scope>): <sujet>
```

### Type

Doit être l'un des suivants:

* feat: Nouvelle fonctionnalité (feature)
* fix: Corrige un bogue
* docs: Concernant seulement la documentation
* style: Changement n'affectant pas le sens du code (espace, formatage, point-virgule manquant, etc)
* refactor: Code qui ne corrige pas un bogue et qui n'ajoute pas de nouvelle fonctionnalité
* perf: Amélioration de la performance
* test: Ajout ou correction des tests
* chore: Changement aux opérations courantes (procédure de build, génération de la documentation, etc)
* BREAKING CHANGE: Changement non rétrocompatible

### Scope

Indiquer la fonctionnalité concernée par le changement.
Utiliser * si le changement affecte plus qu'une seule fonctionnalité.

### Sujet

Une courte description des changement
* Commencer avec un verbe à l'impératif présent
* Ne débutant pas avec une majuscule
* Sans point à la fin


***

## Submitting bug reports

* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of node you're using
* Describe the method to reproduce the bug


## Submitting Pull Requests

* Please rebase your branch against the current master
* Run ```npm install``` to make sure your development dependencies are up-to-date
* Please ensure that the test suite passes and that code is lint free before submitting by running:
 * ```npm test```
* If you've added new functionality, please include tests which validate its behaviour
* Make reference to possible issues on pull request comment


## Git Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>
```

### Type

Must be one of the following:

* feat: A new feature
* fix: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* refactor: A code change that neither fixes a bug nor adds a feature
* perf: A code change that improves performance
* test: Adding missing or correcting existing tests
* chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
* BREAKING CHANGE: Changes that potentially causes other components to fail

### Scope

The scope could be anything specifying place of the commit change.
You can use * when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

* Use the imperative, present tense
* Don't capitalize first letter
* No dot (.) at the end
