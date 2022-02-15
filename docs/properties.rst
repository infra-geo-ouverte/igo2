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
                    "maxZoomOnExtent":15,
                    "maxLayerZoomExtent": [-10000000, 5000000, 6000000, 9500000]
                }
              }
          }


Propriétés de l'objet "view" de map

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
    
    .. csv-table::
       :file: _tables/fr/properties/map-view.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
        
    .. csv-table::
       :file: _tables/fr/properties/layer.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/legendOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

        Permet de définir si une source possèdera une table d'attribut dans l'application ainsi que ses propriétés associées.

Exemples

      .. code:: json

            {"workspace": {
                  "enabled": true,
                  "minResolution": 0,
                  "maxResolution": 400,
                  "noQueryOnClickInTab": true,
                  "noMapQueryOnOpenTab": true
            }}

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/workspaceOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/linkedLayersOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.


.. _LayersLinkProperties:

Propriétés de LayersLinkProperties

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/layersLinkProperties.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sourceOptions-common.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/osm.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/cluster.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/tms.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/mvt.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/websocket.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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
        NB: Il est possible de combiner une couche WMS et WFS en ajoutant les parametres WFS à l'intérieur.


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/wms.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Paramètre (params) WMS

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/wms-params.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

    Pour les propriétés dpi, map_resolution et format_options, les 3 paramètres
    sont envoyés au serveur en tout temps pour éviter les erreurs de conversion
    d'échelle. La décision de faire l'appel des 3 paramètres en simultané est
    basé sur le fait que QGIS procède de la même manière.


Liens

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts>`__
    - `OGC WMS <https://www.opengeospatial.org/standards/wms>`__


WMS avec WFS combinés
======================


    .. note::

       Disponible actuellement mais la documentation est en cours de construction.
    
    .. line-block::

        Il est possible de combiner un wms et à partir d'une certaine échelle d'apeller la couche en WFS si le service web offre les 2 options.

        ** Attention le champ ID du service doit être bien définie car ce sera ce champ qui servira a reconnaitre chaque entitée WFS, par exemple dans 
        la table attributaire. Si le champ id n'est pas bien définie dans le service ou que vous configurez une sortie dans un type ou ID n'est
        pas présent au 1er niveau de l'objet dans le retour du service (geojson, GML, etc), vous pourez avoir des problèmes d'entitées qui sont dédoublées.


Exemples

        .. code:: json

           {"title": "WMS with underlying WFS params",
                "visible": true,
                "maxResolution": 1200,
                "workspace": {
                    "enabled": true,
                    "maxResolution": 100
                },
                "sourceOptions": {
                    "queryable": true,
                    "queryTitle": "nometablis",
                    "type": "wms",
                    "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                    "urlWfs": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                    "params": {
                        "layers": "etablissement_mtq"
                    },
                    "paramsWFS": {
                        "featureTypes": "etablissement_mtq",
                        "fieldNameGeometry": "geometry",
                        "maxFeatures": 5000,
                        "combineLayerWFSMapQuerySameAsWms": true
                    },
                    "ogcFilters": {
                        "enabled": true,
                        "editable": true
                    }
                }
            }


Paramètre spécifique couches WMS-WFS combinées - paramsWFS 

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sources/wms-wfs-params.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.


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

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
                
    .. csv-table::
          :file: _tables/fr/properties/sources/wmts.csv
          :header-rows: 1
          :widths: 10 10 30 15 10
        

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

     .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
                
    .. csv-table::
          :file: _tables/fr/properties/filter/timeFilter.csv
          :header-rows: 1
          :widths: 10 10 30 15 10

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

