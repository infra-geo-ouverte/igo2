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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/config-summary.csv
       :header-rows: 1
       :widths: 10 10 30 15

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
                "allowAnonymous": true,
                "hostsWithCredentials": [{
                                           withCredentials: true,
                                           domainRegFilters: '(https:\/\/|http:\/\/)(.*domain.com)(.*)'
                                        }],
                "hostsByKey": [{
                                           keyProperty: 'theNameOfYourKey,
                                           keyValue: 'theValueOfYourKey',
                                           domainRegFilters: '(https:\/\/|http:\/\/)(.*domain.com)(.*)'
                                        }]
            }

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
      :file: _tables/fr/config/auth.csv
      :header-rows: 1
      :widths: 10 10 30 15 10

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
            - Service Image ArcGIS Rest
            - Service Tile ArcGIS Rest

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
                      "id": "Image Arcgis Rest",
                      "title": "Image Arcgis Rest",
                      "url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
                      "externalProvider": true,
                      "type": "imagearcgisrest",
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
                      "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
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
                      "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                      "regFilters": ["zpegt"]
                  },
                  {
                      "id": "group_impose",
                      "title": "(composite catalog) with group imposed",
                      "composite": [
                            {
                              "id": "tq_swtq",
                              "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
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
                                "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                                "type": "wms",
                                "forcedProperties": [{
                                  "layerName": "lieuhabite",
                                  "title": "Nouveau nom pour cette couche WMS"
                                }]
                              },
                              {
                                "id": "forcedProperties_arcgisrest",
                                "url": "https://gisp.dfo-mpo.gc.ca/arcgis/rest/services/FGP/Seafloor_SubstratBenthique/MapServer",
                                "externalProvider": true,
                                "type": "imagearcgisrest",
                                "forcedProperties": [{
                                  "layerName": "Sediment substrate / Substrat sédimentaire",
                                  "title": "Nouveau nom pour cette couche Image ArcGIS REST"
                                }]
                              },
                       ]
                  },
                 ]
            }

Propriétés
===============

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/catalog-src.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

.. _igocatalogObject:

Propriétés - Objet Catalog
=============================


    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
      :file: _tables/fr/config/catalog.csv
      :header-rows: 1
      :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igocompositecatalogObject:

Propriétés - Objet CompositeCatalog (spécialisation de l'objet Catalog)
==========================================================================

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|

    .. csv-table::
       :file: _tables/fr/config/catalog-composite.csv
       :header-rows: 1
       :widths: 10 10 30

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/context-api.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/context/src/lib/context-manager/shared/context.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/context/src/lib/context-manager/shared/context.interface.ts>`_

***************
Depot
***************

.. note::

      En cours de construction

.. line-block::

      Permet de rejoindre une API de dépôt nous fournissant des fichiers (par exemple, un guide d'autoformation).
      Cette API sera documentée indépendamment de la présente documentation.

Exemples

      .. code:: json

            depot: {
            "url" : "https://geoegl.msp.gouv.qc.ca/apis/depot/...",
            "trainingGuides?" : ["fichier1", "fichier2"]
            }

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|

    .. csv-table::
       :file: _tables/fr/config/depot-api.csv
       :header-rows: 1
       :widths: 10 10 30

Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

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
DrawingTool
***************

    .. line-block::

        Cette configuration permet de créer un liste d'url représentant des icônes afin que ceux-ci
        puissent être utilisés dans `l'outil de dessin <https://igo2.readthedocs.io/fr/latest/properties.html#draw>`

Exemples

        .. code:: json

            drawingTool: {
                icons: [
                  "https://icons.duckduckgo.com/ip3/www.google.com.ico",
                  "https://img.icons8.com/color/search/96"
                ]
            }

Liens

        - `igo2-lib/tree/master/packages/geo/src/lib/draw/draw <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/geo/src/lib/draw/draw>`_


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/import-export.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/interactiveTour.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/locale.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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
                        "link": "https://www.igouverte.org/",
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


.. _overlayStyle:

************
overlayStyle
************

    Permet de définir le style des éléments ajoutés à la carte (overlay), suite a une interrogation par clic ou par une recherche.
    Les objets sélection et focus sont facultatifs. Les propriétés contenues par ces objets sont également facultatives. 
    Si les objects sont vide ou absent, le style par défaut sera appliqué (bleu et turquoise). 
    Les couleurs acceptées peuvent être en couleur HEX, en liste RGB ou en couleur nommée.

Exemple

        .. code:: json

            "queryOverlayStyle": {},
            "searchOverlayStyle": {
                  "base": {
                      "markerColor": "purple",         // marker fill
                      "fillColor": [233,66,133],       // poly
                      "outlineColor": "LightPink",      // marker contour
                      "strokeColor": "green",           // line and poly
                      "strokeWidth": 1                  // line and poly
                  },
                  "selection": {
                      "markerColor": "#32a852",         // marker fill
                      "fillColor": [95,96,133],         // poly
                      "outlineColor": "#a62997",        // marker contour
                      "strokeColor": "#a62997",         // line and poly
                      "strokeWidth": 4                  // line and poly
                  },
                  "focus": {
                      "markerColor": "blue",            // marker fill
                      "fillColor": "red",               // poly
                      "outlineColor": "LightPink",      // marker contour
                      "strokeColor": "Sienna",          // line and poly
                      "strokeWidth": 2                  // line and poly
                  }
              }


.. _igoprojections:

***************
Projections
***************

    .. line-block::

        Permet de définir une **liste** de projections non enregistrées par défault par IGO2 (Proj4). On parle ici de projection non mondiale ou à référence locale (ex: mtm, Lambert MTQ...)
        Référez vous à : `https://epsg.io/ <https://epsg.io/>`_. Ils y définissent l'entièreté des paramètres nécessaires.

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|

    .. csv-table::
       :file: _tables/fr/config/projection.csv
       :header-rows: 1
       :widths: 10 10 30

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens
        - `https://epsg.io/ <https://epsg.io/>`_
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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/directions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/theme.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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
                "nbVisitToShow":3,
                "discoverTitleInLocale": "votre application préférée"
              }

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/welcomeWindow.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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
                      "link": "https://www.igouverte.org/",
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
                      "link": "https://www.droitauteur.gouv.qc.ca/copyright.php",
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
                      "link": "https://www.igouverte.org/",
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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/context-summary.csv
       :header-rows: 1
       :widths: 10 10 30 15

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
                        "attributions": "© les contributeurs <a href='https://www.openstreetmap.org/copyright' target='_blank'>d’OpenStreetMap</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>"
                        }
                  },
                  {
                        "title": "Satellite",
                        "baseLayer": true,
                        "visible": false,
                        "sourceOptions": {
                        "url": "https://geoegl.msp.gouv.qc.ca/apis/carto/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg",
                        "attributions": "© <a href='https://www.droitauteur.gouv.qc.ca/copyright.php' target='_blank'><img src='https://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a> / <a href='https://www.igouverte.org/' target='_blank'>IGO2</a>",
                        "type": "xyz",
                        "crossOrigin": "anonymous"
                        }
                  },
                  {
                        "title": "Blanc",
                        "baseLayer": true,
                        "visible": false,
                        "sourceOptions": {
                        "attributions": "<a href='https://www.igouverte.org/' target='_blank'>IGO2</a>",
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

.. _igomessage:

***************
Message
***************

    .. line-block::

        Message affiché à l'ouverture du contexte ou à l'ouverture de la couche.
        - Une librairie tierce est utilisée pour l'affichage de message : `NGX-TOASTR  <https://www.npmjs.com/package/ngx-toastr>`_
        NB.: Les classes connues de l'application peuvent être utilisées. Des classes personalisées spécifiques aux messages peuvent être ajoutés.
         `IGO2 styles.scss <https://github.com/infra-geo-ouverte/igo2/blob/master/src/styles.scss#L13>`_  

Exemples

        .. code:: json

            "message": {
                  "format": "html",
                  "html": "<div class='class-custom-rouge'> Bienvenue sur <b>IGO</b></div>",
                  "type": "info",
                  "options": {
                        "timeOut": 30000
                  }
            },

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/message.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|

    .. csv-table::
       :file: _tables/fr/config/tools.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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
