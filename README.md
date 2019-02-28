[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/infra-geo-ouverte/igo2.svg?branch=master)](https://travis-ci.org/infra-geo-ouverte/igo2)
[![join chat https://gitter.im/igo2/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/igo2/Lobby)
[![Dependencies Status](https://david-dm.org/infra-geo-ouverte/igo2.svg)](https://david-dm.org/infra-geo-ouverte/igo2)
[![devDependencies Status](https://david-dm.org/infra-geo-ouverte/igo2/dev-status.svg)](https://david-dm.org/infra-geo-ouverte/igo2?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/infra-geo-ouverte/igo2/badge.svg)](https://snyk.io/test/github/infra-geo-ouverte/igo2)

# Infrastructure géomatique ouverte 2.0 (IGO2) / Open GIS Infrastructure 2.0
***

### Qu'est-ce qu'IGO?
IGO2 est une solution Web gratuite en géomatique basée sur [Angular 4 -  Material](https://github.com/angular/angular), [OpenLayers 4](https://github.com/openlayers/openlayers) et [IGO2lib](https://github.com/infra-geo-ouverte/igo2-lib).
IGO2 permet de tirer profit d’une multitude de données géographiques grâce à une interface cartographique accessible par un navigateur Web sur un poste de travail et par un appareil mobile.
IGO2 a été initié par l'administration publique du Québec (Canada) et issu d’un travail collaboratif basé sur la philosophie des logiciels libres et ouverts (« open source »). Les membres du public en géomatique et du Web qui soumettent des contributions conservent leurs droits d'auteur s'ils partagent leur code source selon la [LICENCE LiLiQ-R de type LGPL](LICENCE.txt).
***
### What is IGO?
IGO2 (for Open GIS Infrastructure - version 2.0) is a free open source Web Geospatial solution developed at first in Quebec, Canada based on [Angular 4 - Material](https://github.com/angular/angular), [OpenLayers 4](https://github.com/openlayers/openlayers) and [IGO2lib](https://github.com/infra-geo-ouverte/igo2-lib). 
IGO2 is having multiple features, such as Web GIS viewer adapted to Desktop and Mobile and many more available at [http://igo2.readthedocs.io/fr/latest/english.html](http://igo2.readthedocs.io/fr/latest/english.html). Since this project is open source, anyone can contribute as long as they share their work on the same open source [LICENCE LGPL-Style](LICENSE_ENGLISH.txt). All contributors in IGO keep their property rights.
***

---
## Table des matières (Français)

- [Installation](#installation-et-démarrage)
- [Démo on GitHub](https://infra-geo-ouverte.github.io/igo2/)
- [Démo d'IGO2 de Données Québec](https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/)
- [Documentation](http://igo2.readthedocs.io/fr/latest/)
- [Tests](#tests)
- [Suivi du projet](https://overv.io/infra-geo-ouverte/igo2/)
- [Docker](#docker)
- [Contribuer](#contribuer)


***

---
## Table of content (English)

- [Installation](#installation-en)
- [Demo on GitHub](https://infra-geo-ouverte.github.io/igo2/)
- [Demo IGO2 from Open Data Quebec (Canada)](https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/)
- [Documentation](http://igo2.readthedocs.io/fr/latest/english.html)
- [Tests](#tests-en)
- [Follow in overvio](https://overv.io/infra-geo-ouverte/igo2/)
- [Docker](#docker-en)
- [Contribute](#contribution)

***

## Installation et démarrage

Requis: node >=v6.5.0 et npm >=3.10.3

```bash
$ git clone --depth 1 https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Installer les dépendances
$ npm install

# Surveiller les fichiers et lancer une instance pour le développement
$ npm start
# Ouvrir un navigateur http://localhost:4201/
 
# Build dev
$ npm run build.dev
$ npm run serve.dev
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

## Docker

### Build de développement

```bash
$ docker-compose build
$ docker-compose up -d
```
Ouvrir un navigateur http://localhost:4201/


***
## Contribuer
Nous sommes bien heureux que vous pensiez contribuer à IGO! Avant de le faire, nous vous encourageons à lire le guide de [contribution](.github/CONTRIBUTING.md), la [LICENCE](LICENCE.txt) et le [WIKI](https://github.com/infra-geo-ouverte/igo2/wiki). Si vous avez d'autres questions, n'hésitez pas à communiquer avec nous à l'adresse suivante : info(a)igouverte.org.

***

***

## Installation-en

Require: node >=v6.5.0 & npm >=3.10.3

```bash
$ git clone https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Install dépendencies
$ npm install

# Check files and launch dev instance
$ npm start
# Open your browser at http://localhost:4201/

# Build dev
$ npm run build.dev
$ npm run serve.dev
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

## Docker-en

### Dev Build

```bash
$ docker-compose build
$ docker-compose up -d
```

Open in a browser http://localhost:4201/

***

## Contribution

Before contributing, please read the [guidelines](.github/CONTRIBUTING.md), the [LICENCE](LICENSE_ENGLISH.txt) and the [WIKI](https://github.com/infra-geo-ouverte/igo2/wiki). If you have any question and want to contribute, contact the main email of IGO: info(a)igouverte.org. 

