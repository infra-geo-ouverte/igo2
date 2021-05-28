---------------------
Composante
---------------------

==============================
Géométrique
==============================


.. _igomap:

*****************************
Carte (map)
*****************************
    .. line-block::
        Permet de définir les propriétés de la carte dans le contexte.
        NB: Peut être définie une seule fois dans le contexte _base pour être appliqué à tous les contextes.

Exemples

        .. code:: json

          {
              "map": {
                "view": {
                    "enableRotation": false,
                    "projection": "EPSG:3857",
                    "center": [-73, 50.5],
                    "zoom": 6,
                    "geolocate": false,
                    "maxZoomOnExtent":15
                }
              }
          }


Propriétés de l'objet "view" de map

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
       * - enableRotation
         - Boolean
         - .. line-block::
               Définir si, lors de l'utilisation en mobile, on peut tourner la carte et de cette facon ne plus avoir le nord en haut.
         - .. line-block::
               true
               false
         - true
       * - projection
         - String
         - .. line-block::
               Indique la projection de la carte en indiquant le code EPSG.
         -
         -
       * - center
         - Array []
         - Coordonnée du positionnement du centre de la carte lors de l'arrivée dans le contexte.
         -
         -
       * - zoom
         - Number
         - Indique le niveau de zoom de la carte lors de l'arrivée dans le contexte.
         -
         -
       * - geolocate
         - Boolean
         - Indique si la carte est zommée sur la localisation de l'utilisateur lors de l'arrivée dans le contexte.
         - true/false
         - true
       * - maxZoomOnExtent
         - Number
         - Indique le niveau de zoom qu'aura l'application lors d'un clic sur un résultat de recherche qui n'est pas une couche.
         -
         -


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

    ** En construction, propriété a compléter

Liens

    - `igo2-lib/packages/geo/src/lib/map/shared/map.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/map/shared/map.interface.ts>`__

.. _igolayer:

*****************************
Couche d'information (layer)
*****************************

    .. line-block::
        Permet de définir les propriétés d'une couche d'information.

Exemples

        .. code:: json

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
       * - baseLayer
         - Boolean
         - .. line-block::
               Définir si la couche doit être considérée
               comme une couche de base. Les couches de
               base sont présentées dans le "baselayer"
               switcher dans le coin inférieur gauche et
               peuvent être exclues visuellement de la
               table des matières.
         - .. line-block::
               true
               false
         - false
       * - id
         - string
         - .. line-block::
               Identifiant unique de la couche à l'échelle de l'application. 
               Particulièrement utile pour bâtir le lien pour le partage
               de cartes. Si vous avez plusieurs fois la même couche dans un context
               vous devez avoir un id pour que le lien de partage foinctionne bien.
               Attention: si vous définissez un id, la couche ajoutée par le catalogue
               ou par la recherche sera considérée par l'app. comme une couche différente,
               vous aurez donc 2 fois la même couche.
         -
         - uuid
       * - legendOptions
         -  objet `LegendOptions`_
         - .. line-block::
               Permet de définir des options sur la légende.
         -
         -
       * - workspace
         -  objet `WorkspaceOptions`_
         - .. line-block::
               Permet de définir si une source possèdera une table
               d'attribut dans l'application ainsi
               que ses propriétés associées.
         - .. line-block::
              workspace: 
              { enabled: true, 
              minResolution: 0, 
              maxResolution: 400}
         - Voir dans l'objet `WorkspaceOptions`_
       * - maxResolution
         - Number
         - .. line-block::
               Définir la résolution à laquelle la couche
               d'information commence à s'afficher.
               Intéressant pour les couches exigeantes à
               récupérer à très petite échelle (ex. 1: 5000000).

               Pour les **WMS** récupérant certaines
               propriétés du service, cette valeur peut
               être récupérée.
         -
         - 
       * - maxScaleDenom
         - Number
         - .. line-block::
               Définir l'échelle à laquelle la couche d'information commence
                à s'afficher. Le chiffre inscrit correspond à l'échelle.
                Ex. 2000000 correspond à 1:2000000
         -
         - 
       * - minResolution
         - Number
         - .. line-block::
            Définir la résolution à laquelle la couche d'information arrête
            de s'afficher.

            Pour les **WMS** récupérant certaines propriétés du service, 
            cette valeur peut y être récupérée.
         -
         -
       * - minScaleDenom
         - Number
         - .. line-block::
            Définir l'échelle à laquelle la couche d'information arrête 
            de s'afficher. Le chiffre inscrit correspond a l'échelle.
            Ex. 20000 correspond à 1:20000
         -
         -
       * - messages
         - `Message`_[]
         - .. line-block::
            Affichage d'un list des messages.
            Des messages s'affichent seulement 1 fois
            pendant la session lorsque la couche s'affiche.
         -
         -
       * - metadata
         - Object{}
         - .. line-block::
               Définir la source pour les metadonnées. Lien pour
               le bouton i de la couche -> 'i'. Si la balise url
               est configurée, elle permet de définir un url au choix.
               Pour les WMS, si la couche wms a une balise dataUrl et que
               la source wms à l'option optionsFromCapabilities : true,
               l'application ira récupérer le lien dans le service WMS.
               La valeur pilotée à préséance sur la valeur récupérée du service.
               Pour les sources WMS, WMTS et ArcGISREST, si celui-ci n'est pas
               défini, c'est l'abstract du catalogue qui sera utilisé.
               Les propriété permises sont:
                   - url
                   - extern
                   - keyword
                   - abstract = résumé de la couche. Sert au tooltip ici bas.
         - {url: "https://www.igouverte.org/", extern: true}
         -
       * - tooltip
         - Object{}
         - .. line-block::
               Permet de définir le type de tooltip à afficher sur survol de la couche
               dans la table des matières (liste de couche).
               Les divers types sont:
                   - title
                   - abstract
                   - custom
               Le type title présente uniquement le titre de la couche
               Le type abstract récupère le "abstract" de la balise metadata.
               Le type custom récupère le texte de la balise text
         - .. line-block::
               {  type: 'title'
                    ou  'abstract'
                    ou  'custom',
                  text: 'text à afficher si le type est custom'
               }
         - {  type: 'title'}
       * - opacity
         - Number
         - .. line-block::
               Définir la transparence de la couche.
               0 = invisible
               1 = aucune transparence
               Également controlable par l'interface.
         - de 0.0 à 1.0
         - 1
       * - showInLayerList
         - Boolean
         - .. line-block::
               Autoriser/Bloquer la suppression de la
               couche de la table des matières.
         - true false
         - true
       * - **sourceOptions***
         -  objet `SourceOptions`_
         - .. line-block::
               Diverses sources de données sont supportées.
               Référez-vous aux section suivantes pour
               plus de détails.
         -
         -
       * - **title***
         - String
         - .. line-block::
               Titre de la couche tel qu'affiché dans
               la table des matières et dans les résultats
               d'interrogations.

               Pour les **WMS** et **WMTS** récupérant
               certaines propriétés du service, cette
               valeur peut y être récupérée et n'est plus obligatoire
               à ce moment.
         -
         -
       * - visible
         - Boolean
         - .. line-block::
               Visibilité de la
               couche à l'ouverture
               du contexte.
         - true false
         - true
       * - zIndex
         - Number
         - .. line-block::
               Ordre dans la table des matières. Plus
               le nombre est élevé, plus la couche
               apparait au haut de la table
               des matières. Si absent, l'ordre dans le
               contexte.json fait office d'ordonnancement.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`__



LegendOptions
===============

    .. line-block::
        Propriétés de l'objet legendOptions.
        Permet de controler le rendu de légende.

Exemples


      .. code:: json

            {"legendOptions": {
                  "collapsed": false,
                  "display": true,
                  "url": "https://v.seloger.com/s/width/1144/visuels/0/m/l/4/0ml42xbt1n3itaboek3qec5dtskdgw6nlscu7j69k.jpg",
                  "stylesAvailable": [
                        { "name": "rain", "title": "Pluie" },
                        { "name": "raster", "title": "Défaut" }
                  ]
            }}

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
       * - collapsed
         - Boolean
         - .. line-block::
               Définir si la légende est ouverte.
         - .. line-block::
               true | false

         -
       * - display
         - Boolean
         - .. line-block::
               Indique si on affiche la légende.
         - true | false
         - true
       * - html
         - String
         - Inscription html pour la légende.
         -
         -
       * - stylesAvailable
         - ItemStyleOptions[]
         - .. line-block::
               Permet de modifier/contrôler la liste des styles provenant du
               service web. Correspond aux styles disponible pour le layer
               WMS tel que décrit dans le GetCapabilities WMS.
         - .. line-block::
               Ex:  "stylesAvailable": [
                  { "name": "raster", "title": "pixel" },
                  { "name": "Contour", "title": "aucune couleur" }
                ]

         -
       * - url
         - String
         - .. line-block::
               URL imposé pour l'appel de la légende.
               Exemple: "/ws/mffpecofor.fcgi?&REQUEST=GetLegendGraphic&SERVICE=WMS&FORMAT=image/png&
               SLD_VERSION=1.1.0&VERSION=1.3.0&LAYER=lidar_index_extraction"
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`__


SourceOptions
===============


    .. line-block::
        Diverses sources de données sont supportées.
        Référez-vous aux section suivantes pour
        plus de détails.

        - `ArcGis`_
        - `Image ArcGis`_
        - `Tile ArcGis`_
        - `Carto`_
        - `OSM`_
        - `Cluster`_
        - `TMS (xyz)`_
        - `Vector Tiles`_
        - `Vecteur`_
        - `Websocket`_
        - `WFS`_
        - `WMS`_
        - `WMTS`_



WorkspaceOptions
================

    .. line-block::
        Permet de définir si une source possèdera une table
        d'attribut dans l'application ainsi
        que ses propriétés associées.

Exemples

      .. code:: json

            {"workspace": {
                  "enabled": true,
                  "minResolution": 0,
                  "maxResolution": 400
            }}

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
               Définir si la couche aura ou non une table d'attributs.
         - .. line-block::
               true | false
         - .. line-block::
               Pour les sources vectorielles, true par défault.
               Pour les wms avec des propriétés
               WFS associées, false par défault
       * - minResolution
         - Number
         - .. line-block::
               Indique la résolution minimale (grande échelle, très zoomé)
               à laquelle la table d'attribut pourra faire apparaitre des
               enregistrements.
         - 0 à Infinity ou absent
         -
       * - maxResolution
         - Number
         - .. line-block::
               Indique la résolution maximale (petite échelle, peu zoomé)
               à laquelle la table d'attribut pourra faire apparaitre des
               enregistrements.
         - 0 à Infinity ou absent
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`__
    - `Exemples <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/workspace.json>`__


LinkedLayersOptions
===================

    .. line-block::
        Permet de définir un lien entre des couches et
        de synchroniser les propriétés choisies.

Exemples

      .. code:: json

            {"linkedLayers": {
                "linkId": "wmsTimeFilterSrc",
                "links": [{
                            "bidirectionnal": true,
                            "linkedIds": ["wmsTimeFilterDest"],
                            "syncedDelete": true,
                            "properties": ["opacity","timeFilter","visible"]
                          }]
            }}

Propriétés de LinkedLayersOptions

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
       * - **linkId**
         - String
         - .. line-block::
               Identifiant de liaison de la présente couche.
               Diffère du ID du la couche car cet id doit être
               connu au pilotage, pas seulement lors l'éxécution
               du code.
         -
         -
       * - links
         - :ref:`LayersLinkProperties[] <LayersLinkProperties>`
         - .. line-block::
               Définit la liste des couches "enfant" liées
               ainsi que leurs propriété qui sont synchronisées.
               Obligatoire pour les couches parents.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.


.. _LayersLinkProperties:

Propriétés de LayersLinkProperties

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
       * - bidirectionnal
         - Boolean
         - .. line-block::
               Indique si les 2 couches sont liées de manière
               bi-directionnelles. C'est à dire, si une modification
               de l'enfant est transférée au parent et inversement.
         - true | false
         - true
       * - **linkedIds**
         - string[]
         - .. line-block::
               Liste des identifiants de liaison.
               C'est à dire, une liste des linkId des couches enfant.
         -
         -
       * - syncedDelete
         - Boolean
         - .. line-block::
               Indique si les 2 couches doivent être supprimées
               simultanément lorsque une ou l'autre des couches
               est supprimée de la liste des couches.
         - true | false
         - false
       * - **properties**
         - String[]
         - .. line-block::
               Indique les propriétés à maintenir entre les 2 couches liées.
                   - opacity
                   - visible
                   - :ref:`ogcFilters <igoOgcFilterObject>`
                   - minResolution
                   - maxResolution
                   - zIndex
                   - timeFilter => `Configuration filtre temporel WMS-T (timeFilter)`_
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`__
    - `Exemples <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/layerSync.json>`__



********************************
Sources de données (datasource)
********************************

Certaines sources de données possèdent des propriétés communes et spécifiques.

Les propriétés communes et spécifiques seront traitées et différenciées dans les sections suivantes.


Propriétés communes
=====================

    .. line-block::
        Les propriétés communes aux sources de données (sourceOptions).


Exemples

      .. code:: json

            {"sourceOptions": {
                  "attributions": "Droits d'auteurs que vous désirez afficher avec votre couche.",
                  "crossOrigin": "anonymous"
            }}


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
       * - attributions
         - String
         - .. line-block::
               Les droits d'auteurs liés à la couche.
         -
         - .. line-block::
               Pour OpenStreetMap, la valeur par défaut est @OpenStreetMap contributors
       * - crossOrigin
         - String
         - .. line-block::
               Permet de définir l'entête de l'appel faite au serveur.
               Permet entre autres, d'éviter les problématiques de CORS.
               De manière plus commune, définir "crossOrigin": "anonymous".
         -  anonymous | use-credentials | null
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `Réglages CORS <https://developer.mozilla.org/fr/docs/Web/HTML/Reglages_des_attributs_CORS>`__


ArcGis
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.
       Problématique observée pour les styles complexe. Même QGIS ne rends pas correctement les styles complexe.
       https://github.com/infra-geo-ouverte/igo2-lib/issues/810


Exemples

      .. code:: json

            {
                "sourceOptions": {
                    "type": "arcgisrest",
                    "layer": "2",
                    "queryable": true,
                    "url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
                    "queryFormat": "esrijson",
                    "queryPrecision": 20 , // unité en mètres pour l'interrogation de la couche
                    "idColumn": "OBJECTID"
                }
            }


Image ArcGis
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.
       C'est la version qui effectue un seul appel pour toute l'étendu de la carte.


Exemples

      .. code:: json

            {
                "sourceOptions": {
                    "type": "imagearcgisrest",
                    "layer": "1",
                    "queryable": true,
                    "url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
                    "queryFormat": "esrijson",
                    "queryPrecision": 20 , // unité en mètres pour l'interrogation de la couche
                    "idColumn": "OBJECTID"
                }
            }


Tile ArcGis
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.
       C'est la version qui effectue plusieurs appels pour l'étendue de la carte.
       Peut être conflictuel pour les étiquettes qui seront dupliqués pour chacune des tuiles.


Exemples

      .. code:: json

            {
                "sourceOptions": {
                    "type": "tilearcgisrest",
                    "layer": "1",
                    "queryable": true,
                    "url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
                    "queryFormat": "esrijson",
                    "queryPrecision": 20 , // unité en mètres pour l'interrogation de la couche
                    "idColumn": "OBJECTID"
                }
            }


Carto
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


Exemples

      .. code:: json

            {
              "sourceOptions": {
              "type": "carto",
              "account": "common-data",
              "queryable": true,
              "queryFormat": "geojson",
              "queryPrecision": "5000",
              "crossOrigin": "anonymous",
              "config": {
                  "version": "1.3.0",
                  "layers": [
                        {
                            "type": "cartodb",
                            "options": {
                                "cartocss_version": "2.3.0",
                                "cartocss": "#layer { line-width: 3; line-color: ramp([yr], (#5F4690, #1D6996, #38A6A5, #0F8554, #73AF48, #EDAD08, #E17C05, #CC503E, #94346E, #6F4070, #666666), (\"2004\", \"2008\", \"2011\", \"1998\", \"2003\", \"1999\", \"1992\", \"2010\", \"2005\", \"1995\"), \"=\"); }",
                                "sql": "select * from tornado"
                                }
                        }
                  ]
              }}
            }


OSM
===============

    .. line-block::
        Le fond standard OpenStreetMap.
        Ce type de service n'est pas interrogeable.

Exemples

      .. code:: json

            {"sourceOptions": {
                  "type": "osm"
            }}


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
       * - **type***
         - String
         -
         - osm
         - osm


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/osm-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/osm-datasource.interface.ts>`__


Cluster
===============

    .. note::
       Une source de données pour les données vectorielle composées de points. Elle génere des regroupements d'entité lorsque ceux-ci se retrouve près l'une de l'autre.

Exemples

      .. code:: json

            {"sourceOptions": {
                  "url": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson",
                  "type": "cluster",
                  "distance": 50
            }}


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
       * - **type***
         - String
         -
         - cluster
         - cluster
       * - **url***
         - String
         - .. line-block::
               L'URL du fichier contenant les entités.
         -
         -
       * - excludeAttribute
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du getInfo lorsque l'application
               est en ligne.
         -
         -
       * - excludeAttributeOffline
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du getInfo lorsque l'application
               est hors-ligne.
         -
         -
       * - distance
         - Number
         - Distance en pixel entre les entités
         -
         - 20

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/cluster-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/cluster-datasource.interface.ts>`__



TMS (xyz)
===============

    .. line-block::
        Une source de données pour les services de données tuilées de type XYZ où le X et le Y représentent la position de la tuile appelée et le Z, le niveau de zoom (résolution) de la tuile.

Exemples

      .. code:: json

            {"sourceOptions": {
                  "url": "https://geoegl.msp.gouv.qc.ca/apis/carto/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg",
                  "type": "xyz"
            }}


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
       * - **type***
         - String
         -
         - xyz
         - xyz
       * - **url***
         - String
         - .. line-block::
               L'URL du service de données tuilées en spécifiant la position
               des tuiles en déclarant les balises de remplacement:
                  - {x}
                  - {-y}
                  - {z}
               X et Y représentent la position de la tuile appelée
               tandis que le Z, le zoom.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/xyz-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/xyz-datasource.interface.ts>`__


Vector Tiles
===============

    .. line-block::
        Une source de données pour les services de données au format Vector tiles. Plus spécifiquement,
        au format `Mapbox Vector Tiles (MVT) <https://docs.mapbox.com/vector-tiles/specification/>`__ .

Exemples

      .. code:: json

            {"sourceOptions": {
                  "type": "mvt",
                  "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq?mode=tile&tilemode=gmap&tile={x}+{y}+{z}&layers=bgr_v_sous_route_res_inv_act&map.imagetype=mvt"
            }}


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
       * - **type***
         - String
         -
         - mvt
         - mvt
       * - **url***
         - String
         - .. line-block::
               L'URL du service de données tuilées en spécifiant la position
               des tuiles en déclarant les balises de remplacement:
                  - {x}
                  - {-y}
                  - {z}
               X et Y représentent la position de la tuile appelée
               tandis que le Z, le zoom.
         -
         -
       * - excludeAttribute
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du getInfo lorsque l'application
               est en ligne.
         -
         -
       * - excludeAttributeOffline
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du getInfo lorsque l'application
               est hors-ligne.
         -
         -
       * - featureClass
         - String
         - .. line-block::
               Définir cette option en tant que 'feature' pour obtenir
               une prise en charge complète de l'édition
               et de la géométrie des tuiles.
               Cette option diminue les performances de rendu des tuiles.

               Ne pas utiliser cette option pour
               optimiser le rendu des tuiles.
         - feature
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/mvt-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/mvt-datasource.interface.ts>`__
    - `Mapbox Vector Tiles (MVT) <https://docs.mapbox.com/vector-tiles/specification/>`__
    - `Mapserver 7.2 + <https://mapserver.gis.umn.edu/it/development/rfc/ms-rfc-119.html>`__
    - `Geoserver <https://docs.geoserver.org/latest/en/user/extensions/vectortiles/tutorial.html>`__


Vecteur
===============


.. line-block::
  Source de donnée permettant d'afficher des données vectorielles provenant de fichier en ligne ou de service donnant des entitées.

  La projection doit être EPSG:3857. Si ce n'est pas le cas il faut ajouter les paramètres dans formatOptions pour convertir.
  Par exemple pour le format Geojson:
      - dataProjection = la projection de la donnée source
      - featureProjection = la projection IGO -> 3857
  Les paramètres possibles dans formatOptions sont ratachés au format de openLayer.
  Par exemple ici pour le `Geojson <https://openlayers.org/en/latest/apidoc/module-ol_format_GeoJSON-GeoJSON.html>`__

  NB: Le site web ou est stockés le fichier, par exemple https://www.donneesquebec.ca doit être ajouté à la sécurité du site IGO et
   le site IGO doit être ajouté à la sécurité du site de donnée.

  NB2: Pour que le partage de carte fonctionne bien il est nécessaire d'ajouter un id à la couche


Exemples

      .. code:: json


            {
              "title": "Donnée geojson sur DQ (pas de service)",
              "id": "vector1",
              "sourceOptions": {
                "type": "vector",
                "url": "https://www.donneesquebec.ca/recherche/dataset/f647f5ed-a8f3-4a47-8ceb-977cbf090675/resource/68e0e20a-415d-44f5-af82-a90311784616/download/bornes-incendies.geojson"
                "queryable": true,
                "queryFormat": "geojson",
                "queryTitle": "Le titre",
                "formatOptions": {
                  "dataProjection": "EPSG:4326",
                  "featureProjection":"EPSG:3857"
                },
              }
            },
            {
              "id": "vector2",
              "title": "Geojson provenant d'un apel wfs",
              "sourceOptions": {
                  "queryable": true,
                  "type": "vector",
                  "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq?service=WFS&request=GetFeature&version=1.1.0&typename=aeroport_piste&outputFormat=geojson"
              }
            }


Websocket
===============

      .. line-block::
        Une source de données provenant d'un websocket.

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
       * - **onmessage***
         - String
         - .. line-block::
                  Action déclenchée lors de la réception
                  de la donnée par le websocket
         - update | delete | add
         - add
       * - **onopen**
         - String
         - .. line-block::
                  Action déclenchée lors de l'ouverture du websocket.
         -
         -
       * - **onclose**
         - String
         - .. line-block::
                  Action déclenchée lors de la fermeture du websocket.
         -
         -
       * - **onerror**
         - String
         - .. line-block::
                  Action déclenchée lors d'une erreur du websocket.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Exemple
      .. code:: json

            {

                  "title": "Points temps réel",
                  "sourceOptions": {
                        "type": "websocket",
                        "url": "wss://websocket.domain/api/websocket/",
                        "onmessage": "update",
                        "queryable": true,
                        "queryTitle": "Véhicule : ${unitid}"
                  }
            }


Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/websocket-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/websocket-datasource.interface.ts>`__
    - `Websocket <https://developer.mozilla.org/fr/docs/Web/API/WebSocket>`__


WFS
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.

Exemples

        .. code:: json

            {
                  "sourceOptions": {
                        "type": "wfs",
                        "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                        "queryable": true,
                        "params": {
                              "featureTypes": "vg_observation_v_autre_wmst",
                              "fieldNameGeometry": "geometry",
                              "maxFeatures": 10000,
                              "version": "2.0.0",
                              "outputFormat": "geojson_utf8"
                        }
                  }
            }


WMS
===============

    .. line-block::
        Une source de données pour les services de données au format `OGC WMS <https://www.opengeospatial.org/standards/wms>`__ .
        Les diverses version WMS sont acceptées.


    .. note::
        En cours de construction.

