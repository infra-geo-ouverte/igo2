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
      - le contenu cartographique


==============================
Application
==============================

La configuration de l'application est possible grâce
au fichier **config.json**.
Ce dernier est situé dans le répertoire :

    - `src/config/config.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/config/config.json>`_


Il est également possible de configurer l'application grâce à un second
fichier selon l'environnement désiré (test ou production).

Pour modifier le comportement de l'application, vous pouvez modifier:

    - `igo2/src/environments/environment.prod.ts <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.prod.ts>`_
    - `igo2/src/environments/environment.ts <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


Si vous désirez changer le chemin d'accès de ce fichier ou bien d'environnement.*.ts , il est spécifié dans le code de l'application dans le fichier:

    - `/src/app/app.module.ts <https://github.com/infra-geo-ouverte/igo2/blob/54e74aa21ac66745f81dbbca77334c244e9f9b12/src/app/app.module.ts#L41>`_ ligne 41.

Important : Notez que le fichier config.json a préséance sur le fichier environment.*.ts


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
       * - analytic
         - `Analytics`_
         - Permet de définir un fournisseur de service d'analyse et de statistique.
         -
       * - auth
         - `Auth`_
         - .. line-block::
               Objet permettant d'activer le serveur d'authentification.
         -
       * - :ref:`catalog <igocatalogConfig>`
         - :ref:`Catalog <igocatalogObject>` []
         - .. line-block::
               Doit être présente si l'outil de catalogue. Permet de gérer les sources WMS et WMTS
         - .. line-block::
               Catalog
               CatalogBrowser
       * - context
         - `Context`_
         - .. line-block::
               Activation de l'API de context d'IGO2. Cette API sera documentée indépendamment
               de la présente documentation.
         - ContextManager
       * - `hasSearchPointerSummary`_
         - Boolean
         - .. line-block::
               Permet d'activé ou non la capacité d'afficher un résumé de la position du curseur.
               Le résumé est dépendant des sources de recherche utilisées.
               Désactivé par défaut.
         -
       * - `hasGeolocateButton`_
         - Boolean
         - .. line-block::
               Permet de définir s'il y aura un bouton de 
               géolocalisation par le fureteur dans l'application
         -
       * - `showRotationButtonIfNoRotation`_
         - Boolean
         - .. line-block::
               Permet de définir si le bouton de réinitialisation de la
               rotation est visible si aucune rotation n'est active.
         -
       * - `hasExpansionPanel`_
         - Boolean
         - .. line-block::
               Permet d'ouvrir un paneau d'expansion à partir d'un bouton situé dans le coin inférieur gauche
               de la carte. Ce dernier contient les données tabulaires pour les données WFS / Vectorielle / Cluster
         -
       * - `hasFeatureEmphasisOnSelection`
         - Boolean
         - .. line-block::
               Permet d'ajouter à la carte une géométrie ponctuelle pour les entités linéaire ou
               polygonale sélectionnées ou survolées lors d'une interrogation de la carte et qui
               sont de trop petite taille par rapport à l'étendue de la carte.
         -
       * - importExport
         - `ImportExport`_
         - .. line-block::
               Nécessaire si l'outil d'importation exportation pour gérer l'importation des Shapefiles.
         - .. line-block::
               Importation
               Exportation
       * - interactiveTour
         - `interactiveTour`_
         - Permet de configurer les tours interactifs de présentation de l'application.
         -
       * - **language***
         - `Language`_
         - .. line-block::
               Chemin d'accès des fichiers de traduction de l'application.
         - Tous
       * - mapOverlay
         - `MapOverlay`_ []
         - .. line-block::
              Éléments visuels à ajouter par dessus la carte de l'application.
         -
       * - menuButtonReverseColor
         - Boolean
         - .. line-block::
              Indique si les couleurs du bouton de menu seront inversés.
         -
       * - optionsApi
         - `optionsApi`_
         - .. line-block::
              Indique le chemin pour api fournissant certaine options de couches lors de l'ajout de celles-ci
              par la recherche.
         -
       * - projections
         - :ref:`Projection <igoprojections>` []
         - .. line-block::
               Liste de projections non enregistrées par défault par OpenLayers.
         -
       * - routingSources
         - `RoutingSource`_
         - .. line-block::
               Source serveur pour la création des itinéraires. Actuellement, le serveur utilisé est OSRM.
         - itinéraire
       * - **searchSources***
         - `SearchSources`_
         - .. line-block::
               Nécessaire afin de permettre la recherche par texte et/ou la recherche par coordonnées.
         - .. line-block::
               Recherche
               Carte
       * - .. line-block::
               **theme***
               Voir: `theme`_
         - String
         - .. line-block::
               Permet de définir les thèmes de l'application. Les choix sont:
                   - blue-theme
                   - bluegrey.theme
                   - dark.theme
                   - teal.theme
               Le répertoire où sont conservés les thèmes est
               le `igo2-lib/packages/core/src/style/themes <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/core/src/style/themes>`_
         -
       * - title
         - String
         - .. line-block::
               Permet de définir le titre de l'application qu'on retrouve dans le menu d'accueil.
               Constante pouvant être réutilisée dans le welcomeWindow.
         -
       * - version
         - .. line-block::
              app: String,
              releaseDateApp: String
         - .. line-block::
               Permet de définir une constante, pour la version du présent déploiement et de la
               date de déploiement de l'application. releaseDateApp, doit être un format reconnu et
               interprétable au format Date. Si le format n'est pas convertissable en date,
               la valeur fournie sera utilisée directement.
               Constante pouvant être réutilisée dans le welcomeWindow.
         -
       * - description
         - String
         - .. line-block::
               Permet de définir ce qui sera affiché lors de la recherche dans les moteurs de recherche,
               comme par exemple Google. Constante pouvant être réutilisée dans le welcomeWindow.
         -
       * - welcomeWindow
         - `WelcomeWindow`_
         - .. line-block::
               Permet d'ouvrir une fenêtre d'accueil à l'arrivé dans application. Le contenu doit
               être configurer à l'aide les fichiers de traduction en.json et fr.json.
                "welcomeWindow": {
                  "html": "<h1>Débutez en sélectionnant un contexte &#x2605;</h2>",
                  "title": "Fenêtre d'accueil",
                  "closeButton": "Fermer",
                  "notShowCheck": "  ne plus afficher"}
               Les propriétés title, description, version, releaseDate peuvent être utilisées dans le
               contenu html pour ajouter du contenu statique non traduit.
               ex: "html": "<h1>Débutez en sélectionnant un contexte &#x2605;</h2>Version {{version}}"
               - title provient de la propriété title ci haut.
               - description provient de la propriété description ci haut.
               - version provient de la propriété version.app ci haut OU de la version de la librairie associée (igo2-lib)
               - releaseDate provient de la propriété version.releaseDateApp ci haut OU de la releaseDate
                 de la librairie associée (igo2-lib)
         -


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


