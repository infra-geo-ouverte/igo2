.. include:: global.rst

.. meta::
   :DC.creator: Gouvernement du Québec
   :DC.language: fr

---------------------
Configuration requise
---------------------

Cette section détaille les configurations possibles pour le 
navigateur dans un contexe cartographique. 
À l'aide de fichiers de configuration (fichiers JSON) , il est possible de paramétrer:

      - l'application 
      - contenu cartographie.

==============================
Application
==============================

La configuration de l'application est possible grâce 
au fichier **config.json**. 
Ce dernier est situé dans le répertoire : 

    - `src/config/config.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/config/config.json>`_

Il est également de configurer l'application grâce a un second 
fichier selon l'environnement désiré (test ou production). 
Pour modifier le comportement de l'application, vous pouvez modifier:

    - `igo2/src/environments/environment.prod.ts <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.prod.ts>`_
    - `igo2/src/environments/environment.ts <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


Si vous désirez changer, le chemin d'accès de ce fichier ou bien d'environnement.*.ts , il est spécifié dans le code de l'application dans le fichier:

    - `/src/app/app.module.ts <https://github.com/infra-geo-ouverte/igo2/blob/54e74aa21ac66745f81dbbca77334c244e9f9b12/src/app/app.module.ts#L41>`_ ligne 41.

Important : Notez que le fichier config.json à préséance sur le fichier environment.*.ts


*********************
Résumé
*********************

    .. list-table::
       :widths: 10 10 30 15
       :header-rows: 1
    
       * - Propriétés
         - Type
         - Description
         - Outil lié
       * - auth
         - `Auth`_
         - .. line-block::
               Objet permettant d'activer le serveur 
               d'authentification.
         -
       * - catalog
         - `Catalog`_ []
         - .. line-block::
               Doit être présente si l'outil de catalogue.
               Permet de gérer les sources WMS et WMTS
         - .. line-block::
               Catalog
               CatalogBrowser
       * - context
         - `Context`_
         - .. line-block::
               Activation de l'API de context d'IGO2. 
               Cette API sera documentée 
               indépendamment ce la présente 
               documentation.
         - ContextManager
       * - `hasExpansionPanel`_
         - Boolean
         - .. line-block::
               Permet d'ouvrir un paneau d'expansion à partir 
               d'un bouton situé dans le coin inférieur gauche
               de la carte. 
               Ce dernier contient les données tabulaire pour
                les données WFS / Vectorielle / Cluster
               ** Encore en développement **
         - 
       * - importExport
         - `ImportExport`_
         - .. line-block::
               Nécessaire si l'outil d'importation exportation
               pour gérer l'importation des Shapefiles  
         - .. line-block::
               Importation
               Exportation
       * - **language***
         - `Language`_
         - .. line-block::
               Chemin d'accès des fichiers de traduction de 
               l'application. 
         - Tous 
       * - projections
         - `Projection`_ []
         - .. line-block::
               Liste de projections non enregistrées
               par défault par OpenLayers. 
         - 
       * - routingSources
         - `RoutingSource`_
         - .. line-block::
               Source serveur pour la création des itinéraires.
               Actuellement, le serveur utilisé est OSRM.  
         - Itinéraire
       * - **searchSources***
         - `SearchSources`_
         - .. line-block::
               Nécessaire afin de permettre la recherche par
               texte et/ou la recherche par coordonnées.
         - .. line-block::
               Recherche
               Carte
       * - `Theme`_ *
         - String
         - .. line-block::
               Permet de définir les thèmes de l'application.
               Les choix sont:
                   - blue-theme
                   - bluegrey.theme
                   - dark.theme
               Le répertoire où sont conservés les thèmes est 
               le `igo2-lib/packages/core/src/style/themes <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/core/src/style/themes>`_
         -  

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.


***************
Auth
***************

    .. note::
       En cours de construction

    .. line-block::
        Voici ma desc

