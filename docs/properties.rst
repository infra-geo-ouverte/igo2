---------------------
Propriétés
---------------------

==============================
Composantes géométriques (geo)
==============================

*****************************
Couches d'information (layer)
*****************************

Couche
===============

*******************************
Sources de données (datasource)
*******************************

Certaines sources de données possèdent des propriétés identiques et spécifiques.

Les spécifiques seront traitées dans les sections suivantes.

Quant au propriétés identiques, elle ne seront pas présentées ici bas.

Les propriétés communes aux sources de données: 

     - **atributions** (String) : Les droits d'auteurs lié à la couche. 
        Pour OpenStreetMap, la valeur par défaut est @OpenStreetMap 
        contributors

     - **crossOrigin** (Boolean): Permet définir l'entête de l'appel faite au serveur. Permet entre autres, d'éviter les problématiques de CORS. Référez à `réglages CORS <https://developer.mozilla.org/fr/docs/Web/HTML/Reglages_des_attributs_CORS>`_ . De manière plus commune, définir "crossOrigin": "anonymous"

Exemples

        .. code:: json

            "sourceOptions": {
                "attributions": "Droits d'auteurs que vous désirez afficher avec votre couche.",
                "crossOrigin": "anonymous"
            }


ArcGis
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


Tile ArcGis
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


Carto
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


OSM
===============

    .. line-block::
        Le fond standard OpenStreetMap. 
        Ce type de service n'est pas interrogeable.  

Exemples

        .. code:: json

            "sourceOptions": {
                "type": "osm",
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
         - osm
         - osm


Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_


Cluster
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


TMS (xyz)
===============

    .. line-block::
        Une source de données pour les services de données tuilées de type XYZ où le X et le Y représentent la position de la tuile appelée et le Z, le niveau de zoom (résolution) de la tuile.

Exemples

        .. code:: json

            "sourceOptions": {
                "url": "https://geoegl.msp.gouv.qc.ca/apis/carto/tms/1.0.0/orthos@EPSG_3857/{z}/{x}/{-y}.jpeg",
                "type": "xyz"
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
         - xyz
         - xyz
       * - **url***
         - String
         - .. line-block::
               L'URL du service tuilées
               en spécifiant la position
               des tuiles en déclarant les
               balises de remplacement:
                  - {x}
                  - {-y}
                  - {z}
               X et Y représentent la 
               position de la tuile appelée 
               tandis que le Z, le zoom.
         - 
         - 

Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_


Vector Tiles (mvt)
==================

    .. line-block::
        Une source de données pour les services de données au format Vector tiles. Plus spécifiquement, 
        au format `Mapbox Vector Tiles (MVT) <https://docs.mapbox.com/vector-tiles/specification/>`_ .

Exemples

        .. code:: json

            "sourceOptions": {
                "type": "mvt",
                "url": "https://ws.mapserver.transports.gouv.qc.ca/swtq?mode=tile&tilemode=gmap&tile={x}+{y}+{z}&layers=bgr_v_sous_route_res_inv_act&map.imagetype=mvt"
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
         - mvt
         - mvt
       * - **url***
         - String
         - .. line-block::
               L'URL du service tuilées
               en spécifiant la position
               des tuiles en déclarant les
               balises de remplacement:
                  - {x}
                  - {-y}
                  - {z}
               X et Y représentent la 
               position de la tuile appelée 
               tandis que le Z, le zoom.
         - 
         - 

Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `Mapbox Vector Tiles (MVT) <https://docs.mapbox.com/vector-tiles/specification/>`_
        - `Mapserver 7.2 + <https://mapserver.gis.umn.edu/it/development/rfc/ms-rfc-119.html>`_
        - `Geoserver <https://docs.geoserver.org/latest/en/user/extensions/vectortiles/tutorial.html>`_


Vecteur
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


Websocket
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.


WFS
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.

Exemples

        .. code:: json

            "sourceOptions": {
                  "type": "wfs",
                  "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                  "queryable": true,
                  "params": {
                        "featureTypes": "vg_observation_v_autre_wmst",
                        "fieldNameGeometry": "geometry",
                        "maxFeatures": 10000,
                        "version": "2.0.0",
                        "outputFormat": "geojson_utf8",
                        "outputFormatDownload": "shp"
                  }
            }


WMS
===============

    .. line-block::
        Une source de données pour les services de données au format `WMS <https://www.opengeospatial.org/standards/wms>`_ .
        Les diverses version WMS sont acceptés.

Exemples

        .. code:: json

            "sourceOptions": {
                "type": "wms",
                "url": "https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi",
                "params": {
                    "layers": "telephone_urg",
                    "version": "1.3.0"
                },
                "queryable": true,
                "queryFormat": "gml2",
                "queryTitle": "desclocal"
                }

Propriétés

    .. note::
       En cours de construction.

Liens

        - `WMS <https://www.opengeospatial.org/standards/wms>`_


WMTS
===============

    .. note::
       Disponible actuellement mais la documentation est en cours de construction.

