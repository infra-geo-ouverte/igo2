[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Build Status](https://travis-ci.org/infra-geo-ouverte/igo2.svg?branch=master)](https://travis-ci.org/infra-geo-ouverte/igo2)
[![Joignez le forum https://gitter.im/igo2/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/igo2/Lobby)
[![Dependencies Status](https://david-dm.org/infra-geo-ouverte/igo2.svg)](https://david-dm.org/infra-geo-ouverte/igo2)
[![devDependencies Status](https://david-dm.org/infra-geo-ouverte/igo2/dev-status.svg)](https://david-dm.org/infra-geo-ouverte/igo2?type=dev)

# Infrastructure géomatique ouverte 2.0 (IGO2) / Open GIS Infrastructure 2.0
***

### Qu'est-ce qu'[IGO](http://igouverte.org/)?
IGO est une solution Web gratuite en géomatique. Consultez le site Web d'IGO pour en savoir davantage: [http://igouverte.org/](http://igouverte.org/).
Elle permet de tirer profit d’une multitude de données géographiques grâce à une interface cartographique accessible par un navigateur Web.
Les membres du public en géomatique et du Web qui soumettent des contributions conservent leurs droits d'auteur s'ils partagent leur code source selon la [LICENCE LiLiQ-R de type LGPL](LICENCE.txt).
IGO est un produit du gouvernement du Québec (Canada) et issu d’un travail collaboratif basé sur la philosophie des logiciels libres et ouverts (« open source »).
***
### What is [IGO](http://igouverte.org/english/)?
IGO (for Open GIS Infrastructure) is a free Web Geospatial solution developed in Quebec, Canada. See this Web site for more information: [http://igouverte.org/english/](http://igouverte.org/english/).
IGO has multiple features, such as Web GIS viewer, layer tree Manager and many more at [http://igouverte.org/english/](http://igouverte.org/english/).
Since this project is open source, anyone can contribute as long as they share their work on the same open source [LICENCE LGPL-Style](LICENSE_ENGLISH.txt). All contributors in IGO keep their property rights.

***

---
## Table des matières (Français)

- [Installation](#installation-et-démarrage)
- [Documentation](http://igo2.readthedocs.io/fr/latest/)
- [Tests](#tests)
- [Docker](#docker)
- [Structures des répertoires](#structures-des-répertoires)
- [Contribuer](#contribuer)


***

---
## Table of content (English)

- [Installation](#installation-en)
- [Documentation](http://igo2.readthedocs.io/fr/latest/english.html)
- [Tests](#tests-en)
- [Docker](#docker-en)
- [Folder structure](#folder-structure)
- [Contribute](#contribution)

***

## Installation et démarrage (Français)

Requis: node >=v6.5.0 et npm >=3.10.3

```bash
$ git clone --depth 1 https://github.com/infra-geo-ouverte/igo2.git
$ cd igo2

# Installer les dépendances
$ npm install

# Surveiller les fichiers et lancer une instance pour le développement
$ npm start
# Avec les tests continus
$ npm run start.deving
# Pour la prod
$ npm run start.prod

# Générer l'api de documentation
$ npm run compodoc
$ npm run serve.compodoc

# Build dev
$ npm run build.dev
# Build prod
$ npm run build.prod
# Build prod avec AoT
$ npm run build.prod.aot
```

## Tests

```bash
$ npm test

# Surveiller par karma
# Tests après chaque changement
$ npm run test.watch

# code coverage (istanbul)
$ npm run serve.coverage

# e2e (end-to-end intégration) - Dans 3 fenêtes différentes
# npm install webdriver-manager <- Seulement la première fois
# npm run webdriver-update <- Seulement la première fois
$ npm run webdriver-start
$ npm run serve.e2e
$ npm run e2e
```

## Docker

### Build de développement

```bash
$ docker-compose build
$ docker-compose up -d
```

Ouvrir un navigateur http://localhost:5555/igo2/

### Build de production

```bash
$ docker-compose -f docker-compose.production.yml build
$ docker-compose -f docker-compose.production.yml up igo2
$ docker-compose -f docker-compose.production.yml up -d igo2-nginx
```

Ouvrir un navigateur  http://localhost:5555/igo2/




## Structures des répertoires

```
.
├── .docker
│   ├── dist-build.development.dockerfile  <- Dockerfile pour l'environnement de développement
│   └── dist-build.production.dockerfile   <- Dockerfile pour l'environnement de production
├── .dockerignore              <- Fichier ignore pour les builds docker
├── LICENSE
├── README.md
├── appveyor.yml
├── docker-compose.production.yml  <- docker-compose pour l'environnement de production
├── docker-compose.yml         <- docker-compose pour l'environnement de développement
├── gulpfile.ts                <- configuration pour les tâches gulp
├── karma.conf.js              <- configuration pour les tests karma
├── package.json               <- dépendances du projet
├── protractor.conf.js         <- configuration pour les tests e2e
├── src                        <- source code de l'application
│   └── client
│       ├── app
│       │   ├── core
│       │   │   ├── config
│       │   │   │   └── env.config.ts
│       │   │   └── core.module.ts
│       │   ├── shared
│       │   │   └── shared.module.ts
│       │   ├── app.component.html
│       │   ├── app.component.spec.ts
│       │   ├── app.component.ts
│       │   ├── app.module.ts
│       │   ├── app-routing.module.ts
│       │   ├── i18n.providers.ts
│       │   ├── main-prod.ts
│       │   ├── main.ts
│       │   └── system-config.ts
│       ├── assets
│       │   ├── favicon
│       │   │   ├── favicon-DEV.ico
│       │   │   └── favicon-PROD.ico
│       │   ├── i18n
│       │   │   ├── en.json
│       │   │   └── fr.json
│       │   └── svg
│       │       └── more.svg
│       ├── css
|       |   ├── base.scss
│       │   └── main.scss
│       ├── index.html
│       └── tsconfig.json
├── test-config.js             <- Configuration pour les tests
├── test-main.js               <- Lanceur pour les tests karma
├── tools
│   ├── README.md              <- Outils documentation (en anglais)
│   ├── config
│   │   ├── banner-256.txt
│   │   ├── banner.txt
│   │   ├── project.config.ts  <- configuration of the specific project
│   │   ├── project.tasks.json <- override composite gulp tasks
│   │   ├── seed.config.ts     <- generic configuration of the seed project
│   │   ├── seed.config.interfaces.ts
│   │   ├── seed.tasks.json    <- default composite gulp tasks
│   │   └── seed.tslint.json   <- generic tslint configuration of the seed project
│   ├── config.ts              <- exported configuration (merge both seed.config and project.config, project.config overrides seed.config)
│   ├── debug.ts
│   ├── env                    <- configuration de l'environnement
│   │   ├── base.ts
│   │   ├── dev.ts
│   │   ├── env-config.interface.ts
│   │   └── prod.ts
│   ├── manual_typings         <- typings manuels
│   │   ├── project
│   │   └── seed
│   ├── tasks                  <- Tâches gulp
│   │   ├── project
│   │   └── seed
│   ├── utils                  <- build utils
│   │   ├── project
│   │   └── seed
│   └── utils.ts
├── tsconfig.json              <- configuration pour typescrypt
├── tslint.json                <- tslint configuration
└── yarn.lock
```

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


## Folder-structure

```
.
├── .docker
│   ├── dist-build.development.dockerfile  <- Dockerfile for dev env
│   └── dist-build.production.dockerfile   <- Dockerfile for prod env
├── .dockerignore              <- ignore file for builds docker
├── LICENSE
├── README.md
├── appveyor.yml
├── docker-compose.production.yml  <- docker-compose for prod env
├── docker-compose.yml         <- docker-composefor dev env
├── gulpfile.ts                <- configuration for gulp
├── karma.conf.js              <- configuration for karma
├── package.json               <- dependencies of the projet
├── protractor.conf.js         <- configuration for tests e2e
├── src                        <- source code of the app
│   └── client
│       ├── app
│       │   ├── core
│       │   │   ├── config
│       │   │   │   └── env.config.ts
│       │   │   └── core.module.ts
│       │   ├── shared
│       │   │   └── shared.module.ts
│       │   ├── app.component.html
│       │   ├── app.component.spec.ts
│       │   ├── app.component.ts
│       │   ├── app.module.ts
│       │   ├── app-routing.module.ts
│       │   ├── i18n.providers.ts
│       │   ├── main-prod.ts
│       │   ├── main.ts
│       │   └── system-config.ts
│       ├── assets
│       │   ├── favicon
│       │   │   ├── favicon-DEV.ico
│       │   │   └── favicon-PROD.ico
│       │   ├── i18n
│       │   │   ├── en.json
│       │   │   └── fr.json
│       │   └── svg
│       │       └── more.svg
│       ├── css
|       |   ├── base.scss
│       │   └── main.scss
│       ├── index.html
│       └── tsconfig.json
├── test-config.js             <- Tests Configuration
├── test-main.js               <- Launcher for tests karma
├── tools
│   ├── README.md              <- Doc tools
│   ├── config
│   │   ├── banner-256.txt
│   │   ├── banner.txt
│   │   ├── project.config.ts  <- configuration of the specific project
│   │   ├── project.tasks.json <- override composite gulp tasks
│   │   ├── seed.config.ts     <- generic configuration of the seed project
│   │   ├── seed.config.interfaces.ts
│   │   ├── seed.tasks.json    <- default composite gulp tasks
│   │   └── seed.tslint.json   <- generic tslint configuration of the seed project
│   ├── config.ts              <- exported configuration (merge both seed.config and project.config, project.config overrides seed.config)
│   ├── debug.ts
│   ├── env                    <- Env configuration
│   │   ├── base.ts
│   │   ├── dev.ts
│   │   ├── env-config.interface.ts
│   │   └── prod.ts
│   ├── manual_typings         <- typings manuels
│   │   ├── project
│   │   └── seed
│   ├── tasks                  <- gulp task
│   │   ├── project
│   │   └── seed
│   ├── utils                  <- build utils
│   │   ├── project
│   │   └── seed
│   └── utils.ts
├── tsconfig.json              <- typescript configuration
├── tslint.json                <- tslint configuration
└── yarn.lock
```

***

## Contribution 
If you have any question and want to contribute, contact the main email of IGO: info(a)igouverte.org or subscribe to the mailing-list (http://listes.securitepublique.gouv.qc.ca/sympa/info/igo-publique) mainly in French, but do not hesitate to ask questions in English, most of the IGO Team is bilingual. The documentation and API-XML is mainly in French, but if there is a demand, the project can be translate if needed, just contact us for more information at: info(a)igouverte.org
