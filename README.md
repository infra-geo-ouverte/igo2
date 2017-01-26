[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/infra-geo-ouverte/igo2.svg?branch=master)](https://travis-ci.org/infra-geo-ouverte/igo2)
[![Joignez le forum https://gitter.im/igo2/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/igo2/Lobby)
[![Dependencies Status](https://david-dm.org/infra-geo-ouverte/igo2.svg)](https://david-dm.org/infra-geo-ouverte/igo2)
[![devDependencies Status](https://david-dm.org/infra-geo-ouverte/igo2/dev-status.svg)](https://david-dm.org/infra-geo-ouverte/igo2?type=dev)

# Infrastructure géomatique ouverte 2.0 (IGO2) / Open GIS Infrastructure 2.0
***

### Qu'est-ce qu'[IGO](http://igouverte.org/)?
IGO2 est une solution Web gratuite en géomatique basée sur [Angular 2](https://github.com/angular/angular), [OpenLayers 3](https://github.com/openlayers/ol3) et [Bootstrap](https://github.com/twbs/bootstrap). Consultez le site Web d'IGO pour en savoir davantage: [http://igouverte.org/](http://igouverte.org/).
IGO2 permet de tirer profit d’une multitude de données géographiques grâce à une interface cartographique accessible par un navigateur Web sur un poste de travail et par un appareil mobile.
IGO2 a été initié par l'administration publique du Québec (Canada) et issu d’un travail collaboratif basé sur la philosophie des logiciels libres et ouverts (« open source »). Les membres du public en géomatique et du Web qui soumettent des contributions conservent leurs droits d'auteur s'ils partagent leur code source selon la [LICENCE LiLiQ-R de type LGPL](LICENCE.txt).
***
### What is [IGO](http://igouverte.org/english/)?
IGO2 (for Open GIS Infrastructure - version 2.0) is a free open source Web Geospatial solution developed at first in Quebec, Canada based on [Angular 2](https://github.com/angular/angular), [OpenLayers 3](https://github.com/openlayers/ol3) and [Bootstrap](https://github.com/twbs/bootstrap). See this Web site for more information: [http://igouverte.org/english/](http://igouverte.org/english/).
IGO2 is having multiple features, such as Web GIS viewer adapted to Desktop and Mobile and many more available at [http://igo2.readthedocs.io/fr/latest/english.html](http://igo2.readthedocs.io/fr/latest/english.html). Since this project is open source, anyone can contribute as long as they share their work on the same open source [LICENCE LGPL-Style](LICENSE_ENGLISH.txt). All contributors in IGO keep their property rights.
***

---
## Table des matières (Français)

- [Installation](#installation-et-démarrage)
- [Documentation](http://igo2.readthedocs.io/fr/latest/)
- [Tests](#tests)
- [Suivi du projet](https://overv.io/infra-geo-ouverte/igo2/)
- [Docker](#docker)
- [Structures des répertoires](#structures-des-répertoires)
- [Contribuer](#contribuer)


***

---
## Table of content (English)

- [Installation](#installation-en)
- [Documentation](http://igo2.readthedocs.io/fr/latest/english.html)
- [Tests](#tests-en)
- [Follow in overvio](https://overv.io/infra-geo-ouverte/igo2/)
- [Docker](#docker-en)
- [Folder structure](#folder-structure)
- [Contribute](#contribution)

***

## Installation et démarrage (Français)

Requis: node >=v6.5.0 et npm >=3.10.3

```bash
#npm completion >> ~/.bashrc

$ git clone --depth 1 https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Installer les dépendances
$ npm install -g angular-cli@1.0.0-beta.26
$ npm install

# Surveiller les fichiers et lancer une instance pour le développement
$ npm start
# Ouvrir un navigateur http://localhost:4200/igo/

# Générer l'api de documentation
# $ npm run compodoc
# $ npm run serve.compodoc

# Build dev
$ npm run build.dev
# Build prod
$ npm run build.prod
```

## Tests

```bash
$ npm test

# Surveiller par karma
# Tests après chaque changement
# $ npm run test.watch

# code coverage (istanbul)
# $ npm run serve.coverage

# e2e (end-to-end intégration) - Dans 3 fenêtes différentes
# npm install webdriver-manager <- Seulement la première fois
# npm run webdriver-update <- Seulement la première fois
#$ npm run webdriver-start
#$ npm run serve.e2e
# $ npm run e2e
```

## Docker

### Build de développement

```bash
$ docker-compose build
$ docker-compose up -d
```

Ouvrir un navigateur http://localhost:4200/igo/

### Build de production

```bash
#$ docker-compose -f docker-compose.production.yml build
#$ docker-compose -f docker-compose.production.yml up igo2
#$ docker-compose -f docker-compose.production.yml up -d igo2-nginx
```

Ouvrir un navigateur  http://localhost:5555/igo2/


***
## Contribuer
Nous sommes bien heureux que vous pensiez contribuer à IGO! Avant de le faire, nous vous encourageons à lire le guide de [contribution](http://igouverte.org/contribuer/), la [LICENCE](LICENCE.txt) et la [FAQ](http://igouverte.org/faq/). Si vous avez d'autres questions, n'hésitez pas à communiquer avec nous à l'adresse suivante : info(a)igouverte.org ou à vous inscrire à la liste [courriel](http://listes.securitepublique.gouv.qc.ca/sympa/info/igo-publique).

***

***

## Installation-en

Require: node >=v6.5.0 & npm >=3.10.3

```bash
$ git clone --depth 1 https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Install dépendencies
$ npm install

# Check files and launch dev instance
$ npm start
# Avec les tests continus
$ npm run start.deving
# Pour la prod
$ npm run start.prod

# Doc API generation
$ npm run compodoc
$ npm run serve.compodoc

# Build dev
$ npm run build.dev
# Build prod
$ npm run build.prod
# Build prod with AoT
$ npm run build.prod.aot
```

## Tests-en

```bash
$ npm test

# Check by karma
# Tests after each change
$ npm run test.watch

# code coverage (istanbul)
$ npm run serve.coverage

# e2e (end-to-end intégration) - in 3 different window
# npm install webdriver-manager <- Only for the first time
# npm run webdriver-update <- Only for the first time
$ npm run webdriver-start
$ npm run serve.e2e
$ npm run e2e
```

## Docker-en

### Dev Build

```bash
$ docker-compose build
$ docker-compose up -d
```

Open in a browser http://localhost:5555/igo2/

### Production build

```bash
$ docker-compose -f docker-compose.production.yml build
$ docker-compose -f docker-compose.production.yml up igo2
$ docker-compose -f docker-compose.production.yml up -d igo2-nginx
```

Open in a browser  http://localhost:5555/igo2/


***

## Contribution
If you have any question and want to contribute, contact the main email of IGO: info(a)igouverte.org or subscribe to the mailing-list (http://listes.securitepublique.gouv.qc.ca/sympa/info/igo-publique) mainly in French, but do not hesitate to ask questions in English, most of the IGO Team is bilingual. The documentation and API-XML is mainly in French, but if there is a demand, the project can be translate if needed, just contact us for more information at: info(a)igouverte.org