Exemples

        .. code:: json

            "auth": {
                "url": "/apis/users",
                "tokenKey": "id_token_igo",
                "allowAnonymous": true
            }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **url***
         - String
         - .. line-block::
               Définit l'url d'appel du service 
               d'authentification
         - 
         - 
       * - **tokenKey***
         - String
         - .. line-block::
               Définit la clef de l'api d'authentification
               utilisée
         - 
         -  
       * - allowAnonymous
         - Boolean
         - .. line-block::
               Permet/Bloque l'accès aux usagers non
               authentifiés
               d'accéder aux contextes publics 
         - true | false
         - true
       * - ...
         - ...
         - .. line-block::
               ...
         - ...
         - ...

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/auth/src/lib/shared/auth.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/2f8f274146b0fff4cc82d09f598bff838c6caaab/packages/auth/src/lib/shared/auth.interface.ts>`_
        

***************
Catalog
***************

    .. line-block::
        Cette section de la configuration permet de charger une liste de sources de cataloguage. Une fois les sources chargées, il est possible d'ajouter des couches d'informations à la carte.
      
        Les sources de cataloguage permise:
            - Service WMS 
            - Service WMTS
            - baselayers
      
        Les couches d'informations contenues dans ces services sont récupérées grâce au couches publiées dans le GetCapabilities du service.

        Dans la présente version
            1- les couches ajoutées par le catalogue sont partagées lors du partage de carte.
            2- La structure de l'url pour les couches partagées est la suivante:
                - wmsUrl =­­> une liste, séparé par une ',' (virgule) listant les url de service ajoutées.
                      - Exemple : wmsUrl=urlDuService1,urlDuService2
                - layers => une liste, séparé par une ',' (virgule) groupé par un bloc de parenthèses, respectant l'ordre des services déclarés dans wmsUrl
                      - Exemple : layers=(layer1,layer2),(layer3,layer4)
                            - layer1 et layer2 proviennent de l'url "urlDuService1"
                            - layer3 et layer4 proviennent de l'url "urlDuService2"
                            - si un "layer" possède le suffix :igoz13
                            - Il s'agit de la position du "layer" dans la table des matières. Ici la position 13.
      
        Chaque couche ajoutée possède un identifiant unique généré à partir du "layer name" et de l'url du service source. Se référer à :`igo2-lib/packages/geo/src/lib/datasource/utils/id-generator.ts#L15 <https://github.com/infra-geo-ouverte/igo2-lib/blob/6f37684adc809c82b185556719daac4bace0eea1/packages/geo/src/lib/datasource/utils/id-generator.ts#L15>`_

