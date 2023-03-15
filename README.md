[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![join chat https://gitter.im/igo2/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/igo2/Lobby)
[![Known Vulnerabilities](https://snyk.io/test/github/infra-geo-ouverte/igo2/badge.svg)](https://snyk.io/test/github/infra-geo-ouverte/igo2)

# Infrastructure géomatique ouverte 2.0 (IGO2) / Open GIS Infrastructure 2.0

---

### Qu'est-ce qu'IGO?

IGO2 est une solution Web gratuite en géomatique basée sur [Angular - Material](https://github.com/angular/angular), [OpenLayers](https://github.com/openlayers/openlayers) et [IGO2lib](https://github.com/infra-geo-ouverte/igo2-lib).
IGO2 permet de tirer profit d’une multitude de données géographiques grâce à une interface cartographique accessible par un navigateur Web sur un poste de travail et par un appareil mobile.
IGO2 a été initié par l'administration publique du Québec (Canada) et issu d’un travail collaboratif basé sur la philosophie des logiciels libres et ouverts (« open source »). Les membres du public en géomatique et du Web qui soumettent des contributions conservent leurs droits d'auteur s'ils partagent leur code source selon la [LICENCE LiLiQ-R de type LGPL](LICENCE.txt).

---

### What is IGO?

IGO2 (for Open GIS Infrastructure - version 2.0) is a free open source Web Geospatial solution developed at first in Quebec, Canada based on [Angular - Material](https://github.com/angular/angular), [OpenLayers](https://github.com/openlayers/openlayers) and [IGO2lib](https://github.com/infra-geo-ouverte/igo2-lib).
IGO2 is having multiple features, such as Web GIS viewer adapted to Desktop and Mobile and many more available at [https://igo2.readthedocs.io/fr/latest/english.html](https://igo2.readthedocs.io/fr/latest/english.html). Since this project is open source, anyone can contribute as long as they share their work on the same open source [LICENCE LGPL-Style](LICENSE_ENGLISH.txt). All contributors in IGO keep their property rights.

---

---

## Table des matières (Français)

- [Téléchargement](#téléchargement)
- [Installation pour déploiement serveur](#installation-pour-déploiement-serveur)
- [Installation pour développeurs](#installation-et-démarrage-pour-développeurs)
- [Démo on GitHub](https://infra-geo-ouverte.github.io/igo2/)
- [Démo d'IGO2 de Données Québec](https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/)
- [Documentation](https://igo2.readthedocs.io/fr/latest/)
- [Tests](#tests)
- [Contribuer](#contribuer)

---

---

## Table of content (English)

- [Download](#download)
- [Installation (for server deployment)](#installation-for-server-deployment)
- [Installation for developpers](#installation-for-developpers)
- [Demo on GitHub](https://infra-geo-ouverte.github.io/igo2/)
- [Demo IGO2 from Open Data Quebec (Canada)](https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/)
- [Documentation (translation is not yet done)](https://igo2.readthedocs.io/fr/latest/)
- [Tests](#tests-en)
- [Contribute](#contribution)

---

## Téléchargement

- [Version 1.14.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.14.2/igo2.zip)
- [Version 1.13.4](https://github.com/infra-geo-ouverte/igo2/releases/download/1.13.4/igo2.zip)
- [Version 1.12.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.12.1/igo2.zip)
- [Version 1.11.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.11.1/igo2.zip)
- [Version 1.10.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.10.0/igo2.zip)
- [Version 1.9.4](https://github.com/infra-geo-ouverte/igo2/releases/download/1.9.4/igo2.zip)
- [Version 1.8.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.8.2/igo2.zip)
- [Version 1.7.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.7.2/igo2.zip)
- [Version 1.6.3](https://github.com/infra-geo-ouverte/igo2/releases/download/1.6.3/igo2.zip)
- [Version 1.5.3](https://github.com/infra-geo-ouverte/igo2/releases/download/1.5.3/igo2.zip)
- [Version 1.4.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.4.1/igo2.zip)
- [Version 1.3.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.3.1/igo2.zip)
- [Version 1.2.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.2.0/igo2.zip)
- [Version 1.1.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.1.0/igo2.zip)
- [Version 1.0.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.0.0/igo2.zip)

## Installation (pour déploiement serveur)

1. [Télécharger](#téléchargement) la version désirée.
2. Décompresser le fichier télécharger
3. Déploier l'application sur un serveur Web (NGinx, Apache HTTPD, IIS ...)
4. Servir le fichier index.html
5. Personnaliser le contenu cartogtaphique (contexts.json et _default.json ou ...)

## Installation et démarrage (pour développeurs)

Requis:

| IGO2 version | Node version |
| ------------ | ------------ |
| > 1.5.x      | >= 12, <= 14 |
| < 1.5.x      | >= 8, <= 11  |
| 0.x.x        | >= 6, <= 10  |

```bash
$ git clone --depth 1 https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Installer les dépendances
$ npm install

# Surveiller les fichiers et lancer une instance pour le développement
# Il est possible que vos changements de librairies ne soient pas appliqués.
# Webpack (suite au npm start) ne surveille plus les changement de node_modules. Il observe seulement la version des dépendances. De ce fait, les 
# changements de code ne sont pas recompilées.
# Pour corriger ceci, désactiver la cache avec la variable d'environnement NG_BUILD_CACHE = "false"
$ npm start
# Ouvrir un navigateur http://localhost:4201/

# Build prod
$ npm run build.prod
$ npm run serve.prod
# Ouvrir un navigateur http://localhost:4201/

# Générer l'api de documentation
$ npm run doc
# Ouvrir un navigateur http://localhost:4220/
```

## Tests

```bash
$ npm test

# Tests après chaque changement
$ npm run test.watch

# code coverage (istanbul)
$ npm run coverage

# e2e (end-to-end intégration)
$ npm start
$ npm run e2e
```

---

## Contribuer

Nous sommes bien heureux que vous pensiez contribuer à IGO! Avant de le faire, nous vous encourageons à lire le guide de [contribution](.github/CONTRIBUTING.md), la [LICENCE](LICENCE.txt) et le [WIKI](https://github.com/infra-geo-ouverte/igo2/wiki/IGO2-:-Auto-formation-pour-d%C3%A9veloppeurs). Si vous avez d'autres questions, n'hésitez pas à communiquer avec nous à l'adresse suivante info(a)igouverte.org ou par [Gitter](https://gitter.im/igo2/).

---

---

## Download

- [Version 1.14.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.14.2/igo2.zip)
- [Version 1.13.4](https://github.com/infra-geo-ouverte/igo2/releases/download/1.13.4/igo2.zip)
- [Version 1.12.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.12.1/igo2.zip)
- [Version 1.11.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.11.1/igo2.zip)
- [Version 1.10.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.10.0/igo2.zip)
- [Version 1.9.4](https://github.com/infra-geo-ouverte/igo2/releases/download/1.9.4/igo2.zip)
- [Version 1.8.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.8.2/igo2.zip)
- [Version 1.7.2](https://github.com/infra-geo-ouverte/igo2/releases/download/1.7.2/igo2.zip)
- [Version 1.6.3](https://github.com/infra-geo-ouverte/igo2/releases/download/1.6.3/igo2.zip)
- [Version 1.5.3](https://github.com/infra-geo-ouverte/igo2/releases/download/1.5.3/igo2.zip)
- [Version 1.4.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.4.1/igo2.zip)
- [Version 1.3.1](https://github.com/infra-geo-ouverte/igo2/releases/download/1.3.1/igo2.zip)
- [Version 1.2.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.2.0/igo2.zip)
- [Version 1.1.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.1.0/igo2.zip)
- [Version 1.0.0](https://github.com/infra-geo-ouverte/igo2/releases/download/1.0.0/igo2.zip)


## Installation (for server deployment)

1. [Download](#download) the desired version.
2. Unzip the download file
3. Deploy the application on a web server (NGinx, Apache HTTPD, IIS...)
4. Serve the index.html file
5. Customize map content (contexts.json and _default.json)
## Installation (for developpers)

Require:

| IGO2 version | Node version |
| ------------ | ------------ |
| > 1.5.x      | >= 12, <= 14 |
| < 1.5.x      | >= 8, <= 11  |
| 0.x.x        | >= 6, <= 10  |

```bash
$ git clone https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Install dépendencies
$ npm install

# Check files and launch dev instance
# Your library changes may not be applied.
# Webpack (following npm start) no longer monitors node_modules changes. It only observes the version of the dependencies. Therefore, the
# code changes are not recompiled.
# To fix this, disable the cache with the environment variable NG_BUILD_CACHE = "false"
$ npm start
# Open your browser at http://localhost:4201/

# Build prod
$ npm run build.prod
$ npm run serve.prod
# Open your browser at http://localhost:4201/

# Doc API generation
$ npm run doc
# Open your browser at http://localhost:4220/

```

## Tests-en

```bash
$ npm test

# Check by karma
# Tests after each change
$ npm run test.watch

# code coverage (istanbul)
$ npm run coverage

# e2e (end-to-end intégration)
$ npm start
$ npm run e2e
```

## Contribution

Before contributing, please read the [guidelines](.github/CONTRIBUTING.md), the [LICENCE](LICENSE_ENGLISH.txt) and the [WIKI](https://github.com/infra-geo-ouverte/igo2/wiki). If you have any question and want to contribute, contact the main email of IGO info(a)igouverte.org or on [Gitter](https://gitter.im/igo2/)