Exemples

        .. code:: json

            {
                  "sourceOptions": {
                        "type": "wms",
                        "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                        "params": {
                              "layers": "telephone_urg",
                              "version": "1.3.0"
                        },
                        "queryable": true,
                        "queryFormat": "gml2",
                        "queryTitle": "desclocal",
                        "optionsFromCapabilities": true,
                        "optionsFromApi": true
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
               Valeur défaut
       * - **type***
         - String
         -
         - wms
         - wms
       * - **url***
         - String
         - .. line-block::
               L'URL du service WMS utilisé
               SANS les paramètres d'appels
               WMS. L'application se charge
               de compléter les paramètres
               envoyés au serveur (KVP).
         -
         -
       * - optionsFromCapabilities
         - Boolean
         - .. line-block::
               Paramètre pour récupérer des informations du service.
         - true/false
         - false
       * - **params***
         - String
         - .. line-block::
               Paramètres WMS qui seront fait
               aux serveurs WMS pour les divers
               type d'appels WMS
               (GetMap, GetLegendGraphics, ...).
         - Référez-vous aux paramètres WMS ici-bas.
         -
       * - optionsFromApi
         - Boolean
         - .. line-block::
               Paramètre pour récupérer des informations supplémentaires
               par un service d'options de couches..
         - true/false
         - false
       * - refreshIntervalSec
         - Number
         - .. line-block::
               Nombre de secondes entre chaque
               rafraichissement automatique
               de la source de données. Ainsi,
               aucun déplacement de la carte
               n'est nécessaire pour rafraichir
               la donnée.
         - en secondes
         - Null si non définit
       * - contentDependentLegend
         - Boolean
         - .. line-block::
               Pour Mapserver et Geoserver, il est possible de retourner
               la légende WMS du contenu de la carte et non pas toute la
               légende de la couche. Exemple: Si ce paramètre est définit
               à true et que vous zoomer sur un secteur dans lequel il y
               seulement 1 classe de symbologie, la légende retournée sera
               composée d'une seule couleur. Si vous zoomez a l'échelle
               provinciale et que vous voyez tous les classes de données,
               la légende retournée sera composée de toutes les classes de
               la couche.
               IMPORTANT: Ne tient pas compte des filtres OGC appliqués.
         - true/false
         - false
       * - queryable
         - Boolean
         - .. line-block::
               Définit si la couche d'information
               est interrogeable ou non
         - true/false
         - true
       * - queryFormat
         - Boolean
         - .. line-block::
               Format d'interrogation de la couche.
         - .. line-block::
               - gml2
               (application/vnd.ogc.gml)
               - gml3
               (application/vnd.ogc.gml/3.1.1)
               - json
               (application/json)
               - geojson
               (application/geojson)
               - esrijson
               (esrijson)
               - html
               (text/html)
               géométrie du clic auto générée
               - htmlgml2
               (text/html + application/vnd.ogc.gml)
               géométrie fournie par un second appel au format gml2
         - gml2
       * - queryTitle
         - Boolean
         - .. line-block::
               Lorsque la couche interrogée est en
               gml2, gml3, json, geojson, esrijson,
               cette propriété correspond au nom du
               champ retourné  qui sera utilisé dans
               le résultat de clic sur la carte comme
               titre.

               Si cette propriété est absente, le titre
               de la couche est utilisé comme titre
               pour chacun des résultat, suivi d'une
               numérotation séquentielle.
         - .. line-block::
               Exemple 1 seul champ:
                   - "queryTitle": "desclocal"
                Exemple 1 seul champ avec texte:
                   - "queryTitle": "Description ${desclocal}",
               Exemple plusieurs champs:
                   - "queryTitle": "${nomroute} ${desclocal} ",
         -
       * - timeFilterable
         - Boolean
         - .. line-block::
               Indique si oui/non la couche est filtrable temporellement
         - true / false
         - false
       * - timeFilter
         - Object
         - .. line-block::
               Configuration du filtre temporel.
         - Référez-vous à : `Configuration filtre temporel WMS-T (timeFilter)`_ .
         -
       * - ogcFilters
         - Object
         - .. line-block::
               Configuration des filtres attributaires(OGC) appliqués sur la couche.
         - Référez-vous à : :ref:`ogcFilters <igoOgcFilterObject>` .
         -
       * - sourceFields
         - Object
         - .. line-block::
               Configuration des attributs du layer. (champs source de la couche)
         - Référez-vous à : :ref:`sourceFields <igosourceFieldsObject>` .
         -


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Paramètre (params) WMS

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               Paramètre
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - **layers***
         - String
         - .. line-block::
               Correspond au nom de la couche demandée.
               Vous pouvez appeler plusieurs couches,
               en séparant chacune de celles-ci par une
               virgule.
               IMP:
                   - Pour les couches multiples, vous
                     ne pourrez récupérer les propriétés
                     fournies par les GetCapabilities.
                     Vous devez donc fournir les propriétés
                     title, max/min Resolution (au besoin).
                   - Si vous voulez appliquer des filters
                     OGC à des couches multiples, elles
                     doivent partager le même schéma de
                     données (même champs).
         - .. line-block::
               Exemple:
               layers=nomDeLaCouche1
               layers=nomDeLaCouche1,nomDeLaCouche2
         -
       * - version
         - String
         - Version  de l'appel WMS
         - .. line-block::
               1.1.0
               1.1.1
               1.3.0
         - 1.3.0
       * - feature_count
         - Number
         - .. line-block::
               Nombre de résultats retournés par le serveur
               lors des appels GetFeatureInfo
         -
         - 5
       * - info_format
         - String
         - .. line-block::
               Nom spécifique du format d'appel du GetFeatureInfo.

               Nécessaire si vos format d'appels diffèrent des
               noms standards gérés par IGO (décrits précédemment).
         -
         -
       * - dpi
         - Number
         - .. line-block::
               Nombre de points par pouce du résultat
               de l'appel du GetMap. Particulièrement
               utile dans IGO pour effectuer la conversion
               entre la résolution et le nombre échelle.
         -
         - 96
       * - map_resolution
         - Number
         - .. line-block::
               Nombre de points par pouce du résultat
               de l'appel du GetMap. Particulièrement
               utile dans IGO pour effectuer la conversion
               entre la résolution et le nombre échelle.
         -
         - 96
       * - format_options
         - Number
         - .. line-block::
               Nombre de points par pouce du résultat
               de l'appel du GetMap. Particulièrement
               utile dans IGO pour effectuer la conversion
               entre la résolution et le nombre échelle.
         -
         - dpi:96

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

    Pour les propriétés dpi, map_resolution et format_options, les 3 paramètres
    sont envoyés au serveur en tout temps pour éviter les erreurs de conversion
    d'échelle. La décision de faire l'appel des 3 paramètres en simultané est
    basé sur le fait que QGIS procède de la même manière.


Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts>`__
    - `OGC WMS <https://www.opengeospatial.org/standards/wms>`__


WMTS
===============

    .. line-block::
        Une source de données pour les services de données au format `OGC WMTS <https://www.opengeospatial.org/standards/wmts>`__ .

Exemples

        .. code:: json

            {"sourceOptions": {
                "type": "wmts",
                "url": "https://geoegl.msp.gouv.qc.ca/carto/wmts",
                "format": "image/jpeg",
                "matrixSet": "EPSG_3857",
                "layer": "orthos"
            }}


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
       * - format
         - String
         - .. line-block::
               Format d'image demandé au serveur. Dépend des capacités du serveur (wmts Getcapabilities)
         - Dépends des capacités du serveur
         - image/jpeg
       * - **layer***
         - String
         - Nom de la couche demandée
         -
         -
       * - **matrixSet***
         - String
         - Le nom du matrix set demandé au serveur
         -
         -
       * - projection
         - String
         - La projection de l'appel de tuile
         - EPSG:3857
         - La projection de la carte (vue carto)
       * - style
         - String
         - .. line-block::
               Le nom du style demandé tel que présenté dans le GetCapabilities du service
         -
         -
       * - **url***
         - String
         - .. line-block::
               L'URL du service de données tuilées
         -
         -
       * - version
         - String
         - .. line-block::
               La version WMTS du service demandé
         - 1.0.0
         - 1.0.0

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `OGC WMTS <https://www.opengeospatial.org/standards/wmts>`__



************************************
Options de sources avancées
************************************

.. _igoTimeFilterObject:

Configuration filtre temporel WMS-T (timeFilter)
================================================

La configuration du filtre temporel doit être configurée dans `SourceOptions`_

Exemples

        .. code:: json

            {
              "sourceOptions": {
                  "timeFilterable": true,
                  "timeFilter": {
                          "min": "1890",
                          "max": "2019",
                          "style": "calendar",
                          "range": true,
                          "step": 63072000000,
                          "type": "year"
                    }
              }
            }

Propriétés de l'objet timeFilter

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
       * - min
         - String
         - Periode de temps minimum.
         - .. line-block::
            En fonction du type, peut être une année, une date ou une heure.
            NB: Si la valeur est absente, le système appliquera ce qui est définit dans le service.
         -
       * - max
         - String
         - Periode de temps maximum.
         - .. line-block::
            En fonction du type, peut être une année, une date ou une heure.
            NB: Si la valeur est absente, le système appliquera ce qui est définit dans le service.
         -
       * - range
         - Boolean
         - Intervalle à saisir par utilisateur.
         - true/false
         -
       * - step
         - Number
         - Le temps de l'intervalle en millisecondes.
         - Ex: 63072000000 pour un an.
         -
       * - style
         - String
         - Le style du calendrier.
         - calendar, slider
         - slider
       * - type
         - String
         - Le type temporel de calendrier. En année, jour, heure, etc.
         - year, date
         -
       * - timeInterval
         - Number
         - Pour configuration en 'slider', le temps d'attente avant de passer au suivant, en millisecondes.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterObject:

Configuration filtre attributaire OGC (ogcFilters)
===================================================

  Permet de définir la configuration des filtres attributaires(OGC) qui seront appliqués par l'utilisateur sur la couche.
  Plusieurs configurations de filtre sont disponibles. Par exemple, il est possible de créer des boutons sur lesquels l'utilisateur
  pourra appuyer pour filtrer la couche affichée, de réaliser des groupes de filtre, ou bien de donner la possibilité à l'utilisateur
  de créer lui même ces propres filtres à l'aide des filtres avancés.

    - **Limitation**: Disponible uniquement sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.
    - Les outils ogcFilter et/ou activeOgcFilter doivent être activés dans les outils ('tools'). (Voir :ref:`igoactiveogcFilter` et :ref:`igoogcFilter` dans la section outil )
    - Pour activation des filtres avancés, ils est nécessaire de définir un objet sourceField pour les champs à filtrer. Référez-vous à: :ref:`igosourceFieldsObject`
    - Il est possible de définir plusieurs opérateurs sur un même filtre.


Exemples
----------

Exemple - filtre avancé disponible à l'utilisateur.

        .. code:: json

            {
                  "ogcFilters": {
                        "enabled": true,
                        "editable": true,
                        "allowedOperatorsType": "Basic"
                  }
            }


Exemple - filtre avancé définit (zone_veg = Z2) appliqué sur la couche et non disponible pour modification par l'utilisateur

        .. code:: json

            {
                  "ogcFilters": {
                        "enabled": true,
                        "editable": false,
                        "filters": {
                              "operator": "PropertyIsEqualTo",
                              "propertyName": "zone_veg",
                              "expression": "Z2"
                        }
                  }
            }

Exemple - filtre 2 boutons avec l'un eux activé. Filtre avancé non disponible

      .. code:: json

            {
                  "ogcFilters": {
                        "enabled": true,
                        "editable": false,
                        "pushButtons": {
                              "groups": [
                                    {"title": "Group 1","name": "1","ids": ["id1"]}
                              ],
                              "bundles": [
                                    {
                                          "id": "id1",
                                          "logical": "Or",
                                          "title": "Type de radar photo",
                                          "selector": [
                                                {
                                                      "title": "Radar photo fixe",
                                                      "enabled": true,
                                                      "color": "0,0,255",
                                                      "tooltip": "Here a tooltip explaning ...",
                                                      "filters": {
                                                            "operator": "PropertyIsEqualTo",
                                                            "propertyName": "typeAppareil",
                                                            "expression": "Radar photo fixe"
                                                      }
                                                },
                                                {
                                                      "title": "Radar photo mobile",
                                                      "enabled": false,
                                                      "color": "255,200,0",
                                                      "tooltip": "Here a tooltip explaning ...",
                                                      "filters": {
                                                            "operator": "PropertyIsEqualTo",
                                                            "propertyName": "typeAppareil",
                                                            "expression": "Radar photo mobile"
                                                      }
                                                }
                                          ]
                                    }
                              ]
                        }
                  }
            }


Exemple - 2 groupes de filtre avec radio boutons et cases à cocher spécifiques à chaque groupe

        .. code:: json

            {
                "ogcFilters": {
                    "enabled": true,
                    "editable": true,
                    "allowedOperatorsType": "All",
                    "radioButtons": {
                        "order": 2,
                        "groups": [
                            {"title": "filtre foret","name":"1", "ids": ["type_couv", "densite"]},
                            {"title": "filtre metadonnée et densité", "name":"2", "ids": ["densite", "no_program"]}
                        ],
                        "bundles" : [
                            {
                                "id": "type_couv",
                                "logical": "Or",
                                "title": "Type",
                                "selector": [
                                    {
                                        "title": "type couv = Résineux",
                                        "enabled": false,
                                        "color": "255,0,0",
                                        "tooltip": "Here a tooltip explaning ...",
                                        "filters": {
                                              "operator": "PropertyIsEqualTo",
                                              "propertyName": "type_couv",
                                              "expression": "R"
                                         }
                                    },
                                    {
                                        "title": "type couv = Feuillus",
                                        "enabled": false,
                                        "color": "255,100,255",
                                        "tooltip": "Here a tooltip explaning ...",
                                        "filters": {
                                              "operator": "PropertyIsEqualTo",
                                              "propertyName": "type_couv",
                                              "expression": "F"
                                         }
                                    }
                                ]
                            },
                            {
                                "id": "densite",
                                "logical": "Or",
                                "vertical": false,
                                "title": "Densité",
                                "selector": [
                                    {
                                        "title": "densite = A",
                                        "enabled": false,
                                        "color": "255,0,0",
                                        "tooltip": "Here a tooltip explaning ...",
                                        "filters": {
                                              "operator": "PropertyIsEqualTo",
                                              "propertyName": "cl_dens",
                                              "expression": "A"
                                         }
                                    },
                                    {
                                        "title": "densite = A & B",
                                        "enabled": false,
                                        "color": "255,100,255",
                                        "tooltip": "Here a tooltip explaning ...",
                                        "filters": {
                                            "logical":"Or",
                                            "filters":[
                                              {"operator": "PropertyIsEqualTo","propertyName": "cl_dens", "expression": "A"},
                                              {"operator": "PropertyIsEqualTo","propertyName": "cl_dens", "expression": "B"}
                                            ]
                                         }
                                    },
                                    {
                                        "title": "différent de A",
                                        "enabled": false,
                                        "color": "255,100,255",
                                        "tooltip": "Here a tooltip explaning ...",
                                        "filters": {
                                            "operator": "PropertyIsNotEqualTo",
                                            "propertyName": "cl_dens",
                                            "expression": "A"
                                         }
                                    }
                                ]
                             },
                        ]
                    },
                    "checkboxes": {
                        "order": 1,
                        "bundles" : [
                              {
                                "id": "no_program",
                                "logical": "Or",
                                "vertical":false,
                                "title": "Programme"
                                "selector": [
                                  {
                                    "title": "prg no= 4",
                                    "enabled": false,
                                    "color": "255,0,0",
                                    "tooltip": "Here a tooltip explaning ...",
                                    "filters": {
                                          "operator": "PropertyIsEqualTo",
                                          "propertyName": "no_prg",
                                          "expression": "4"
                                    }
                                  },
                                  {
                                    "title": "prg no=5",
                                    "enabled": false,
                                    "color": "255,100,255",
                                    "tooltip": "Here a tooltip explaning ...",
                                    "filters": {
                                          "operator": "PropertyIsEqualTo",
                                          "propertyName": "no_prg",
                                          "expression": "5"
                                    }
                                  }
                                ]
                              }
                        ]
                    }
                }

            }

Exemple - Filtre temporel avec minimum, maximum et pas de temps.

      .. code:: json

              {
                  "type": "wfs",
                  "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                  "params": {
                        "featureTypes": "vg_observation_v_autre_wmst",
                        "fieldNameGeometry": "geometry",
                        "maxFeatures": 10000,
                        "version": "2.0.0"
                  },
                  "sourceFields": [{
                        "name": "date_observation",
                        "alias": "Date de l\"observation",
                        "allowedOperatorsType": "time"
                  }],
                  "ogcFilters": {
                        "enabled": true,
                        "editable": true,
                        "allowedOperatorsType": "time",
                        "filters": {
                              "operator": "During",
                              "propertyName": "date_observation",
                              "begin": "today - 2 days",
                              "end": "today"
                        }
                  },
                  "minDate": "2016-01-01T00:00:00-05:00",
                  "maxDate": "2025-12-31T00:00:00-05:00",
                  "stepDate": "P1D"
            }