Exemples

        .. code:: json

            "catalog": {
                  "sources": [
                  {
                        "id": "opendataqc",
                        "title": "Données Ouvertes Québec",
                        "url": "/ws/igo_gouvouvert.fcgi"
                  },
                  {
                        "id": "mtq",
                        "title": "MTQ",
                        "url": "/swtq",
                        "sortDirection": "desc",
                        "queryFormat": {
                              "htmlgml2": "*",
                              "json": "stations_meteoroutieres"
                              },
                        "queryHtmlTarget": "iframe",
                        "count": 365
                        "tooltipType": "abstract"
                  },
                  {
                        "id": "regexmtq",
                        "title": "MTQ (filtered by regex)",
                        "url": "/swtq",
                        "regFilters": ["zpegt"]
                  }
                  ]
            }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - count
         - Integer
         - .. line-block::
               Nombre de résultats retournés par le serveur
               lors de requêtes **WMS** de GetFeatureInfo
         - 
         - 5
       * - **id***
         - String
         - .. line-block::
               Identifiant unique permettant de différencier
               les catalogues entre eux.
         - 
         - uuid()
       * - matrixSet
         - String
         - .. line-block::
               Nom du matrixSet définit pour le service 
               WMTS seulement
               **Obligatoire pour les services WMTS**
         - 
         - 
       * - queryFormat
         - QueryFormat
         - .. line-block::
               Pour les services **WMS**, le format d'interrogation
               de la données.
         - Voir **QueryFormat**
         -       
       * - queryHtmlTarget
         - String
         - .. line-block::
               Pour les services **WMS**, definit la destination des
               résultats d'interrogation pour les formats HTML.
         - iframe (intégré
           à la plage) ou 
           _blank (ouverture
           page externe)
         - iframe
       * - queryParams
         - objet {}
         - .. line-block::
               Paramètre supplémentaires à ajouter à l'appel des 
               couches ajoutées à partir du service. 
               Que ce soit des paramètres normés (WMS|WMTS) 
               ou lié à votre service.
         - 
         -
       * - regFilters
         - String[]
         - .. line-block::
               Une liste d'expressions régulières (regex) 
               permettant de limiter les couches 
               d'information présentés dans l'outil 
               CatalogBrowser
         - 
         - 
       * - requestEncoding
         - String
         - .. line-block::
               Type d'encodage des paramètre demandés au
               serveur
         - KVP REST
         - KVP
       * - setCrossOriginAnonymous
         - Boolean
         - .. line-block::
               Afin de définir si l'entête de l'appel faite
               au serveur sera anonyme. Permet entre autres,
               d'éviter les problématiques de CORS 
         - true false
         - false
       * - sortDirection
         - String
         - .. line-block::
               Permet de trier l'ordre d'apparition des couches
               du catalogue dans l'outil CatalogBrowser
               Influence l'ordre d'ajout des couches 
               d'information à la carte.
         - asc desc
         - .. line-block::
               Aucun, l'ordre présenté par service
       * - timeFilter
         - TimeFilterOptions
         - .. line-block::
               Options temporelles liées à l'entièreté des 
               couches du service web.
         - .. line-block::
               Voir **TimeFilter**
         - 1.0.0 (WMTS)
       * - **title***
         - String
         - .. line-block::
               Titre pour la source du catalogue qui sera utilisé
               dans l'outil Catalog
         - 
         - 
       * - tooltipType
         - String
         - .. line-block::
               Pour les couches ajoutées, défini si le tooltip
               (sulvol du titre) sera le résumé du "layer" 
               (**wms/wmts**) ou son titre
         - abstract title
         - title
       * - type
         - String
         - .. line-block::
               Type de service à appeler
         - baselayers wmts wms
         - wms
       * - **url***
         - String
         - .. line-block::
               Url du service WMS ou WMTS sans les paramètre
               d'url normés OGC
               (i.e. service=wms&request=GetCapabilities)
               OU url du service de baselayers
         - 
         - 
       * - version
         - String
         - .. line-block::
               Url du service WMS ou WMTS sans les paramètre
               d'url normés OGC
               (i.e. service=wms&request=GetCapabilities)
               OU url du service de baselayers
         - .. line-block::
               Référer au 
               GetCapabilities
               du service 
               (WMS|WMTS)
         - 1.0.0 (WMTS)

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/geo/src/lib/catalog/shared/catalog.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/catalog/shared/catalog.interface.ts>`_
        - `igo2/blob/master/src/environments/environment.github.ts <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.github.ts>`_

***************
Context
***************

    .. note::
       En cours de construction

    .. line-block::
        Permet de rejoindre une API nous fournissant des contextes cartographiques.
        Cette API sera documentée indépendamment ce la présente documentation.

Exemples

        .. code:: json
 
            context: {
                url: 'https://geoegl.msp.gouv.qc.ca/apis/igo2/...',
                defaultContextUri: '5'
            }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **url***
         - String
         - .. line-block::
               Définit l'url d'appel du service 
               de contexte
         - 
         - 
       * - **defaultContextUri***
         - String
         - .. line-block::
               Nom ou identifiant du contexte
               cartographique par défaut.
         - 
         -  _default

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/context/src/lib/context-manager/shared/context.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/context/src/lib/context-manager/shared/context.interface.ts>`_

    
*****************
hasExpansionPanel
*****************

    .. note::
       En cours de construction


***************
ImportExport
***************

    .. line-block::
        Cette configuration permet de définir un service qui sera en mesure de convertir des formats de fichiers géométriques non gérés par IGO2(OpenLayers).

        Actuellement, les GeoJson, KML, KMZ sont acceptés par IGO2. Par contre, les `Esri Shapefile  <https://www.esri.com/library/whitepapers/pdfs/shapefile.pdf>`_ doivent transiger par un serveur de conversion. 

        C'est à partir ce cette propriété que vous pouvez définir le serveur de conversion qui vous retournera un fichier utilisable par IGO2 (GeoJson).

Exemples

        .. code:: json

            importExport: {
                url: 'https://geoegl.msp.gouv.qc.ca/apis/ogre'
            }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **url***
         - String
         - .. line-block::
               Url du service de conversion.
         - .. line-block::
               https://geoegl.msp.gouv.qc.ca/apis/ogre
         - 

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/geo/src/lib/import-export/shared/import.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/a841bced1ccc305b001d6db84f913c4c2ba27bf7/packages/geo/src/lib/import-export/shared/import.interface.ts>`_


***************
Language
***************

    .. line-block::
        Définir le dossier contenant les fichiers de traduction de l'appplication. 
        IGO2 est actuellement disponible en anglais et en francais, selon les paramètres du navigateur.
        Il est toutefois possible de définir le language désiré à même le code de l'application.

Exemples

        .. code:: json

            language: {
                prefix: './locale/'
            }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **prefix***
         - String
         - .. line-block::
               Définir le dossier contenant
               les fichiers de traduction
               de l'appplication. 
         - 
         - ./locale/

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/core/src/lib/language/shared/language.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/core/src/lib/language/shared/language.interface.ts>`_
        - `locale démo https://infra-geo-ouverte.github.io/igo2/  <https://github.com/infra-geo-ouverte/igo2/tree/gh-pages/locale>`_