Exemple - filtre temporel en mode année

        .. code:: json

            {
                  "filters" :{
                        "operator": "During",
                        "propertyName": "annee_date",
                        "begin": "1890-01-01T00:00:00-05:00",
                        "end": "2021-12-31T00:00:00-05:00",
                        "restrictedToStep": false,
                        "calendarModeYear": true
                    } 
                  "stepDate": "P1Y"
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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/ogcFilters.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens

    - `ogc-filter.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/filter/shared/ogc-filter.interface.ts>`__


.. _igoOgcFilterPushButtons:

Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.selectorType

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/buttons-selectorType.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

.. _igoOgcFilterPushButtons:

Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.groups

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/buttons-groups.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


.. _igoOgcFilterButtonsBundlesObject:


Propriétés de l'objet ogcFilter.{pushButtons/checkboxes/radioButtons}.bundles

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/buttons-groups.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterButtonsButtonsObject:

Propriétés de l'objet ogcFilter.{selector}.bundles.selector

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/buttons-bundles-selector.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterFiltersObject:

Propriétés de l'objet filters (IgoLogicalArrayOptions|AnyBaseOgcFilterOptions)

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/igoOgcFilterFiltersObject.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igoogcfilterduringoptions:


Propriétés de l'objet filter de type **During**

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/filter/igoogcfilterduringoptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igosourceFieldsObject:

Configuration des attributs champs source de donnée (sourceFields)
======================================================================

| Une liste de nom d'attribut, de leur alias, valeurs permises et autres configurations.
| ** Nécessaire pour utilisation des filtres attributaires avancés et de l'outil d'édition. Ce sont ces configurations qui définiront ce qui sera
| présenté à l'utilisateur lors de l'utilisation des filtres avancés et de la table d'édition.

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/sourceFields.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igosEditionObject:

Configuration de l'édition d'une couche
======================================================================

| Une liste de configuration permettant l'utilisation de la table d'édition sur la couche.
| ** Les sourceFields permettront de définir les champs à visualiser ainsi que les formats de saisies
| et les validations attributaires.

Exemples

        .. code:: json

            {
                "enabled": true,
                "baseUrl": "odrsi_vehicule_ssi",
                "addUrl": "",
                "deleteUrl": "id_vehicule=eq.",
                "modifyUrl": "id_vehicule=eq.",
                "geomType": "Point",
                "addWithDraw": false,
                "messages": [{ "odrsi_vehicule_ssi_unique_no_vehicule": "Le numéro de véhicule doit être unique pour la caserne." }]
            }


Propriétés de l'objet edition

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/edition.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

Propriétés de l'objet relations

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/relations.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/common.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/cadastre.csv
       :header-rows: 1
       :widths: 10 10 30 15

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

    .. tabularcolumns:: |p{3cm}|p{12cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/coord.csv
       :header-rows: 1
       :widths: 10 80

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

    .. tabularcolumns:: |p{3cm}|p{12cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/iCherche.csv
       :header-rows: 1
       :widths: 10 80

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

    .. tabularcolumns:: |p{3cm}|p{12cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/iChercheReverse.csv
       :header-rows: 1
       :widths: 10 80

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

    .. tabularcolumns:: |p{3cm}|p{12cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/iLayer.csv
       :header-rows: 1
       :widths: 10 80

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

    .. tabularcolumns:: |p{3cm}|p{12cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/nominatim.csv
       :header-rows: 1
       :widths: 10 80

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
      
    .. tabularcolumns:: |p{1cm}|p{7cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/storedQueries.csv
       :header-rows: 1
       :widths: 10 60 10

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

    .. tabularcolumns:: |p{1cm}|p{7cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/search/storedQueriesReverse.csv
       :header-rows: 1
       :widths: 10 60 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/about.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/aboutOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/catalog.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/catalogOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/catalogBrowser.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/catalogBrowserOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/contextManager.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/contextManagerOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/directions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/draw.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/ogcFilter.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/timeFilter.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/importExport.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/importExportOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapTool.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapToolOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapLegend.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
                
    .. csv-table::
       :file: _tables/fr/properties/tools/mapLegendOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapDetails.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapDetailsOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapTools.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/mapToolsOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/measurer.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `measurer-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/measure/measurer-tool>`__


.. _igoprint:

print
===============

    .. line-block::

        Outil permettant d'effectuer des impressions de la carte.

Exemples

        .. code:: json

            {
                "name": "print"
            }

Propriétés

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/print.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/searchResults.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/searchResultsOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10


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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/spatialFilter.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Options

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/spatialFilterOptions.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

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

    .. tabularcolumns:: |p{1cm}|p{2cm}|p{7cm}|p{2cm}|p{2cm}|
            
    .. csv-table::
       :file: _tables/fr/properties/tools/shareMap.csv
       :header-rows: 1
       :widths: 10 10 30 15 10

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `context-share-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/context/context-share-tool>`__