***************
Analytics
***************

    .. line-block::
	  Sert à configurer une application pour effectuer le monitoring du site web pour les statistiques.
	  NB. : Pour une application sans statistiques, simplement ne pas mettre ces configurations.

Exemples

	.. code:: json

		"analytics": {
			"provider": "matomo",
			"url": "https://geoegl.msp.gouv.qc.ca/matomo/",
			"id": "40"
		}


***************
Auth
***************

    .. note::
       En cours de construction

    .. line-block::
        Sert à effectuer l'authentification des usagers.
        NB. : Pour une application sans authentification, simplement ne pas mettre ces configurations.

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
               Définit l'url d'appel du service d'authentification
         -
         -
       * - **tokenKey***
         - String
         - .. line-block::
               Définit la clef de l'api d'authentification utilisée
         -
         -
       * - allowAnonymous
         - Boolean
         - .. line-block::
               Permet/Bloque l'accès aux usagers non authentifiés
               d'accéder aux contextes publics
         - true | false
         - true
       * - ...
         - ...
         - .. line-block::
               ...
         - ...
         - ...

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/auth/src/lib/shared/auth.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/2f8f274146b0fff4cc82d09f598bff838c6caaab/packages/auth/src/lib/shared/auth.interface.ts>`_


.. _igocatalogConfig:

***************
Catalog
***************

    .. line-block::
        Cette section de la configuration permet de charger une liste de sources de cataloguage. Une fois les sources chargées, il est possible d'ajouter ces couches d'informations à la carte.

        Les sources de cataloguage permises:
            - Service WMS
            - Service WMTS
            - Service ArcGIS REST
            - Sercice Tile ArcGIS Rest

        Les couches d'informations contenues dans ces services sont récupérées grâce aux couches publiées dans le GetCapabilities du service.

        NB: Il est possible de configurer certaines options dans les catalogues comme le format de présentation des informations(queryFormat) ou la configuration des
        filtres temporels souhaités (Voir exemples)

        Partage de carte:
            1- Les couches ajoutées (WMS-WMTS) par le catalogue sont partagées lors du partage de carte.
            2- La structure de l'url pour les couches partagées est la suivante:
                - wmsUrl =­­> une liste, séparée par une ',' (virgule) listant les url de service ajoutées.
                      - Exemple : wmsUrl=urlDuService1,urlDuService2
                - layers => une liste, séparée par une ',' (virgule) groupée par un bloc de parenthèses, respectant l'ordre des services déclarés dans wmsUrl
                      - Exemple : layers=(layer1,layer2),(layer3,layer4)
                            - layer1 et layer2 proviennent de l'url "urlDuService1"
                            - layer3 et layer4 proviennent de l'url "urlDuService2"
                            - si un "layer" possède le suffix :igoz13
                            - Il s'agit de la position du "layer" dans la table des matières. Ici la position 13.

        Chaque couche ajoutée possède un identifiant unique généré à partir du "layer name" et de l'url du service source. Se référer à :`igo2-lib/packages/geo/src/lib/datasource/utils/id-generator.ts#L15 <https://github.com/infra-geo-ouverte/igo2-lib/blob/6f37684adc809c82b185556719daac4bace0eea1/packages/geo/src/lib/datasource/utils/id-generator.ts#L15>`_

        Note sur le comportement de l'objet :ref:`Composite Catalog <igocompositecatalogObject>`:
            - la propriété groupImpose met toutes les couches des sous-groupes enfants sur le même niveau.
            - le titre des couches de même niveau (racine ou groupe) est unique pour une même source.
            - un tag est ajouté sur les titres identique de couches de même niveau et de source différente.