***************
Projection
***************

    .. line-block::
        Permet de définir une **liste** de projections non enregistrées par défault par IGO2 (Proj4). On parle ici de projection non mondiale ou à référence locale (ex: mtm, Lambert MTQ...)
        Référez vous à : `http://epsg.io/ <http://epsg.io/>`_. Ils y définissent l'entièreté des paramètres nécessaires.

Exemples

        .. code:: json

            projections: [
                {
                    code: 'EPSG:32198,
                    def: '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
                    extent: [-886251.0296, 180252.9126, 897177.3418, 2106143.8139]
                  }
            ]

Propriétés

    .. list-table::
       :widths: 10 10 30
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
       * - **code***
         - String
         - .. line-block::
               Code de la projection/
               système de coordonnées 
               à ajouter à l'application.
       * - **def***
         - String
         - .. line-block::
               Paramètres associés à la
               définition de votre 
               projection / système de 
               coordonnées. Référez vous
       * - **extent***
         - .. line-block::
               Liste de 
               nombre
         - .. line-block::
               Liste de nombre définissant
               les limites d'application
               de la projection. L'ordre à 
               respecter est:
               [Xmin,YMin,XMax,YMax].

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens
        - `http://epsg.io/ <http://epsg.io/>`_
        - `igo2-lib/packages/geo/src/lib/map/shared/projection.interfaces.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/map/shared/projection.interfaces.ts>`_
        - `igo2-lib/blob/master/demo/src/environments/environment.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/demo/src/environments/environment.ts>`_


***************
RoutingSource
***************

    .. line-block::
        Source serveur pour la création des itinéraires. Actuellement, le serveur utilisé est OSRM. 