Exemple - filtre avec boutons spécifique à un groupe et calendrier (filtrage temporel)

      .. code:: json

            {
                  "type": "wms",
                  "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                  "queryable": true,
                  "paramsWFS": {
                        "featureTypes": "vg_observation_v_autre_wmst",
                        "fieldNameGeometry": "geometry",
                        "maxFeatures": 10000,
                        "version": "2.0.0",
                        "outputFormat": "geojson",
                        "outputFormatDownload": "SHP"
                  },
                  "params": {
                        "layers": "vg_observation_v_autre_wmst"
                  },
                  "sourceFields": [
                        {"name": "date_observation", "alias": "Date de l'observation", "allowedOperatorsType": "Time"},
                        {"name": "type", "alias": "type", "allowedOperatorsType": "all"}
                  ],
                  "ogcFilters": {
                        "enabled": true,
                        "editable": true,
                        "pushButtons": {
                           "groups": [
                              {"title": "Group 1 Title","name": "1","ids": ["id1"]}
                           ],
                           "bundles": [
                              {
                                 "id": "id1",
                                 "logical": "Or",
                                 "title": "Évènements",
                                 "selectors": [
                                    {
                                       "title": "Mouvement de terrain",
                                       "tooltip": "Here a tooltip explaning ...",
                                       "filters": {
                                          "operator": "PropertyIsEqualTo",
                                          "propertyName": "type",
                                          "expression": "Mouvement de terrain"
                                       }
                                    },
                                    {
                                       "title": "Inondation",
                                       "tooltip": "Here a tooltip explaning ...",
                                       "filters": {
                                          "operator": "PropertyIsEqualTo",
                                          "propertyName": "type",
                                          "expression": "Inondation"
                                       }
                                    }
                                 ]
                              }
                           ]
                        },
                        "filters": {
                           "operator": "During",
                           "propertyName": "date_observation",
                           "begin": "2016-01-21T00:00:00-05:00",
                           "end": "today"
                        },
                        "allowedOperatorsType": "basic"
                  },
                  "minDate": "2010-01-01T00:00:00-05:00",
                  "maxDate": "2025-12-31T00:00:00-05:00",
                  "stepDate": "P1D"
            }

Propriétés de ogcFilters

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
       * - allowedOperatorsType
         - String
         - .. line-block::
            Paramètre relatif aux filtres avancés. Les opérateurs pour construire l'expression filtrante qui seront accessible
            à l'utilisateur.
            NB: Ce paramètre s'appliquera a tous les champs definits dans sourceField mais ce paramètre peut aussi être définit
            à l'intérieur de sourceField pour l'appliquer au niveau d'un champ spécifique si besoin.
         - | BasicNumericOperator,
           | Basic, Spatial,
           | BasicAndSpatial,
           | All, time.
         - BasicAndSpatial
       * - editable
         - Boolean
         - Active ou non la possibilité à l'utilisateur de ce construire des filtres avancés.
         - true | false
         - true
       * - enabled
         - Boolean
         - | Active ou non les filtres modifiable par l'utilisateur sur la couche. Si = false, le bouton de filtre n'apparait plus.
           | Par exemple, dans le cas que le pilote voudrait filtrer une couche mais que ce filtre ne soit pas modifiable par l'utilisateur.
         - true | false
         - true
       * - filters
         - | IgoLogicalArrayOptions
           | AnyBaseOgcFilterOptions
         - Permet de définir un filtre avancé. :ref:`voir configuration filters <igoOgcFilterFiltersObject>`
         -
         -
       * - pushButtons
         - PushButton
         - | Permet de définir des boutons poussoirs qui pouront être activés par l'utilisateur pour appliquer des filtres voulus.
           | Doit contenir obligatoirement bundles[].
         -

       * - checkboxes
         - Checkbox
         - | Permet de définir des bcases à cocher qui pouront être activés par l'utilisateur pour appliquer des filtres voulus.
           | Doit contenir obligatoirement bundles[].
         -

       * - radioButtons
         - RadioButton
         - | Permet de définir des radio boutons qui pouront être activés par l'utilisateur pour appliquer des filtres voulus.
           | Doit contenir obligatoirement bundles[].
         -
         -


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens

    - `ogc-filter.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/filter/shared/ogc-filter.interface.ts>`__


.. _igoOgcFilterPushButtons:

Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.selectorType

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
       * - title
         - String
         - Le type de sélecteur.
         - pushButton, checkbox, radioButton
         -

.. _igoOgcFilterPushButtons:

Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.groups

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
       * - ids
         -
         - Liste des identifiants pour le classement des paquets("bundles") de boutons dans les groupes.
         -
         -
       * - title
         - String
         - Le titre du groupe qui apparaitra à l'utilisateur.
         -
         -


.. _igoOgcFilterButtonsBundlesObject:


Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.bundles

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
       * - selector
         - OgcPushButton[], OgcCheckbox[], OgcRadioButton[]
         - Liste de selecteur pour filtrer les entités de la carte
         -
         -
       * - **id***
         - String
         - Id rataché au groupe pour le classement dans le groupe. Doit être présente et identique dans ogcFilter.{selector}.groups.ids
         -
         -
       * - **logical***
         - String
         - Opérateur logique à appliquer entre les boutons lorsque plusieurs boutons seront activés. "ET", "OU".
         - Or, And
         - Doit être définit
       * - vertical
         - Boolean
         - Indique si la disposition des boutons dans la fenêtre se fait de manière verticale.
         - true | false
         -
       * - title
         - String
         - Indique le sous-titre à afficher pour le sélecteur en question.
         -
         -
       * - order
         - Integer
         - Indique l'ordre d'apparition du sélecteur en question.
         - 1, 2, 3...
         -
    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterButtonsButtonsObject:

Propriétés de l'objet ogcFilter.{selector}.bundles.selector

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
       * - color
         - String
         - La couleur du bouton lorsque celui-ci sera activé. En RGB, exemple: "255,0,0".
         - valeur "R,G,B"
         - "224, 224, 224"
       * - enabled
         - Boolean
         - Indique si le bouton est actif ou non.
         - true | false
         - true
       * - filters
         - IgoLogicalArrayOptions | AnyBaseOgcFilterOptions
         - Configuration de l'expression filtrante appliquée sur l'activation du bouton. Voir :ref:`filters <igoOgcFilterFiltersObject>`.
         -
         -
       * - title
         - String
         - Indique ce qu'il y aura d'inscrit sur le bouton.
         -
         - blanc
       * - tooltip
         - String
         - Indique ce qu'il y aura d'inscrit dans l'info-bulle sur le bouton.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterFiltersObject:

Propriétés de l'objet filters (IgoLogicalArrayOptions|AnyBaseOgcFilterOptions)

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
       * - expression
         - String
         - Valeur ou RegEx applicable
         -
         -
       * - operator
         - String
         - | Opérateurs à appliquer. ** Certains opérateurs sont disponibles uniquement sur certain type de filtre.
           | Par exemple, l'opérateur during est disponible uniquement sur le filtre de type time
         - | PropertyIsEqualTo, PropertyIsNotEqualTo,
           | PropertyIsGreaterThan, PropertyIsGreaterThanOrEqualTo,
           | PropertyIsLessThan, PropertyIsLessThanOrEqualTo,
           | Intersects, Within
           | :ref:`During <igoogcfilterduringoptions>`
         -
       * - propertyName
         - String
         - Nom de la propriété sur laquelle appliquer le filtre (nom de la colonne)
         -
         -
       * - A compléter
         -
         -
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igoogcfilterduringoptions:

Propriétés de l'objet filter de type **During**

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
       * - begin
         - String
         - Valeur de début du filtre temporel
         -
         - Valeur **minDate** de la couche
       * - end
         - String
         - Valeur de fin du filtre temporel
         -
         - Valeur **maxDate** de la couche
       * - step
         - String
         - Pas de temps défini selon la norme ISO-8601
         - Voir `wiki <https://fr.wikipedia.org/wiki/ISO_8601#Dur%C3%A9e>`__
         - 60000 millisecondes
       * - restrictedToStep
         - Boolean
         - True si le filtre doit respecter le pas de temps depuis l'attribut **minDate**. Sinon le pas de temps est respecté selon l'attribut **begin**
         - True | False
         - False

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igosourceFieldsObject:

Configuration des attributs champs source de donnée (sourceFields)
======================================================================

| Une liste de nom d'attribut, de leur alias, valeurs permises et autres configurations.
| ** Nécessaire pour utilisation des filtres attributaires avancés. Ce sont ces configurations qui définiront ce qui sera présenté à
 l'utilisateur lors de l'utilisation des filtres avancés.

Exemples

        .. code:: json

            [
                  {"name": "type_couv", "alias": "type couv", "values": ["R", "F"]},
                  {"name": "no_prg", "alias": "No inventaire", "values": ["3", "4", "5"]},
                  { "name": "code_municipalite", "alias": "# de la municipalitée" },
                  { "name": "date_observation", "allowedOperatorsType": "time" },
                  { "name": "urgence", "values": ["Immédiate", "Inconnue"], "allowedOperatorsType": "basic" }
            ]


Propriétés de l'objet sourceFields

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
       * - **name***
         - String
         - Nom de l'attribut
         -
         -
       * - alias
         - String
         - Alias de l'attribut.
         -
         - Le nom de l'attribut est utilisé si nul.
       * - values
         - Array (liste)
         - Liste de valeurs permises
         -
         - .. line-block::
               Si vide, pour les WFS, sera récupéré automatiquement.
       * - excludeFromOgcFilters
         - Boolean
         - Indique si l'attribut est utilisé dans l'outil de filtre OGC.
         - true/false
         - true
       * - allowedOperatorsType
         - String
         - Indique les opérateurs permis pour cet attribut
         - .. line-block::
               BasicNumericOperator OU Basic
               OU BasicAndSpatial OU Spatial
               OU All OU Time
               Référez vous à `ogc-filter.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/filter/shared/ogc-filter.ts#L291>`__ pour les opérateurs correspondants.
         - BasicAndSpatial

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


************************************
Sources de recherche (search-source)
************************************

    Configuration des sources qui seront impliquées dans la recherche faite dans la barre de recherche. Il peut y en avoir plusieurs.


Source (base commune)
=====================

    .. line-block::
        Toutes les sources de recherche possèdent des propriétés commnunes. Certaines spécificités existent pour chacune des sources de recherche.
        Elles seront présentées dans les sections dédiées aux sources.

        Les sources disponible sont:
            - `Cadastre`_
            - `Coordonnées`_
            - `iCherche`_ (Québec)
            - `iCherche Reverse`_ - par coordonnées (Québec)
            - `iLayer`_ (Québec)
            - `Nominatim`_ (internationnal)
            - `StoredQueries`_ , WFS 2.0 (Québec)
            - `StoredQueries Reverse`_    , WFS 2.0  - par coordonnées (Québec)

        Selon votre contexte, les sources de recherche ayant une limitation au Québec, peuvent être utilisées comme exemple afin d'adapter 
        votre propre service de recherche.


Exemples

    .. line-block::
        Les exemples seront présentés pour chacune des sources de recherche.

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
       * - available
         - Boolean
         - .. line-block::
               Permet de préciser si le
               service est utilisable dans
               l'application.
         - true false
         - true
       * - enabled
         - Boolean
         - .. line-block::
               Permet de préciser si le
               service est activé (coché)
               à l'ouverture de
               l'application.
         - true false
         - true
       * - order
         - Number
         - .. line-block::
               Définit la position des
               résultats dans la liste
               des résultats de recherche.
               Plus le nombre est élevé,
               plus les résultats de
               cette source seront
               au bas de la liste.
         -
         - 99
       * - params
         - Object {}
         - .. line-block::
               Paramètres supplémentaires
               à ajouter à la requête
               faite au serveur associé.
               Spécifique selon la source.
         -
         -
       * - searchUrl
         - String
         - .. line-block::
               URL du serveur à utiliser.
         -
         - .. line-block::
               Spécifique
               selon la
               source.
       * - settings
         - SearchSourceSettings []
         - En construction
         -
         - .. line-block::
               Spécifique
               selon la
               source.
       * - **title***
         - String
         - .. line-block::
               Titre du service
               de recherche
         -
         - .. line-block::
               Spécifique
               selon la
               source.

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/search/shared/sources/source.interfaces.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/source.interfaces.ts>`__


Cadastre
===============

    .. line-block::
        Le service de recherches de lots rénovés du Québec.
        Le résultat de la recherche est la géométrie du lot rénové.
        ** Pour fonctionner l'application doit avoir accès au service CPTAQ (sécurité, CORS)

Exemples

    .. code:: json

        {"cadastre": {
            "searchUrl": "https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php?"
        }}

Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 30 60
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Description
         - .. line-block::
               Valeur défaut
       * - searchUrl
         - .. line-block::
               URL du service.
         - https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php?

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Coordonnées
===============

    .. line-block::
        Le service de recherches de coordonnées permet de se localiser sous diverses structures de coordonnées.
            - Degré décimal (dd.ddd)
                - lon, lat (-68.165547, 48.644546)
                - lat, lon (48.644546, -68.165547)
            - Degré minute seconde (dd mm ss)
                - lon, lat (-68 9 56, 48 38 40)
                - lat, lon (48 38 40, -68 9 56)
            - Degré minute décimal (dd mm.mmmm)
                - lon, lat (-68 9.56, 48 38.40)
                - lat, lon (48 38.40, -68 9.567)
            - Projeté
                - -7588141.73,6214750.96         (exemple en 3857)
                - MTM-6 255760.176, 5389773.700  (exemple en MTM)
                - UTM-19 561466.861, 5388278.862 (exemple en UTM)
            - BELL
                - Lat: 48 38 40N Long: 68 9 56W UNC:100 CONF:90
            - Metre Metre (MM)
                - -111594.63, 445854.74;32198 (exemple en 32198)

        Le résultat de la recherche est la position du point ainsi qu'un lien vers Google Maps / Streetview.
        Le service est disponible par défaut dans les applications.

Exemples

      .. code:: json

            {"coordinatesreverse": {
                  "order": 1,
                  "enabled": false,
                  "available": true
            }}

Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 80
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Valeur défaut
       * - title
         - .. line-block::
               Basé sur la traduction de 2 fichiers.
               Propriété igo.geo.search.coordinates.name dans
                   - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`__
                   - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`__

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`__
    - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`__


iCherche
===============

    .. line-block::
        iCherche est un service de recherche développé
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`__
        afin de permettre des recherches textuelles sur les entités suivantes:
            - Adresses
            - Code postal
            - Routes (segments de routes)
            - Municipalités (et ancien municipalités)
            - MRC
            - Régions administratives
            - Lieux nommés
        Le contenu accessible par le service de recherche est limité au territoire québécois.
        ** Le code de iCherche peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.

Exemples

      .. code:: json

            {"icherche": {
                  "title":"ICherche",
                  "showInPointerSummary": true,
                  "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/icherche",
                  "params": {
                        "limit": "8"
                  }
            }}


Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 80
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Valeur défaut
       * - searchUrl
         - .. line-block::
               https://geoegl.msp.gouv.qc.ca/apis/icherche
       * - settings
         - `Ligne 79  <https://github.com/infra-geo-ouverte/igo2-lib/blob/56e45cdb030d39d1637ddfaf81f07e65345dcd89/packages/geo/src/lib/search/shared/sources/icherche.ts#L79>`_
       * - showInPointerSummary
         - true pour activer le bouton qui affichera les résultats de recherche au-dessus du curseur
       * - title
         - iCherche

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Doc de l'api iCherche <https://geoegl.msp.gouv.qc.ca/apis/icherche/docs>`__
    - `Code iCherche <https://github.com/infra-geo-ouverte/igo2-lib/blob/56e45cdb030d39d1637ddfaf81f07e65345dcd89/packages/geo/src/lib/search/shared/sources/icherche.ts#L42>`__
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`__


iCherche Reverse
================

    .. line-block::
        iCherche Reverse est un service de recherche développé
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`__
        afin de permettre des recherches par coordonnées / rayon sur les entités suivantes:
            - Adresses
            - Routes (segments de /routes)
            - Arrondissements (segments de routes)
            - Municipalités (et ancien municipalités)
            - MRC
            - Régions administratives
        Le contenu accessible par le service de recherche est limité au territoire québécois.
        ** Le code de iCherche Reverse peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.

Exemples

      .. code:: json

            {"icherchereverse": {
                  "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/territoires",
                  "params": {
                        "bufffer": 12
                  }
            }}


Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 80
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Valeur défaut
       * - searchUrl
         - .. line-block::
               https://geoegl.msp.gouv.qc.ca/apis/territoires
       * - settings
         - `Ligne 427 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/icherche.ts#L427>`__
       * - title
         - Territoire (Géocodage inversé)

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Doc de l'api iCherche Reverse <https://geoegl.msp.gouv.qc.ca/apis/terrAPI/docs>`__
    - `Code iCherche Reverse <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/icherche.ts#L385>`__
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`__


iLayer
================

    .. line-block::
        iLayer est un service de recherche développé par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`__
        afin de permettre des recherches de couches d'informations par mots clefs.
        Le contenu accessible par le service de recherche est limité au territoire quuébécois.

        Une fois la couche trouvée, il vous est possible de l'ajouter à la carte.

        Actuellement, les couches retournées dans le service de recherche sont des couches WMS.

        ** Le code de iLayer peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.

Exemples

      .. code:: json

            {"ilayer": {
                  "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/icherche/layers",
                        "params": {
                        "limit": 15
                  },
                  "queryFormat": {
                        "html": {
                              "urls": ["https://geoegl.msp.gouv.qc.ca/apis/ws/mffpecofor.fcgi"]
                        }
                  }
            }}


Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 80
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Valeur défaut
       * - searchUrl
         - .. line-block::
               https://geoegl.msp.gouv.qc.ca/apis/layers/search
       * - settings
         - `Ligne 93 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts#L93>`__
       * - title
         - .. line-block::
               Basé sur la traduction de 2 fichiers.
               Propriété igo.geo.search.layer.title dans
                   - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`__
                   - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`__
       * - queryFormat
         - .. line-block::
               Possibilité de définir le format par URL pour la présentation des informations lors de l'intérogation de la couche.

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code iLayer <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`__
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`__


Nominatim
================

    .. line-block::
        Nominatim est un service de recherche développé autour de la communauté
        OpenStreetMap. Il est possible de faire des recherches par mots clefs.

        Pour plus de détails:
            - `API Nominatim <https://nominatim.org/release-docs/develop/>`__

    .. note::
        Bien que la recherche par coordonnées soit disponible par Nominatim,
        IGO2 ne gère pas les appels par coordonnées vers Nominatim.


Exemples

      .. code:: json

            {"ilayer": {
                  "searchUrl": "https://nominatim.openstreetmap.org/search",
                  "params": {
                        "limit": 15
                  }
            }}


Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 80
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Valeur défaut
       * - searchUrl
         - .. line-block::
               https://nominatim.openstreetmap.org/search
       * - settings
         - `Ligne 44 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/nominatim.ts#L44>`__
       * - title
         - Nominatim (OSM)

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code Nominatim <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`__
    - `API Nominatim <https://nominatim.org/release-docs/develop/>`__
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`__


StoredQueries
================

    .. note::
        Il se veut plus des EXEMPLES qu'un réel service de recherche.

    .. line-block::
        StoredQueries est un service de recherche par mots clefs exploitant les capacités WFS 2.0. disponibles sur serveurs cartographiques comme Mapserver ou Geoserver(`Geoserver StoredQuery <https://geoserver-pdf.readthedocs.io/en/latest/services/wfs/reference.html#createstoredquery>`__)
        