Exemples

        .. code:: json

            "catalog": {
                  "sources": [
                  {
                      "id": "Arcgis Rest",
                      "title": "Arcgis Rest",
                      "url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
                      "type": "arcgisrest",
                      "sourceOptions": {
                          "queryable": true,
                          "idColumn": "OBJECTID"
                      }
                  },
                  {
                      "id": "opendataqc",
                      "title": "Données Ouvertes Québec",
                      "url": "/ws/igo_gouvouvert.fcgi"
                  },
                  {
                      "id": "mffp",
                      "title": "MFFP",
                      "url": "/ws/mffpecofor.fcgi",
                      "sourceOptions": {
                        "timeFilter": {
                          "style": "calendar",
                          "range": true,
                          "step": 63072000000,
                          "type": "year"
                        }
                      }
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
                      "count": 365,
                      "tooltipType": "abstract"
                  },
                  {
                      "id": "regexmtq",
                      "title": "MTQ (filtered by regex)",
                      "url": "/swtq",
                      "regFilters": ["zpegt"]
                  },
                  {
                      "id": "group_impose",
                      "title": "(composite catalog) with group imposed",
                      "composite": [
                            {
                              "id": "tq_swtq",
                              "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/swtq",
                              "regFilters": ["zpegt"],
                              "groupImpose": {"id": "zpegt", "title": "zpegt"}
                            },
                            {
                              "id": "Gououvert",
                              "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                              "regFilters": ["zpegt"],
                              "groupImpose": {"id": "zpegt", "title": "zpegt"}
                            },
                            {
                              "id": "rn_wmts",
                              "url": "https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Cartes_Images",
                              "type": "wmts",
                              "crossOrigin": true,
                              "matrixSet": "EPSG_3857",
                              "version": "1.0.0",
                              "groupImpose": {"id": "cartetopo", "title": "Carte topo échelle 1/20 000"}
                            }
                      ]
                  },
                  {
                      "id": "forced_properties",
                      "title": "Forced properties catalog (layer name and abstract)",
                      "composite": [
                              {
                                "id": "forcedProperties_wmts",
                                "url": "https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Cartes_Images",
                                "type": "wmts",
                                "setCrossOriginAnonymous": true,
                                "matrixSet": "EPSG_3857",
                                "version": "1.0.0",
                                "forcedProperties": [{
                                  "layerName": "BDTQ-20K_Allegee",
                                  "title": "Nouveau nom pour cette couche WMTS"
                                }]
                              },
                              {
                                "id": "forcedProperties_wms",
                                "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/swt",
                                "type": "wms",
                                "forcedProperties": [{
                                  "layerName": "lieuhabite",
                                  "title": "Nouveau nom pour cette couche WMS"
                                }]
                              },
                              {
                                "id": "forcedProperties_arcgisrest",
                                "url": "https://gisp.dfo-mpo.gc.ca/arcgis/rest/services/FGP/Seafloor_SubstratBenthique/MapServer",
                                "type": "arcgisrest",
                                "forcedProperties": [{
                                  "layerName": "Sediment substrate / Substrat sédimentaire",
                                  "title": "Nouveau nom pour cette couche ArcGIS REST"
                                }]
                              },
                       ]
                  },
                 ]
            }

Propriétés
===============

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
       * - sources
         - :ref:`Catalog <igocatalogObject>` []
         - .. line-block::
               Liste des catalogues qui sera présenté à l'usager.
         -
         - []

.. _igocatalogObject:

Propriétés - Objet Catalog
=============================

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
               Nombre de résultats retournés par le serveur lors de requêtes **WMS** de GetFeatureInfo
         -
         -
       * - abstract
         - String
         - .. line-block::
               Résumé des données contenues dans le catalogue
         -
         - 5
       * - **id***
         - String
         - .. line-block::
               Identifiant unique permettant de différencier les catalogues entre eux.
         -
         - uuid()
       * - groupImpose
         - .. line-block::
            id*: String,
            title*: String
         - .. line-block::
               N.B: Propriété disponible sur un objet de type CompositeCatalog
               Permet d'imposer l'utilisation d'un groupe à l'ensemble des couches appellées du catalogue.
               - id: Identifiant unique permettant de différencier les groupes entre eux.
               - title: Titre pour le groupe qui sera utilisé dans l'outil Catalog.
         -
         -
       * - forcedProperties
         - .. line-block::
            layerName*: String,
            title*: String
         - .. line-block::
               Permet d'imposer un nom à une couche spécifique.
               - layerName: Nom de la couche dans le catalogue d'origine (propriété layer name). Permet d'aller chercher la couche en question dans le service.
               - title: Nouveau titre pour la couche.
         -
         -
       * - matrixSet
         - String
         - .. line-block::
               Nom du matrixSet définit pour le service WMTS seulement
               **Obligatoire pour les services WMTS**
         -
         -
       * - queryFormat
         - QueryFormat
         - .. line-block::
               Pour les services **WMS**, le format d'interrogation de la donnée.
         - Voir **QueryFormat**
         -
       * - queryHtmlTarget
         - String
         - .. line-block::
               Pour les services **WMS**, definit la destination des résultats d'interrogation
               pour les formats HTML.
         - .. line-block::
              iframe (intégré à la plage)
              _blank (ouverture page externe)
         - iframe
       * - queryParams
         - objet {}
         - .. line-block::
               Paramètres supplémentaires à ajouter à l'appel des couches ajoutées à partir du service.
               Que ce soit des paramètres normés (WMS|WMTS) ou liés à votre service.
         -
         -
       * - regFilters
         - String[]
         - .. line-block::
               Une liste d'expressions régulières (regex) permettant de limiter les couches
               d'information présentées dans l'outil CatalogBrowser
         -
         -
       * - requestEncoding
         - String
         - .. line-block::
               Type d'encodage des paramètres demandés au serveur
         - KVP REST
         - KVP
       * - setCrossOriginAnonymous
         - Boolean
         - .. line-block::
               Afin de définir si l'entête de l'appel faite au serveur sera anonyme. Permet entre autres,
               d'éviter les problématiques de CORS.
         - true | false
         - false
       * - showLegend
         - Boolean
         - .. line-block::
               Permet d'affiché la légende sur le click du titre des couches.
         - true | false
         - false
       * - sortDirection
         - String
         - .. line-block::
               Permet de trier l'ordre d'apparition des couches du catalogue dans l'outil CatalogBrowser
               Influence l'ordre d'ajout des couches d'informations à la carte.
         - asc | desc
         - .. line-block::
               Aucun, l'ordre
               présenté par service
       * - timeFilter
         - TimeFilterOptions
         - .. line-block::
               Options temporelles liées à l'entièreté des couches du service web.
         - .. line-block::
               Voir **TimeFilter**
         - 1.0.0 (WMTS)
       * - **title***
         - String
         - .. line-block::
              Titre pour la source du catalogue qui sera utilisédans l'outil Catalog.
         -
         -
       * - tooltipType
         - String
         - .. line-block::
              Pour les couches ajoutées, définit si le tooltip (sulvol du titre) sera le
              résumé du "layer" (**wms/wmts**) ou son titre
         - abstract | title
         - title
       * - type
         - String
         - .. line-block::
               Type de service à appeler
         - composite wmts wms
         - wms
       * - **url***
         - String
         - .. line-block::
               Url du service WMS ou WMTS sans les paramètre d'url normé OGC
               (i.e. service=wms&request=GetCapabilities)
               OU url du service de baselayers
         -
         -
       * - version
         - String
         - .. line-block::
               Version du service
               WMS ou WMTS
         - .. line-block::
               Référer au
               GetCapabilities
               du service
               (WMS|WMTS)
         - 1.0.0 (WMTS)

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igocompositecatalogObject:

Propriétés - Objet CompositeCatalog (spécialisation de l'objet Catalog)
==========================================================================

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
       * - **id***
         - String
         - .. line-block::
               Identifiant unique permettant de différencier les catalogues entre eux.
         -
         -
       * - **title***
         - String
         - .. line-block::
              Titre pour la source du catalogue qui sera utilisé dans l'outil Catalog.
         -
         -
       * - composite
         - :ref:`Catalog <igocatalogObject>` []
         - .. line-block::
              Liste des catalogues utilisés dans un catalogue composé.
         -
         -

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
        Cette API sera documentée indépendamment de la présente documentation.

Exemples

        .. code:: json

            context: {
                "url" : "https://geoegl.msp.gouv.qc.ca/apis/igo2/...",
                "defaultContextUri" : "5"
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/context/src/lib/context-manager/shared/context.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/context/src/lib/context-manager/shared/context.interface.ts>`_


***********************
hasSearchPointerSummary
***********************

    .. line-block::
        Permet d'activé ou non la capacité d'afficher un résumé de la position du curseur.
        Le résumé est dépendant des sources de recherche utilisées.


*****************
hasExpansionPanel
*****************

    .. line-block::
        Permet d'ouvrir un paneau d'expansion à partir
        d'un bouton situé dans le coin inférieur gauche de la carte.
        Ce dernier contient les données tabulaires pour
        les données WFS / Vectorielle / Cluster.


*****************
hasGeolocateButton
*****************

    .. line-block::
        Permet de définir s'il y aura un bouton de 
        géolocalisation par le fureteur dans l'application


********************************
showRotationButtonIfNoRotation
********************************

    .. line-block::
        Permet de définir si le bouton de réinitialisation de la
        rotation est visible si aucune rotation n'est active. False par défaut.


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
                url: 'https://geoegl.msp.gouv.qc.ca/apis/ogre',
                clientSideFileSizeMaxMb: 30,
                gpxAggregateInComment: false,
                forceNaming: false,
                formats: ['GeoJSON', 'GML', 'GPX', 'KML', 'Shapefile', 'CSV']
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
       * - clientSideFileSizeMaxMb
         - Number
         - .. line-block::
               Taille maximum du fichiers pouvant être lu par le fureteur.
         - .. line-block::

         - 30
       * - gpxAggregateInComment
         - Boolean
         - .. line-block::
               Lorsque l'option est activée l'exportation du fichier vers le format GPX va rassembler
               les informations de l'enregistrement dans le champ «cmt» du gpx et assigner la valeur
               de l'ID au champ «name».
         - .. line-block::

         - false
       * - forceNaming
         - Boolean
         - .. line-block::
               Ajoute une boite texte au formulaire d'exportation qui permet de nommer le fichier exporter.
         - .. line-block::

         - false
       * - formats
         - String[]
         - .. line-block::
               La liste des formats qu'il est possible d'exporter.
         - .. line-block::
               'GeoJSON', 'GML', 'GPX', 'KML', 'Shapefile', 'CSV'
         - ['GeoJSON', 'GML', 'GPX', 'KML', 'Shapefile', 'CSV']
    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/geo/src/lib/import-export/shared/import.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/a841bced1ccc305b001d6db84f913c4c2ba27bf7/packages/geo/src/lib/import-export/shared/import.interface.ts>`_


.. _igolanguage:



***************
interactiveTour
***************

    .. line-block::
        Tours intéractifs de présentation de l'application


Exemples

        .. code:: json

                "interactiveTour": {
                  "activateInteractiveTour": true
                  "tourInMobile": true,
                  "pathToConfigFile": "./config/interactiveTour.json"
                },

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
       * - activateInteractiveTour
         - Boolean
         - .. line-block::
               Indique si le tour interactif de présentation de l'application est activé.
         - true | false
         - true
       * - pathToConfigFile
         - String
         - .. line-block::
               Indique ou ce retrouve le fichier de configuration des tours dans l'application.
               Voir la documentation plus loin sur les détails de la configurations des tours.
               Référez vous à :ref:`Tour interactif configuration <igoInteractiveTourConfig>`.
         -
         - "./config/interactiveTour.json"
       * - tourInMobile
         - Boolean
         - .. line-block::
                Indique si les tours interactifs sont aussi disponible en mode mobile.
         - true/false
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


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
                "prefix": "./locale/"
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/core/src/lib/language/shared/language.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/core/src/lib/language/shared/language.interface.ts>`_
        - `locale démo https://infra-geo-ouverte.github.io/igo2/  <https://github.com/infra-geo-ouverte/igo2/tree/gh-pages/locale>`_



***************
MapOverlay
***************

    .. line-block::
        Permet de définir des éléments à ajouter par dessus le visuel de la carte.

Exemples

        .. code:: json

            "mapOverlay": [{
                        "media": ["desktop"],
                        "cssClass": "top-center",
                        "imgSrc": " ./particular/images/FO_logo_2c.png",
                        "imgSize": "280px",
                        "alt": "Foret ouverte",
                        "fixed": true,
                        "marginTop": "10px"
                  },
                  {
                        "media": ["desktop"],
                        "cssClass": "bottom-left",
                        "link": "http://igouverte.org/",
                        "imgSrc": "./particular/images/2a-logo_bleu_sans_icone.png",
                        "imgSize": "30px",
                        "fontSize": "6pt",
                        "marginLeft": "38px",
                        "marginBottom": "10px",
                        "alt": "IGO",
                        "fixed": false
                  }
            ]

Liens
        - `Exemple de mapOverlay <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/mapOverlay.json>`_


.. _igoprojections:


.. _optionsApi:

************
optionsApi
************

  Permet de définir le chemin vers API pour les options supplémentaires sur les couches ajoutées par la recherche.
  Par exemple, les configurations de filtre. Retourne un objet JSON venant se fusionner avec les propriété de la couche.
  La configuration faite au pilotage a priorité à celles fournies par l'API d'options.

Exemple

        .. code:: json

              "optionsApi": {
                  "url": "/apis/igo2/layers/options"
              }


***************
Projections
***************

    .. line-block::
        Permet de définir une **liste** de projections non enregistrées par défault par IGO2 (Proj4). On parle ici de projection non mondiale ou à référence locale (ex: mtm, Lambert MTQ...)
        Référez vous à : `http://epsg.io/ <http://epsg.io/>`_. Ils y définissent l'entièreté des paramètres nécessaires.

Exemple

        .. code:: json

            projections: [
                {
                    "alias": "Québec Lambert",
                    "code": "EPSG:32198",
                    "def": "+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs",
                    "extent": [-886251.0296, 180252.9126, 897177.3418, 2106143.8139]
                  }
            ]

Propriétés - Objet Projection
===============

    .. list-table::
       :widths: 10 10 30
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
       * - alias
         - String
         - .. line-block::
               Nom d'affichage que vous
               voulez donner \à la
               projection ajoutée.
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
               coordonnées.
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens
        - `http://epsg.io/ <http://epsg.io/>`_
        - `igo2-lib/packages/geo/src/lib/map/shared/projection.interfaces.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/map/shared/projection.interfaces.ts>`_
        - `igo2-lib/blob/master/demo/src/environments/environment.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/demo/src/environments/environment.ts>`_


.. _igoroutingsource:

***************
RoutingSource
***************

    .. line-block::
        Source serveur pour la création des itinéraires. Actuellement, le serveur utilisé est OSRM.

Exemples

        .. code:: json

            "routingSources": {
                "osrm": {
                    "enabled": true,
                    "url": "https://geoegl.msp.gouv.qc.ca/services/itineraire/route/v1/driving/"
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

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
        Permet de définir les thèmes (couleurs, fonts) de l'application.
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/core/src/style/themes <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/core/src/style/themes>`_




***************
WelcomeWindow
***************

    .. line-block::
        Affiche une fenêtre accueil à l'entrée dans l'application.
        NB. : Pour une application sans fenêtre accueil, simplement ne pas mettre ces configurations.

Exemples

        .. code:: json

              "welcomeWindow": {
                "showAgainOnNewIGOVersion": true,
                "nbVisitToShowAgain": 30,
                "nbVisitToShow":3
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
       * - nbVisitToShow
         - Number
         - .. line-block::
               Nombre de fois que sera présenté la fenêtre d'accueil. S'appliquera aussi après
               être revenu par exemple lors d'une nouvelle
               version IGO.
         -
         -
       * - nbVisitToShowAgain
         - Number
         - .. line-block::
               La fenêtre d'accueil reviendra après le nombre de visite indiqué par ce paramètre.
         -
         -
       * - showAgainOnNewIGOVersion
         - Boolean
         - .. line-block::
               Lorsque l'utilisateur coche la case ne plus afficher, la fenêtre d'accueil reviendra
               si la version IGO est différente de la version lors de sa visite précédente.
         -
         - true

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


La configuration du titre et du message présentés se fait dans les fichiers locaux de traduction en.json et fr.json.
Les variables de nb. visite et de présentation ou non sont conservés dans le 'local storage' du navigateur internet.

***************************
Exemple complet config.json
****************************

        .. code:: json

            {

                  "title": "Forêt ouverte",
                  "theme": "teal-theme",
                  "description": "Forêt ouverte est un portail de diffusion des données écoforestières du Gouvernement du Québec.",
                  "analytics": {
                    "provider": "matomo",
                    "url": "https://geoegl.msp.gouv.qc.ca/Visiteur",
                    "id": "40"
                  },
                  "hasSearchPointerSummary": true,

                  "mapOverlay": [
                    {
                      "media": ["desktop"],
                      "cssClass": "top-center",
                      "imgSrc": " ./particular/images/FO_logo_2c.png",
                      "imgSize": "280px",
                      "alt": "Foret ouverte",
                      "fixed": true,
                      "marginTop": "10px"
                    },
                    {
                      "media": ["desktop"],
                      "cssClass": "bottom-left",
                      "link": "http://igouverte.org/",
                      "imgSrc": "./particular/images/2a-logo_bleu_sans_icone.png",
                      "imgSize": "30px",
                      "fontSize": "6pt",
                      "marginLeft": "38px",
                      "marginBottom": "10px",
                      "alt": "IGO",
                      "fixed": false
                    },

                    {
                      "media": ["desktop"],
                      "cssClass": "bottom-right",
                      "imgSrc": "./particular/images/QUEB.png",
                      "imgSize": "150px",
                      "link": "https://www.quebec.ca",
                      "marginRight": "60px",
                      "marginBottom": "20px"
                    },
                    {
                      "media": ["desktop"],
                      "cssClass": "bottom-right",
                      "text": "© Gouvernement du Québec 2019",
                      "fontSize": "10pt",
                      "link": "http://www.droitauteur.gouv.qc.ca/copyright.php",
                      "marginRight": "70px",
                      "marginBottom": "10px"
                    },
                    {
                      "media": ["mobile"],
                      "cssClass": "top-center",
                      "imgSrc": " ./particular/images/FO_logo_2c.png",
                      "imgSize": "200px",
                      "alt": "Foret ouverte",
                      "marginTop": "60px",
                      "fixed": true
                    },

                    {
                      "media": ["mobile"],
                      "cssClass": "bottom-left",
                      "link": "http://igouverte.org/",
                      "imgSrc": "./particular/images/2a-logo_bleu_sans_icone.png",
                      "imgSize": "33px",
                      "alt": "IGO",
                      "fixed": true,
                      "marginLeft": "50px",
                      "marginBottom": "5px"
                    },

                    {
                      "media": ["mobile"],
                      "cssClass": "bottom-right",
                      "imgSrc": "./particular/images/QUEB.png",
                      "imgSize": "100px",
                      "link": "https://www.quebec.ca",
                      "marginRight": "37px",
                      "marginBottom": "3px"
                    },
                  ],
                  "searchSources": {
                        "cadastre": {
                          "title": "Cadastre",
                          "enabled": true
                        },
                        "nominatim": {
                            "enabled": false
                        },
                        "ilayer": {
                            "searchUrl": "/apis/icherche/layers",
                            "order": 4,
                            "params": {
                                "limit": 10
                            },
                            "queryFormat": {
                                "html": {
                                    "urls": ["/apis/ws/mffpecofor.fcgi"]
                                }
                            }
                        },
                        "icherche": {
                            "title": "ICherche",
                            "searchUrl": "/apis/icherche",
                            "showInPointerSummary": true,
                            "order": 2,
                            "params": {
                                "limit": "5"
                            }
                        },
                        "icherchereverse": {
                            "searchUrl": "/apis/terrapi",
                            "order": 3,
                            "params": {
                                "limit": 5,
                                "buffer":10
                            }
                        }
                    },
                    "optionsApi": {
                      "url": "/apis/igo2/layers/options"
                      },
                    "importExport": {
                        "url": "/apis/ogre"
                    },
                    "routingSources": {
                        "osrm": {
                        "url": "/services/itineraire/route/v1/driving/",
                        "enabled": true
                        }
                    },
                    "language": {
                        "prefix": "./particular/locale/"
                    },
                    "forceCoordsNA": true,
                    "catalog": {
                      "sources": [
                        {
                          "id":1,
                          "title": "Découpages territoriaux",
                          "composite": [
                            {
                              "id": "admin_mern",
                              "url": "https://serviceswebcarto.mern.gouv.qc.ca/pes/services/Territoire/SDA_WMS/MapServer/WmsServer?",
                              "crossOrigin": true,
                              "showLegend":false,
                              "queryFormat": {
                                  "geojson": "*"
                              },
                              "groupImpose": {"id": "decoup_admin", "title": "Découpages administratifs"}
                            },
                            {
                                "id": "2",
                                "url": "/ws/mffpecofor.fcgi",
                                "sourceOptions": {
                                    "crossOrigin": "anonymous",
                                    "queryFormat": "htmlgml2",
                                    "queryHtmlTarget": "iframe",
                                    "type": "wms",
                                    "optionsFromCapabilities": true
                                },
                                "regFilters": ["^feuillets_20k$","^fuseaux_mtm$","^fuseaux_utm$"],
                                "groupImpose": {
                                    "id": "decoup_carto", "title": "Découpages cartographiques"}
                              }
                          ]
                        },
                        {
                            "id":3,
                            "title": "Données Québec",
                            "url": "/ws/igo_gouvouvert.fcgi",
                            "crossOrigin": true,
                            "showLegend":false,
                            "queryFormat": {
                                "gml": "*"
                            }
                        },
                        {
                            "id": 5,
                            "title": "Imagerie aérienne et satellitaire",
                            "composite": [
                              {
                                "id": "5",
                                "url": "/ws/mffpecofor.fcgi",
                                "sourceOptions": {
                                    "crossOrigin": "anonymous",
                                    "queryFormat": "htmlgml2",
                                    "queryHtmlTarget": "iframe",
                                    "type": "wms",
                                    "optionsFromCapabilities": true
                                },
                                "regFilters": ["telecharge_index_250k"],
                                "groupImpose": {
                                  "id": "telechargement", "title": "Téléchargement - mosaïques d'images satellites"}
                              },
                              {
                                "id": "5",
                                "url": "/ws/mffpecofor.fcgi",
                                "regFilters": ["^sentinel","^lsat"],
                                "groupImpose": {
                                  "id": "mosaiques", "title": "Mosaïques d'images satellites"}
                              },
                              {
                                "id": "5",
                                "url": "https://servicesvectoriels.atlas.gouv.qc.ca/IDS_INVENTAIRE_ECOFORESTIER_WMS/service.svc/get?",
                                "queryFormat": "htmlgml2",
                                "queryHtmlTarget": "iframe",
                                "groupImpose": {
                                  "id": "giin", "title": "Photos aériennes de l'inventaire écoforestier"}
                              },
                              {
                                "id": "5",
                                "title": "test wmts-GIIN",
                                "url": "https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Inventaire_Ecoforestier?",
                                "crossOrigin": true,
                                "matrixSet": "GoogleMapsCompatibleExt2:epsg:3857",
                                "type": "wmts",
                                "groupImpose": {
                                  "id": "giin", "title": "Photos aériennes de l'inventaire écoforestier"}
                              }

                            ]
                        }
                      ]
                    }
                }




=======================================
Contenu cartographique
=======================================

La configuration du contenu cartographique est possible grâce aux fichiers de contextes:
    1. **base.json**
    2. **nom_du_contexte.json**

Ces derniers sont situés dans le répertoire :
    - `igo2/src/contexts <https://github.com/infra-geo-ouverte/igo2/tree/master/src/contexts>`_

Le fichier **nom_du_contexte.json** contient les éléments
spécifiques selon le contexte à exploiter.
Exemple, dans une application cartographique vous pouvez avoir plusieurs contextes(thématiques):

      - hydrograhie.json
      - routes.json
      - risques.json
      - ...

On peut y définir:
    - l'étendue cartographique
    - les couches d'informations disponibles
    - les outils accessibles
    - certaines configurations d'outils

Quant à lui, le fichier **base.json** contient les éléments
partagés entre chancun des contextes l'héritant.

Selon l'exemple précédent, dans une application cartographique, vous avez 3 contextes (thématiques):

      - hydrograhie.json
      - routes.json
      - risques.json

Plutôt que de répéter 3 fois les mêmes éléments
(fonds cartographiques, outils, couches de base) dans chaque contexte,
il est possibe de déclarer dans le **base.json** les éléments communs
aux 3 contextes. La maintenance de l'application
en sera facilitée.

Le contexte _default, sera le contexte affiché à l'arrivée dans l'application.

Important : Notez que le fichier nom_du_contexte.json a préséance sur le fichier _base.json.



***************************
Résumé fichier de contexte
***************************

    .. list-table::
       :widths: 10 10 30 15
       :header-rows: 1

       * - Propriétés
         - Type
         - Description
         - Outil lié
       * - `base`_
         - string
         - .. line-block::
               Identification du nom
               du ficher de base dont
               les contextes peuvent
               hériter du contenu.
         - .. line-block::
               Map
               ContextManager
               Config d'outils
               ...
       * - .. line-block::
               **layers***
         -  :ref:`layer[] <igolayer>`
         - .. line-block::
               Liste des couches
               d'informations
               disponibles pour
               le contexte
               sélectionné.
         - .. line-block::
               Map
               MapDetails
       * - **map***
         - `map`_
         - .. line-block::
               Définition de la carte
               lors de l'ouverture
               initial du contexte
         -
       * - message
         - `Message`_
         - .. line-block::
               Présentation d'un message à l'ouverture du contexte.
         -
       * - `toolbar`_
         - String[]
         - .. line-block::
               Liste des outils
               disponibles dans
               l'application.
               L'ordre dans la
               liste correspond
               à l'ordre
               d'apparition des
               outils dans IGO2.
         - Tous
       * - `tools`_
         - Objet[]
         - .. line-block::
               Liste des configurations
               des outils présentes dans
               l'application.
         - Tous
       * - .. line-block::
               **uri***
               Voir `uri`_
         - String
         - .. line-block::
               Nom ou identifiant
               du contexte.
               Doit être unique
               au sein de la
               même application.
         - .. line-block::
               Map
               ShareMap

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


***************
Base
***************

    .. line-block::
        Identification du nom du ficher de base dont les contextes peuvent hériter du contenu.

        À l'intérieur d'un fichier **base.json**, les propriétés tolérées sont:
            - `layers`_
            - `map`_
            - `toolbar`_
            - `tools`_

        Pour le détail de ces propriétés, référez-vous aux sections suivantes.

Exemples

        - Définition : `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_
        - Utilisation: `igo2/src/contexts/_default.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_default.json>`_


***************
Layers
***************

    .. line-block::
        Permet de définir une liste de couches d'informations disponibles à l'usager lors de l'ouverture dans l'application.
        L'ordre d'apparition des couches dans la liste présentée à l'utilisateur peut être contrôlée de divers moyens:
            1- L'ordre d'apparition des couches dans le contexte. Plus la couche est au début de la liste, plus elle sera au bas de la la liste présentée dans l'application.
            2- La propriété zIndex de chaque couche d'information. Plus le zIndex et élevé, plus la couche sera au haut de la liste présentée.

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
        Permet de définir une liste de couches. Référez-vous à la description de ce qu'est un :ref:`layer <igolayer>`.


Liens

        - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`_
        - :ref:`Layer IGO2 <igolayer>`.



***************
Map
***************

    .. line-block::
        Permet de définir les propriétés de la carte à l'ouverture du contexte.

Exemples

        .. code:: json

            "map": {
                  "view": {
                        "projection": "EPSG:3857",
                        "center": [-71.938087, 48.446975],
                        "geolocate": true,
                        "zoom": 6,
                        "maxZoom": 17,
                        "rotation": 15,
                        "enableRotation": true
                  }
            }

Propriétés
    .. line-block::
        Référez vous à :ref:`map <igomap>`.


Liens

        - `igo2-lib/packages/geo/src/lib/map/shared/map.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/map/shared/map.interface.ts>`_
        - :ref:`Map IGO2 <igomap>`.


***************
Message
***************

    .. line-block::
        Message affiché à l'ouverture du contexte

Exemples

        .. code:: json

            "message": {
                  "format": "html",
                  "html": " "<head><meta charset='utf-8'><style> .page{padding-left: 0px;margin-right:-45px;} </style> </head>  <body> <div class='page' style='color: white;'> Bienvenue sur <b>IGO</b></div> </body>",
                  "type": "info",
                  "options": {
                        "timeOut": 30000
                  }
            },

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
               Valeur par défaut
       * - format
         - String
         - .. line-block::
              Le format du message html ou text. Selon le choix, une deuxième configuration devra
              être définie soit html ou text.
         - 'text', 'html'
         -
       * - html
         - String
         - Le html du message sur une seule ligne. Cette configuration est obligatoire si le format = 'html.
         -
         -
       * - icon
         - String
         - Icone à ajouter au message.
         -
         -
       * - options.template
         - String
         - En construction
         -
         -
       * - options.timeOut
         - Number
         - Temps avant la disparition du message, en miliseconde.
         -
         -
       * - text
         - String
         - .. line-block::
              Le text du message à afficher. Cette configuration remplace la configuration html.
              NB.: pour un message qui sera traduction en fonction du navigateur simplement ce
              créer une clef de traduction indiquer ici et de mettre sont équivalent dans les
              fichiers de traduction local en.json, fr.json. Exemple:
              "text": "messageContextXyz",
              fr.json = "messageContextXyz": <h3>mon super message</h3>
              en.json = "messageContextXyz": <h3>message in english</h3>
         -
         -
       * - title
         - String
         - .. line-block::
              Le titre du message à afficher. Cette configuration s'active seulement avec la
              configuration text et ne sera pas pris en compte avec la configuration html.
         -
         -
       * - type
         - String
         - .. line-block::
              Le type du message à afficher. Avertissement, erreur ou information.
              Selon le type choisi une couleur spécifiée sera appliquée selon la
              thématique de couleur de l'application.
         - .. line-block::
              'alert', 'error',
              'info', 'success'
         -


    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.



***************
Title
***************

    .. line-block::
        Nom du contexte qui sera affiché dans l'application.

Exemples

        .. code:: json

            "title": "Nom de votre contexte",


***************
Toolbar
***************

    .. line-block::
        Définit la liste des outils permis dans le contexte.
        L'ordre d'apparition des outils dans cette liste est importante puisqu'elle
        représente l'ordre des outils dans l'application.
        Les outils existant:
            - :ref:`about <igoabout>`
            - :ref:`catalog <igocatalogtool>`
            - :ref:`catalogBrowser <igocatalogBrowser>`
            - :ref:`contextManager <igocontextManager>`
            - :ref:`directions <igodirections>`
            - :ref:`ogcFilter <igoogcFilter>`
            - :ref:`timeFilter <igotimeFilter>`
            - :ref:`spatialFilter <igospatialFilter>`
            - :ref:`importExport <igoimportExport>`
            - :ref:`mapDetails <igomapDetails>`
            - :ref:`map <igomaptool>`
            - :ref:`print <igoprint>`
            - :ref:`searchResults <igosearchResults>`
        Chacun de ces outils fait référence à un nom d'outil tel que définit dans
        le package "integration" d'IGO2. Pour en modifier les propriétés
        référez-vous à `tools`_ .

Exemples

        .. code:: json

            "toolbar": [
                  "searchResults",
                  "contextManager",
                  "mapDetails",
                  "catalog",
                  "ogcFilter",
                  "timeFilter",
                  "spatialFilter"
                  "print",
                  "measurer",
                  "shareMap",
                  "about"
                  ]

Liens

        - `igo2-lib/tree/master/packages/integration/src/lib/... <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib>`_

***************
Tools
***************

    .. line-block::
        Définit la liste des configurations permises pour chaque outil.

        Pour les options spécifiques à chaque outil, veuillez vous référer aux descriptif de l'outil. Cette section détaille seulement les propriétés communes.


Exemples

        .. code:: json

            {
                "icon" : "iconName",
                "name" : "catalogBrowser",
                "title": "TitreOutilQuiDoitEtreTraduit",
                "options" : {
                    ...
                }
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
               Valeur par défaut
       * - **name***
         - String
         - .. line-block::
               Le nom de l'outil
         - .. line-block::
               - :ref:`about <igoabout>`
               - :ref:`catalog <igocatalogtool>`
               - :ref:`catalogBrowser <igocatalogBrowser>`
               - :ref:`contextManager <igocontextManager>`
               - :ref:`directions <igodirections>`
               - :ref:`activeOgcFilter <igoactiveogcFilter>`
               - :ref:`ogcFilter <igoogcFilter>`
               - :ref:`activeTimeFilter <igoactivetimeFilter>`
               - :ref:`timeFilter <igotimeFilter>`
               - :ref:`spatialFilter <igospatialFilter>`
               - :ref:`importExport <igoimportExport>`
               - :ref:`mapTool <igomaptool>`
               - :ref:`mapLegend <igomapLegend>`
               - :ref:`mapDetails <igomapDetails>`
               - :ref:`mapTools <igomaptools>`
               - :ref:`measurer <igomeasurer>`
               - :ref:`print <igoprint>`
               - :ref:`searchResults <igosearchResults>`
               - :ref:`spatialFilter <igospatialFilter>`
               - :ref:`shareMap <igoshareMap>`
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traductions.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans `Language`_
         -
         - .. line-block::
               Référer vous à
               l'outil désiré.



    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens

        - `igo2-lib/tree/master/packages/integration/src/lib/... <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib>`_




***************
Uri
***************

    .. line-block::
        Identifiant du contexte. Particulièrement utile pour le partage de cartes. C'est cette propriété du contexte qui est utilisée pour bâtir l'url de partage de carte:

            ex: .../?context=uriDuContexte...

        Si votre contexte est dans un sous-répertoire, y inscrire également dans l'uri le chemin (repertoire/uriDuContexte)

        Ne pas y inscrire d'extension du fichier.

Exemples

        .. code:: json

            "uri": "uriDuContexte",