Exemples

        .. code:: json

            "routingSources": {
                "osrm": {
                    "enabled": true
                    "url": "https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/";
                }

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - enabled
         - Boolean
         - .. line-block::
               Permet d'activer
               / désactiver
               la source.
         - true | false
         - true
       * - url
         - String
         - .. line-block::
               Url du serveur
               retournant 
               l'itinéraire.
         - 
         - `https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/ <https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/>`_

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2/blob/master/src/config/config.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/config/config.json>`_

***************
SearchSources
***************

    .. note::
       En cours de construction


***************
Theme
***************

    .. line-block::
        Permet de définir les thèmes (couleur, fonts) de l'application.
        Le répertoire où sont conservés les thèmes est le `igo2-lib/packages/core/src/style/themes <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/core/src/style/themes>`_
     
Exemples

        .. code:: json

            "theme": "blue-theme"

Propriétés

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1
    
       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **theme***
         - String
         - .. line-block::
               Thème à utiliser pour 
               la présente application
               configurée.
         - .. line-block::
               - blue-theme
               - bluegrey.theme
               - dark.theme
               - deeppurple.theme
               - indigo.theme
               - orange.theme
               - teal.theme
         - blue-theme

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/core/src/style/themes <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/core/src/style/themes>`_


***************
Exemple complet
***************

    .. note::
       En cours de construction



=======================================
Contenu cartographique
=======================================

La configuration du contenu cartographie est possible grâce aux fichiers:
    1. **base.json**
    2. **nom_du_contexte.json** 

Ces derniers sont situés dans le répertoire : 
    - `igo2/src/contexts <https://github.com/infra-geo-ouverte/igo2/tree/master/src/contexts>`_

Le fichier **nom_du_contexte.json** contient les 
spécifiques selon la thématiques à exploiter.
Exemple, dans une application cartographique vous pouvez avoir plusieurs contextes(thématiques):

      - hydrograhie.json
      - routes.json
      - risques.json
      - ...

On peut y définir:
    - l'étendue cartographique
    - les couches d'informations disponible
    - les outils accessible 
    - certaines configuration d'outils

Quant à lui, le fichier **base.json** contient les éléments 
partagés entre chancun des contexte l'héritant.
Selon l'exemple précédent, dans une application cartographique, vous avez 3 contextes (thématiques):

      - hydrograhie.json
      - routes.json
      - risques.json

Plutôt que de répéter 3 fois les mêmes éléments 
(fonds cartographique, outils, couches de base) dans chaque contexte, 
il est possibe de déclarer dans le **base.json** les éléments communs 
aux 3 thématiques. La maintenance de l'application
en sera facilitée.


Important : Notez que le fichier nom_du_contexte.json à préséance sur le fichier _base.json.


*********************
Résumé
*********************  

    .. list-table::
       :widths: 10 10 30 15
       :header-rows: 1
    
       * - Propriétés
         - Type
         - Description
         - Outil lié
       * - base
         - string
         - .. line-block::
               Identification du nom
               du ficher de base dont
               les thématiques peuvent
               hériter du contenu.
         - .. line-block::
               Map
               ContextManager
               Config d'outils
               ...
       * - **layers***
         - layer[]
         - .. line-block::
               Liste des couches
               d'informations
               disponible pour
               la thématique 
               sélectionnée. 
         - .. line-block::
               Map
               MapDetails
       * - **map***
         - map
         - .. line-block::
               Définition de la carte
               lors de l'ouverture 
               initial du contexte
         - 
       * - **uri***
         - String
         - .. line-block::
               Nom ou identifiant
               de la thématique.
               Doit être unique
               au sein de la 
               même application.
         - .. line-block::
               Map
               ShareMap
       * - toolbar
         - String[]
         - .. line-block::
               Liste des outils
               disponible dans 
               l'application.
               L'ordre dans la 
               liste correspond
               à l'ordre 
               d'apparition des 
               outils dans IGO2.
         - Tous 
       * - tools
         - Objet[]
         - .. line-block::
               Liste de configuration 
               des outils présent dans
               l'application.
         - Tous
    
    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.


***************
Base
***************

    .. line-block::
        Identification du nom du ficher de base dont les thématiques peuvent hériter du contenu. 

        À l'intérieur d'un fichier **base.json**, les propriétés tolérés sont:
            - layers
            - map
            - toolbar
            - tools

        Pour le détail de ces propriétés, référez-vous aux sections suivantes.
                
Exemples


        - Définition : `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_
        - Utilisation: `igo2/src/contexts/_default.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_default.json>`_
        

layers?: LayerOptions[];
map?: ContextMap;
uri?: string;
toolbar?: string[];
tools?: Tool[];


***************
Layers
***************

    .. line-block::
        Permet de définir une liste de couches d'informations disponible à l'usager lors de l'ouverture de l'application.
        L'ordre d'apparition des couches dans la table des matières peut être controlée de divers moyens:
            1- l'ordre d'apparition des couches dans le contexte. Plus la couche est au début de la liste, plus elle sera au bas de la table des matière.
            2- La propriété zIndex de chaque couche d'information. Plus le zIndex et élevé, plus la couche sera au haut de la table des matières.

Exemples

        .. code:: json

            "layers": [
                  {
                        "id": "fond_osm",
                        "title": "OSM",
                        "visible": false,
                        "baseLayer": true,
                        "sourceOptions": {
                        "type": "osm",
                        "attributions": "© les contributeurs <a href='https://www.openstreetmap.org/copyright' target='_blank'>d’OpenStreetMap</a> / <a href='http://www.igouverte.org/' target='_blank'>IGO2</a>"
                        }
                  },
                  {
                        "title": "Satellite",
                        "baseLayer": true,
                        "visible": false,
                        "sourceOptions": {
                        "url": "https://geoegl.msp.gouv.qc.ca/apis/carto/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg",
                        "attributions": "© <a href='http://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='http://www.igouverte.org/' target='_blank'>IGO2</a>",
                        "type": "xyz",
                        "crossOrigin": "anonymous"
                        }
                  },
                  {
                        "title": "Blanc",
                        "baseLayer": true,
                        "visible": false,
                        "sourceOptions": {
                        "attributions": "<a href='http://www.igouverte.org/' target='_blank'>IGO2</a>",
                        "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
                        "type": "xyz"
                        }
                  }
            ]

Propriétés
    .. line-block::
        Permet de définir une liste de couches. Référer-vous à la description de ce qu'est un `layer <https://igo2.readthedocs.io/fr/docdev/properties.html#couches-d-information-layer>`_ .


Liens

        - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`_
        - `Layer IGO2 <https://igo2.readthedocs.io/fr/docdev/properties.html#couches-d-information-layer>`_