Exemple 1:
        RTSS: Cette storedQueries interroge un service WMS du `Ministère du Transport du Québec <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetCapabilities>`__ qui peut retourner:
            - Route                                    ex: 138
            - Route tronçon                            ex: 13801
            - Route tronçon section (RTS)              ex: 13801110
            - Route tronçon section sous-route (RTSS)  ex: 0013801110000C
            - RTSS Chainage                            ex: 0013801110000C+12

        Elle nécessite l'envoi au serveur de 2 attributs.
            - rtss
            - chainage

        Ces 2 attributs et leurs valeurs par défault sont définies par 2 champs dans la configuration (voir l'exemple ici-bas).

Exemple 1

        .. code:: json

          {
              "storedqueries": {
                  "available": true,
                  "title": "le titre interface",
                  "searchUrl": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                  "storedquery_id": "rtss",
                  "fields": [
                      {"name": "rtss","defaultValue": "-99"},
                      {"name": "chainage","defaultValue": "0","splitPrefix": "\\+"}
                  ],
                  "resultTitle": "etiquette"
              }
          }


Exemple 2:
        Le Ministère des forêts de la faune et des parcs a développé une storedQueries qui retourne les feuillets SNRC au 250k et 20k.
        Une fois que cette storedQueries est ajoutée a la configuration IGO, il suffit alors à l'utilisateur de saisir un feuillet ou 
        un début de feuillet SNRC dans la barre de recherche IGO. (Ex: 31P08) et l'application retournera la/les géométries associées 
        aux résultats trouvés par la recherche via la storedQueries.

        Cette StoredQueries nécessite l'envoie au serveur de l'attribut: no_feuillet qui sera définit dans la configuration.


Exemple 2

        .. code:: json

          {
              "storedqueries": {
                  "available": true,
                  "title": "Feuillets SNRC",
                  "searchUrl": "/ws/mffpecofor.fcgi",
                  "storedquery_id": "sq250et20kFeuillet",
                  "fields": [
                        {"name": "no_feuillet","defaultValue": "0"}
                  ],
                  "resultTitle": "feuillet",
                  "params": {
                        "limit": 10
                  }
              }
          }



Propriétés


Seulement les propriétés spécifiques à ce service sont présentées.
      
          .. list-table::
             :widths: 10 50 10
             :header-rows: 1
      
             * - .. line-block::
                     Propriétés
               - Description
               - .. line-block::
                     Valeur défaut
             * - available
               - Active le service de recherche via les storedquery
               - false
             * - **fields***
               - .. line-block:: 
                     Liste des champs à intéroger pour la StoredQueries
                     La structure est la suivante:
                     1er attribut: {« name »: « rtss », »defaultValue »: « -99 »},
                     2e attribut : {« name »: « chainage », »defaultValue »: « 0 », »splitPrefix »: « \+ »}
                     afin de représenter le terme dans la barre de recherche:
                     0013801110000c+12

                     Attention à la syntaxe du splitPrefix. Sensible au caractère REGEX.

                     Si votre requête consiste à l’envoi d’un seul attribut, vous pouvez définir simplement un objet plutôt qu’une liste.
               - 
             * - outputFormat
               - .. line-block::
                     Référer au GetCapabilities pour découvrir les formats supportés par votre serveur.
                     Vous ne pouvez définir de GML 3.2 + compte tenu d'un `bug <https://github.com/openlayers/openlayers/pull/6400>`__  connu d'Openlayers.
               - text/xml; subtype=gml/3.1.1
             * - param
               - .. line-block:: 
                  Objet contenant les paramètres suiplémentaires à envoyer au service lors de l'apel de la storedqueries.
                  Le paramètre 'limit' peut aussi y être utilisé pour limité le nombre de résultat de recherche.
               -
             * - resultTitle
               - .. line-block::
                     Nom de l'attribut à utiliser pour le titre du résultat.
               -
             * - searchUrl
               - Url du service
               - https://ws.mapserver.transports.gouv.qc.ca/swtq
             * - **storedquery_id***
               - .. line-block::
                     Nom de la requête à demander au serveur.
               -
      


Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code Stored Queries Ligne 34 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/storedqueries.ts#L34>`__
    - `Bug Openlayers et les GML 3.2+ en WFS(StoredQueries) <https://github.com/openlayers/openlayers/pull/6400>`__
    - `Exemple d'appel StoredQueries rtss MTQ <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&REQUEST=GetFeature&STOREDQUERY_ID=rtss&rtss=0013801110000C&chainage=0&outputformat=text/xml;%20subtype=gml/3.1.1&SRSNAME=epsg:4326>`__
    - `Exemple d'appel StoredQueries feuillet SNRC MFFP <https://geoegl.msp.gouv.qc.ca/ws/mffpecofor.fcgi?REQUEST=GetFeature&STOREDQUERY_ID=sq250et20kFeuillet&service=wfs&version=2.0.0&no_feuillet=31P08>`__
    - `Décrire la requête "rtss" <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=DescribeStoredQueries&storedQuery_Id=rtss>`__


StoredQueries Reverse
=====================

    .. note::
        Il se veut plus un EXEMPLE qu'un réel service de recherche.

    .. line-block::
        StoredQueries Reverse est un service de recherche par coordonnées exploitant les capacités WFS 2.0.
        Actuellement, il interroge un service WMS du `Ministère du Transport du Québec <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetCapabilities>`__
        qui peut retourner deux limites administratives du MTQ:
            - Centre de services du MTQ
            - Direction Générale Territoriales

        Cette StoredQueries nécessite l'envoi au serveur de 2 attributs.
            - long
            - lat

        Ces 2 attributs et leurs valeurs par défault
        sont définies par 2 champs (longField et latField)
        dans la configuration (voir l'exemple ici-bas).

Exemples

      .. code:: json

            {"storedqueriesreverse": {
                  "searchUrl": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                  "storedquery_id": "lim_adm",
                  "longField": "long",
                  "latField": "lat",
                  "resultTitle": "nom_unite"
            }}


Propriétés

    Seulement les propriétés spécifiques à ce service sont présentées.

    .. list-table::
       :widths: 10 60 10
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - Description
         - .. line-block::
               Valeur défaut
       * - **latField***
         - .. line-block::
               Nom du champ à demander au server pour la latitude.
         -
       * - **longField***
         - .. line-block::
               Nom du champ à demander au server pour la longitude.
         -
       * - outputFormat
         - .. line-block::
               Référer au GetCapabilities pour découvrir les formats supportés par votre serveur.
               Vous ne pouvez définir de GML 3.2 + compte tenu d'un `bug <https://github.com/openlayers/openlayers/pull/6400>`__  connu d'Openlayers.
         - text/xml; subtype=gml/3.1.1
       * - resultTitle
         - .. line-block::
               Nom de l'attribut à utiliser pour le titre du résultat.
         -
       * - searchUrl
         - Url du service
         - https://ws.mapserver.transports.gouv.qc.ca/swtq
       * - srsname
         - .. line-block::
               SRS demandé au serveur
         - EPSG:4326
       * - **storedquery_id***
         - .. line-block::
               Nom de la requête à demander au serveur.
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code Stored Queries Reverse Ligne 273 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/storedqueries.ts#L273>`__
    - `Bug Openlayers et les GML 3.2+ en WFS <https://github.com/openlayers/openlayers/pull/6400>`__
    - `Exemple d'appel StoredQueries Reverse <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&REQUEST=GetFeature&STOREDQUERY_ID=lim_adm&long=-71.292469&lat=46.748107&outputformat=text/xml;%20subtype=gml/3.1.1&SRSNAME=epsg:4326>`__
    - `Décrire la requête "lim_adm" <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=DescribeStoredQueries&storedQuery_Id=lim_adm>`__





==============================
Intégration
==============================

    .. line-block::
        La composante intégration permet de définir une gamme d'outils aisément intégrables à l'application grâce
        aux configuration d'outils (tools).



*******************************
Outils (tools)
*******************************

    .. line-block::
        Les outils existants:
            - `about`_
            - `catalog`_
            - `catalogBrowser`_
            - `contextManager`_
            - `directions`_
            - `draw`_
            - `activeOgcFilter`_
            - `ogcFilter`_
            - `activeTimeFilter`_
            - `timeFilter`_
            - `importExport`_
            - `mapTool`_
            - `mapLegend`_
            - `mapDetails`_
            - `mapTools`_
            - `measurer`_
            - `print`_
            - `searchResults`_
            - `spatialFilter`_
            - `shareMap`_


.. _igoabout:


about
=======

    .. line-block::
        Outil générique offrant la possibilité d'informer les usagers grâce à un outil d'aide.

Exemples

        .. code:: json

            {
                "name": "about",
                "options": {
                    "html": ["<p>Voici IGO</p>", "<p>Voici la seconde ligne</p>"]
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - help-circle
       * - **name***
         - String
         -
         - about
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.about
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - html
         - String ou String[]
         - .. line-block::
               Configure le html qui sera
               présenté dans l'outil.
         - .. line-block::
               "<p>Contenu html</p>"
               ou sous forme de liste (pour les changement de lignes)
               ["<p>Contenu html de la première ligne</p>","<p>Contenu de la seconde ligne</p>"]
         - igo.integration.about.html

Liens

    - `about-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/about/about-tool>`__


.. _igocatalogtool:


catalog
===========

    .. line-block::
        Outil permettant de lister les catalogues disponibles configurés dans l'application:
            - :ref:`Configuration des catalogue <_igocatalogConfig>`.


Exemples

        .. code:: json

            {
                "name": "catalog"
                "options": {
                    "addCatalogAllowed": true,
                    "predefinedCatalogs": [
                        {
                            "id": "Gououvert3",
                            "title": "Gouvouvert3",
                            "externalProvider": true,
                            "url": "/apis/ws/igo_gouvouvert.fcgi"
                        }
                    ]
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - layers-plus
       * - **name***
         - String
         -
         - catalog
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.catalog
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - addCatalogAllowed
         - Boolean
         - .. line-block::
               Définit  si le formulaire d'ajout de 
               catalogue est disponible ou non. Les 
               catalogues ajoutés sont enregistrés 
               dans la mémoire du fureteur.
         - true/false
         - false
       * - predefinedCatalogs
         - :ref:`Catalog[] <igocatalogObject>`.
         - .. line-block::
               Liste préféfinie de catalogues
               permettant de pré-remplir un 
               menu de sélection, afin d'ajouter
               des catalogues.
         - true/false
         - false

Liens

    - `catalog-library-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-library-tool>`__
    - :ref:`Configuration des catalogue <igocatalogConfig>`.



.. _igocatalogBrowser:


catalogBrowser
===============

    .. line-block::
        Outil permettant de lister les couches d'informations du catalogue sélectionné par l'usager.
        L'outil catalogue fore dans le catalogue jusqu'à concurence de 2 niveaux hiérarchiques.
        Toutes les couches d'information doivent être dans un groupe.

Exemples

        .. code:: json

            {
                "name": "catalogBrowser",
                "options": {
                    "toggleCollapsedGroup": true
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - photo-browser
       * - **name***
         - String
         -
         - catalogBrowser
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`
         -
         - igo.integration.tools.catalog
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - toggleCollapsedGroup
         - Boolean
         - .. line-block::
               Force l'usager à entrer dans le groupe et
               d'y visualiser  les couches disponible
               avant de pouvoir ajouter le groupe
               à la carte.
               **false** = le groupe doit être ouvert avant
               de pouvoir l'ajouter à la carte
         - toggleCollapsedGroup: false
         - toggleCollapsedGroup: false


Liens

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`__

.. _igocontextManager:


contextManager
================

    .. line-block::
        Outil permettant de lister/gérer plusieurs contextes à l'intérieur d'une même application.
        Il existe un fichier de configuration définissant les contexte disponibles à l'intérieur du gestionnaire de contexte.
            - `_context.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_contexts.json>`__
        Ce dernier constitue une liste des contextes disponibles à l'intérieur du gestionnaire de contexte.

        Si un contexte est non présent dans ce fichier, il ne sera pas mis à la disposition dans l'application.
        De ce fait, le seul moyen d'y accéder est par URL.
            - ...votreDomaine/?context=nomDuContexteNonGéréParLeGestionnaireDeContexte

Exemples

        .. code:: json

            {
                "name": "contextManager",
                "options": {
                    "toolToOpenOnContextChange": "searchResults"
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - star
       * - **name***
         - String
         -
         - contextManager
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traductions.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.contexts
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - toolToOpenOnContextChange
         - String
         - .. line-block::
               Nom de l'outil a ouvrir suite au changement de contexte
         - .. line-block::
               Voir le nom des divers outils de cette section
         - .. line-block::
               Dans l'ordre `mapTools`_', `mapTool`_, `mapDetails`_ et `mapLegend`_  si ces outils sont disponibles.


Liens

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`__



.. _igodirections:


directions
===========

    .. line-block::
        Outil permettant de configurer l'outil d'itinéraire, basé sur la configuration dans l'application:
            - :ref:`Configuration des sources d'itinéraires <igoroutingsource>`.


Exemples

        .. code:: json

            {
                "name": "directions"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - directions
       * - **name***
         - String
         -
         - directions
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traductions.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.directions

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `directions-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/directions/directions-tool>`__


draw
===========

    .. line-block::
        Outil permettant de faire des dessins sur la carte. Il est aussi possible de remplacer les points dessinés par une liste d'icônes.


Exemples

        .. code:: json

            {
                "name": "draw"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - pencil
       * - **name***
         - String
         -
         - draw
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traductions.
               Si vous modifiez le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.directions

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `directions-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/draw/drawing-tool>`__


.. _igoogcFilter:

ogcFilter
===========

    .. line-block::
        Outil permettant de définir des filtres que l'utilisateur pourra appliquer sur les couches visibles dans la carte et ainsi voir
        seulement les objets géométriques (points, polygones, etc) qui correspondent aux filtres qu'il a appliqués. Les filtres peuvent être
        configurés comme des boutons ou des cases à cocher que l'utilisateur peut activer ou comme filtres avancés. Dans ce cas, c'est l'utilisateur qui doit
        saisir le champ, l'opérateur à appliquer ainsi que la valeur à filtrer.

        | ** Limitation: Disponible uniquement sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.

        | Cet outil présente toutes les couches de la carte ayant un ou plusieurs filtres configurés. Comparativement à l'outil

        activeOgcFilter qui lui présente uniquement le/les filtres de la couche active sélectionnée.

        | NB: L'activation de l'outil se fait ici via "tools", mais la configuration de chaque filtre disponible doit se faire à l'intérieur de la couche dans les contextes.
        | layer -> sourceOptions -> ogcFilters
        | Référez-vous à:  :ref:`Configuration des filtres attributaires OGC <igoOgcFilterObject>`  pour configurer les filtres au niveau des couches.


Exemples

        .. code:: json

            {
                "name": "ogcFilter",
                "icon": "filter",
                "title": "igo.integration.tools.ogcFilter"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - filter
       * - **name***
         - String
         - Le nom de l'outil
         - ogcFilter
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Pour modifiez le titre par défaut, vous devez faire la
               modification dans les fichiers de traduction locale: en-fr.json
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.ogcFilter

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `ogc-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/ogc-filter-tool>`__
    - `OGC FES <https://www.ogc.org/standards/filter>`__



.. _igoactiveogcFilter:

activeOgcFilter
===============

      Outil permettant de définir un ou plusieurs filtres sur **la couche active** de service OGC filtrable.

      Outil relatif à la couche active. Une fois activé dans "tools" l'outil sera disponible dans les outils de la couche
      sélectionnée.
      | ** Limitation: Disponible sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.

      Cet outil présente uniquement le ou les filtres qui sont applicables sur **la couche active**, comparativement à l'outil
      ogcFilter, qui lui présentera toute les couches ayant un filtre configuré. Comme cet outil présente uniquement le filtre appliqué
      sur une seule couche, la configuration classique est de ne pas présenter cet outil dans la barre verticale avec les autres outils
      de l'application et de le laisser uniquement dans les outils de la couche active.
      Pour ce faire, vous devez mettre l'outil dans "tools" et ne pas le mettre dans "toolbar"

      | NB: L'activation se fait ici via les outils, mais la configuration du filtre doit se faire à l'intérieur de la couche dans les contextes.
      | layer -> sourceOptions -> ogcFilters
      | Référez-vous à: :ref:`Configuration des filtres attributaires OGC <igoOgcFilterObject>`  pour configurer les filtres au niveau des couches.

Exemples

        .. code:: json

            {
                "name": "activeOgcFilter"
            }

Liens

    - `active-ogc-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/active-ogc-filter-tool>`__
    - `OGC FES <https://www.ogc.org/standards/filter>`__
    - `Exemple IGO-DEMO <https://infra-geo-ouverte.github.io/igo2/?context=ogcFilters&zoom=6&center=-71.93809,48.44698&invisiblelayers=*&visiblelayers=89596908775de376b7aa497efdf49d50,c2499974-5dc9-37d5-d0ba-f595690a06c7,carte_gouv_qc>`__


.. _igotimeFilter:

timeFilter
============

    .. line-block::
        Outil permettant de configurer un filtre temporel sur une couche d'un service ayant une propriété temporelle (WMS-T)
        NB: L'activation de l'outil se fait via les outils, mais la configuration de chaque filtre doit se faire à l'intérieur de la couche dans les contextes.
        layer -> sourceOptions -> timeFilter

        Référez-vous à : `Configuration filtre temporel WMS-T (timeFilter)`_  pour configurer les filtres au niveau des couches.


Exemples

        .. code:: json

            {
                "name": "timeFilter"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - history
       * - **name***
         - String
         -
         - timeFilter
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.timeFilter

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `time-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/time-filter-tool>`__


.. _igoactivetimeFilter:

activeTimeFilter
================

    .. line-block::
        Outil permettant de filtrer la couche WMS active filtrable temporellement.
        Outil relatif à la couche active. Une fois activé dans "tools" l'outil sera alors disponible dans les outils de la couche
        sélectionnée.

        Le bouton permettant de sélectionner une couche active est disponible dans les outils `mapTools`_, `mapTool`_ et `mapDetails`_.
        L'outil apparait seulement lorsque le bouton est cliqué.

        Référez-vous à : `Configuration filtre temporel WMS-T (timeFilter)`_  pour configurer les filtres au niveau des couches.

Exemples

        .. code:: json

            {
                "name": "activeTimeFilter"
            }

Liens

    - `active-time-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/active-time-filter-tool>`__



.. _igoimportExport:

importExport
==============
    .. line-block::
        Outil permettant d'importer et d'exporter des couches.
        Certaines restrictions s'appliquent:
        Import:
          - La projection doit être en EPSG:4326
          - La taille du fichier est configurable via la configuration. Voir :ref:`importExport <igoimportExport>`.Par défaut a 30Mo
          - Les shapeFiles doivent être dans un .zip

        Export:
          - Seulement les couches en WFS peuvent être exportées.


Exemples

        .. code:: json

          {
            "name": "importExport",
             "options": {
                 "selectFirstProj": false,
                 "projectionsLimitations": {
                        "projFromConfig": true,
                        "nad83": true,
                        "wgs84": true,
                        "webMercator": true,
                        "utm": true,
                        "mtm": true,
                        "utmZone": {
                              "minZone": 17,
                              "maxZone": 21
                        },
                        "mtmZone": {
                              "minZone": 4,
                              "maxZone": 10
                        }
                  },
                "importExportType": "layer",
                "importExportShowBothType": true
            }
          }

    .. line-block::
        Outil permettant d'exporter certaines couches d'informations.

        Noter que les couches WMS ne sont pas exportable.

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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - file-move
       * - **name***
         - String
         -
         - importExport
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.importExport
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - selectFirstProj
         - boolean
         - .. line-block::
               Permet de controler si la première projection rencontrée dans la liste sera sélectionnée.
         - true / false
         - false
       * - projectionsLimitations
         - {}
         - .. line-block::
               Permet de controler la liste des projections disponible dans l'outil.
         - .. line-block::
               {
               "projFromConfig": true, // Utiliser les projections définies dans la configuration
               "nad83": true, // Utiliser le NAD83
               "wgs84": true, // Utiliser le WGS84
               "webMercator": true, // Utiliser le WebMercator (EPSG:3857)
               "utm": true, // Utiliser les projections UTM
               "mtm": true, // Utiliser les projections MTM
               "utmZone": {
                 "minZone": 17, // Zone minimale UTM
                 "maxZone": 21  // Zone maximale UTM
               },
               "mtmZone": {
                 "minZone": 4, // Zone minimale MTM
                 "maxZone": 10  // Zone maximale MTM
               }}
         - .. line-block::
               {
               "projFromConfig": true,
               "nad83": true,
               "wgs84": true,
               "webMercator": true,
               "utm": true,
               "mtm": true,
               "utmZone": {
                 "minZone": 1,
                 "maxZone": 60
               },
               "mtmZone": {
                 "minZone": 1,
                 "maxZone": 10
               }}
       * - importExportType
         - String
         - .. line-block::
               Définit quel type d'exportation sera ouvert par défaut
         - .. line-block::
               layer ou context
         - .. line-block::
               layer
       * - importExportShowBothType
         - Boolean
         - .. line-block::
               Permet d'afficher ou non les 2 types d'importation ou exportation (layer ou contexte)
               Si false, le type définit précédemment, sera le seul type affiché.
               Se base sur l'option importExportType.
         - .. line-block::
               true / false
         - .. line-block::
               true

Liens

    - `import-export-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/import-export/import-export-tool>`__


.. _igomaptool:

mapTool
===============

    .. line-block::
        Outil permettant de présenter le contenu à l'aide de deux onglets distincts.
            - Carte :   Couches disponible à la carte, avec paramètres et outils permettant de gérer les couches:
                            - ordonnancement
                            - visibilité
                            - accès aux métadonnées (si disponible)
                            - accès au téléchargements des données (si disponible)
                            - filter les données (temporellement et par attributs si disponible)
                            - supression de couches
            - Gestionnaire de contexte :  Outil permettant de lister/gérer/changer de contexte à l'intérieur d'une même application.

.. note::
   Si vous voulez pouvoir filtrer des données WMS/WFS temporellement et par attributs, activez les outils
       - `activeOgcFilter`_
       - `activeTimeFilter`_

Exemples

        .. code:: json

            {
                "name": "map",
                "options": {
                    "updateLegendOnResolutionChange": false,
                    "toggleLegendOnVisibilityChange": true,
                    "expandLegendOfVisibleLayers": true,
                    "ogcButton": false,
                    "timeButton": false,
                    "queryBadge": false,
                    "layerListControls": {
                        "excludeBaseLayers": true,
                        "showToolbar": "default",
                        "keyword": "allo",
                        "sortAlpha": true,
                        "onlyVisible": true
                    }
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - map
       * - **name***
         - String
         -
         - map
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.map'
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - expandLegendOfVisibleLayers
         - Boolean
         - .. line-block::
               À l'ouverture de l'outil, sous l'onglet Carte, déroule (affiche) les légendes des couches visibles.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - ogcButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre OGC pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - queryBadge
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, affiche en superposition à l'oeil de visiblité, un "?" pour les couches interrogeable.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - timeButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre temporel pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - toggleLegendOnVisibilityChange
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, déroule (affiche) les légendes lorsque le statut de visibilité
               d'une couche passe de non-visible à visible
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - updateLegendOnResolutionChange
         - Boolean
         - .. line-block::
               Permet de rafraichir la légende à chaque changement de résolution (zoom)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerListControls
         - Object
         - .. line-block::
               Divers contrôles effectués à la liste de couches affichées dans l'interface.

                "excludeBaseLayers" = Retire les couches identifiées comme baseLayer.
                "showToolbar" = Outil permettant de contrôler la liste des couche
                                "always", "never" ou "default" = visible si 5 couches et +
                "keyword" = Mot clef filtrant la liste de couches
                "sortAlpha" = Tri la liste de couches alphabétiquement.
                "onlyVisible" = Ne garde que dans la liste de couches, les couches visible.


         - .. line-block::
               "layerListControls": {
                   "excludeBaseLayers": true,
                   "showToolbar": "always",
                   "keyword": "allo",
                   "sortAlpha": true,
                   "onlyVisible": true
                }
         - .. line-block::
               {
                  "excludeBaseLayers": false,
                  "showToolbar": "default",
                  "sortAlpha": false,
                  "onlyVisible": false
              }


Liens

    - `map-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-tool>`__


.. _igomapLegend:

mapLegend
===============

    .. line-block::
        Outil permettant de présenter le contenu de la carte sous forme de légende.
        Seul les légendes sont contenues.

        Il est possible d'ajouter une option permettant de montrer toutes les légendes de la carte
        même pour les couches non visible OU hors échelle d'affichage.


Exemples

        .. code:: json

            {
                "name": "mapLegend",
                "options": {
                    "allowShowAllLegends": true,
                    "showAllLegendsValue": true,
                    "layerAdditionAllowed": true,
                    "updateLegendOnResolutionChange": false,
                    "layerListControls": {
                        "excludeBaseLayers": true
                    }
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - format-list-bulleted-type'
       * - **name***
         - String
         -
         - mapLegend
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.legend
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - allowShowAllLegends
         - Boolean
         - .. line-block::
               Affiche un bouton permettant de montrer toutes les légendes de la carte,
               même pour les couches non visible OU hors échelle d'affichage.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - showAllLegendsValue
         - Boolean
         - .. line-block::
               SI allowShowAllLegends est permis (true), définit la valeur à l'ouverture de l'application.
               true = toutes les légendes sont affichées (même ceux non visibles à la carte)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerAdditionAllowed
         - Boolean
         - .. line-block::
               Identifie si l'ajout de couches à la carte sont permises.
               Influence les messages d'aide à l'usager
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - updateLegendOnResolutionChange
         - Boolean
         - .. line-block::
               Permet de rafraichir la légende à chaque changement de résolution (zoom)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerListControls
         - Object
         - .. line-block::
               Divers contrôles effectués à la liste de couches affichées dans l'interface.
         - .. line-block::
               {
                   "excludeBaseLayers": true // retire les couches identifiées comme baseLayer.
               }
         - .. line-block::
               {
                   "excludeBaseLayers": false
               }


Liens

    - `map-legend <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-legend>`__


.. _igomapDetails:

mapDetails
===============

    .. line-block::
        Outil permettant de présenter les couches disponible à la carte, avec paramètres et outils permettant de gérer les couches:
                            - ordonnancement
                            - visibilité
                            - accès aux métadonnées (si disponible)
                            - accès au téléchargements des données (si disponible)
                            - filter les données (temporellement et par attributs si disponible)
                            - supression de couches

.. note::
   Si vous voulez pouvoir filtrer des données WMS/WFS temporellement et par attributs, activez les outils
       - `activeOgcFilter`_
       - `activeTimeFilter`_

Exemples

        .. code:: json

            {
                "name": "mapDetails",
                "options": {
                    "layerAdditionAllowed": true,
                    "updateLegendOnResolutionChange": false,
                    "toggleLegendOnVisibilityChange": true,
                    "expandLegendOfVisibleLayers": true,
                    "ogcButton": false,
                    "timeButton": false,
                    "queryBadge": false,
                    "layerListControls": {
                        "excludeBaseLayers": true,
                        "showToolbar": "default",
                        "keyword": "allo",
                        "sortAlpha": true,
                        "onlyVisible": true
                    }
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - map
       * - **name***
         - String
         -
         - map
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.map'
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - expandLegendOfVisibleLayers
         - Boolean
         - .. line-block::
               À l'ouverture de l'outil, sous l'onglet Carte, déroule (affiche) les légendes des couches visibles.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerAdditionAllowed
         - Boolean
         - .. line-block::
               Identifie si l'ajout de couches à la carte sont permises.
               Influence les messages d'aide à l'usager
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - ogcButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre OGC pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - queryBadge
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, affiche en superposition à l'oeil de visiblité, un "?" pour les couches interrogeable.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - timeButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre temporel pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - toggleLegendOnVisibilityChange
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, déroule (affiche) les légendes lorsque le statut de visibilité
               d'une couche passe de non-visible à visible
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - updateLegendOnResolutionChange
         - Boolean
         - .. line-block::
               Permet de rafraichir la légende à chaque changement de résolution (zoom)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerListControls
         - Object
         - .. line-block::
               Divers contrôles effectués à la liste de couches affichées dans l'interface.

                "excludeBaseLayers" = Retire les couches identifiées comme baseLayer.
                "showToolbar" = Outil permettant de contrôler la liste des couche
                                "always", "never" ou "default" = visible si 5 couches et +
                "keyword" = Mot clef filtrant la liste de couches
                "sortAlpha" = Tri la liste de couches alphabétiquement.
                "onlyVisible" = Ne garde que dans la liste de couches, les couches visible.


         - .. line-block::
               "layerListControls": {
                   "excludeBaseLayers": true,
                   "showToolbar": "always",
                   "keyword": "allo",
                   "sortAlpha": true,
                   "onlyVisible": true
                }
         - .. line-block::
               {
                  "excludeBaseLayers": false,
                  "showToolbar": "default",
                  "sortAlpha": false,
                  "onlyVisible": false
              }


Liens

    - `map-details-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-details-tool>`__


.. _igomaptools:

mapTools
===============

    .. line-block::
        Outil permettant de présenter le contenu à l'aide de deux onglets distincts.
            - Carte :   Couches disponible à la carte, avec paramètres et outils permettant de gérer les couches:
                            - ordonnancement
                            - visibilité
                            - accès aux métadonnées (si disponible)
                            - accès au téléchargements des données (si disponible)
                            - filter les données (temporellement et par attributs si disponible)
                            - supression de couches
            - Légende : Légendes de la carte

.. note::
   Si vous voulez pouvoir filtrer des données WMS/WFS temporellement et par attributs, activez les outils
       - activeOgcFilter
       - activeTimeFilter

Exemples

        .. code:: json

            {
                "name": "mapTools",
                "options": {
                    "allowShowAllLegends": true,
                    "showAllLegendsValue": true,
                    "layerAdditionAllowed": true,
                    "updateLegendOnResolutionChange": false,
                    "toggleLegendOnVisibilityChange": true,
                    "expandLegendOfVisibleLayers": true,
                    "selectedTabAtOpening" : "legend",
                    "ogcButton": false,
                    "timeButton": false,
                    "queryBadge": false,
                    "layerListControls": {
                        "excludeBaseLayers": true,
                        "showToolbar": "default",
                        "keyword": "allo",
                        "sortAlpha": true,
                        "onlyVisible": true
                    }
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - map
       * - **name***
         - String
         -
         - mapTools
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.map'
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - allowShowAllLegends
         - Boolean
         - .. line-block::
               Affiche un bouton permettant de montrer toutes les légendes de la carte,
               même pour les couches non visible OU hors échelle d'affichage.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - showAllLegendsValue
         - Boolean
         - .. line-block::
               SI allowShowAllLegends est permis (true), définit la valeur à l'ouverture de l'application.
               true = toutes les légendes sont affichées (même ceux non visibles à la carte)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - expandLegendOfVisibleLayers
         - Boolean
         - .. line-block::
               À l'ouverture de l'outil, sous l'onglet Carte, déroule (affiche) les légendes des couches visibles.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerAdditionAllowed
         - Boolean
         - .. line-block::
               Identifie si l'ajout de couches à la carte sont permises.
               Influence les messages d'aide à l'usager
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - ogcButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre OGC pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - queryBadge
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, affiche en superposition à l'oeil de visiblité, un "?" pour les couches interrogeable.
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - timeButton
         - Boolean
         - .. line-block::
               Permet d'afficher le bouton filtre temporel pour les couches le permettant.
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - selectedTabAtOpening
         - String
         - .. line-block::
               Permet de définir, lors de la première ouverture de l'outil, quel onglet est ouvert.
         - .. line-block::
               'legend'
         - L'onglet Carte est ouvert par défaut.
       * - toggleLegendOnVisibilityChange
         - Boolean
         - .. line-block::
               Sous l'onglet Carte, déroule (affiche) les légendes lorsque le statut de visibilité
               d'une couche passe de non-visible à visible
         - .. line-block::
               true / false
         - .. line-block::
               true
       * - updateLegendOnResolutionChange
         - Boolean
         - .. line-block::
               Permet de rafraichir la légende à chaque changement de résolution (zoom)
         - .. line-block::
               true / false
         - .. line-block::
               false
       * - layerListControls
         - Object
         - .. line-block::
               Divers contrôles effectués à la liste de couches affichées dans l'interface.

                "excludeBaseLayers" = Retire les couches identifiées comme baseLayer.
                "showToolbar" = Outil permettant de contrôler la liste des couche
                                "always", "never" ou "default" = visible si 5 couches et +
                "keyword" = Mot clef filtrant la liste de couches
                "sortAlpha" = Tri la liste de couches alphabétiquement.
                "onlyVisible" = Ne garde que dans la liste de couches, les couches visible.


         - .. line-block::
               "layerListControls": {
                   "excludeBaseLayers": true,
                   "showToolbar": "always",
                   "keyword": "allo",
                   "sortAlpha": true,
                   "onlyVisible": true
                }
         - .. line-block::
               {
                  "excludeBaseLayers": false,
                  "showToolbar": "default",
                  "sortAlpha": false,
                  "onlyVisible": false
              }


Liens

    - `map-tools <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-tools>`__


.. _igomeasurer:

measurer
===============

    .. line-block::
        Outil permettant d'effectuer des mesures sur la carte.


Exemples

        .. code:: json

            {
                "name": "measurer"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - ruler
       * - **name***
         - String
         -
         - measurer
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.measurer

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `measurer-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/measure/measurer-tool>`__


.. _igoprint:

print
===============

    .. line-block::
        Outil permettant d'effectuer des impressions de la carte.

        Actuellemnt exclut de l'impression:
            - itinéraires
            - mesures

Exemples

        .. code:: json

            {
                "name": "print"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - printer
       * - **name***
         - String
         -
         - print
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.print

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `print-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/print/print-tool>`__


.. _igosearchResults:

searchResults
===============

    .. line-block::
        Outil permettant d'afficher les résultats effectués à l'aide de la barre de recherche

Exemples

        .. code:: json

            {
                "name": "searchResults",
                "options": {
                    "showIcons": false
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - magnify
       * - **name***
         - String
         -
         - print
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.searchResults
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - showIcons
         - Boolean
         - .. line-block::
               Permet de faire afficher ou non des icônes pour chacun des résultats de recherche.
         - .. line-block::
               true / false
         - .. line-block::
               true


Liens

    - `search-results-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/search/search-results-tool>`__


.. _igospatialFilter:

spatialFilter
===============

    .. line-block::
         Outil permettant d’appliquer un filtre sur des adresses ou des thématiques ciblées selon une zone prédéfinie ou selon une zone dessinée par l’utilisateur.

Exemples

        .. code:: json

            {
                "name": "spatialFilter",
                "options": {
                    "type": "Predefined",
                    "itemType": "Thematics",
                    "freehandDrawIsActive": true
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - selection-marker
       * - **name***
         - String
         -
         - spatialFilter
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.spatialFilter
       * - options
         - Object
         - Voir les options ici-bas.
         -
         -

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

     .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               options
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - type
         - SpatialFilterType
         - .. line-block::
               Spécifie le type de zone sur lequel le filtrage sera appliqué
         - .. line-block::
               Predefined = Zone prédéfinie (Municipalités, Arrondissements, Région administratives...)
               Polygon = Polygone dessinée par l'utilisateur
               Point = Cercle dessinée par l'utilisateur
         -
       * - itemType
         - SpatialFilterItemType
         - .. line-block::
               Spécifie le type des éléments qui seront filtrés
         - .. line-block::
               Address = Adresses provenant de la couche d'Adresses Québec
               Thematics = Données provenant de l'api terrAPI
         - Address
       * - freehandDrawIsActive
         - Boolean
         - .. line-block::
               Indique si le mode de dessin "à main levée" est actif ou non.
         - true / false
         -

Liens

    - `spatial-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/spatial-filter-tool>`__


.. _igoshareMap:


shareMap
==========

    .. line-block::
        Outil permettant de partager, à l'aide d'un lien, la carte à l'écran.

Exemples

        .. code:: json

            {
              "name": "shareMap"
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
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`__
         - share-variant
       * - **name***
         - String
         -
         - shareMap
         -
       * - title
         - String
         - .. line-block::
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`.
         -
         - igo.integration.tools.shareMap

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `context-share-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/context/context-share-tool>`__
