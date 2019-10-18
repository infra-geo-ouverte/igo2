---------------------
Propriétés
---------------------

==============================
Composantes géométriques (geo)
==============================

*****************************
Couche d'information (layer)
*****************************

    .. line-block::
        Permet de définir une liste de couches d'informations disponible à l'usager lors de l'ouverture de l'application.
        L'ordre d'apparition des couches dans la table des matières peut être controlée de divers moyens:
            1- l'ordre d'apparition des couches dans le contexte. Plus la couche est au début de la liste, plus elle sera au bas de la table des matière.
            2- La propriété zIndex de chaque couche d'information. Plus le zIndex et élevé, plus la couche sera au haut de la table des matières.

Exemples

        .. code:: json

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
               Définir si la couche 
               doit être considérée 
               comme une couche de 
               base. Les couches de
               base sont présentés 
               dans le "baselayer"
               switcher dans le coin
               inférieur gauche et
               peuvent être exclues
               visuellement de la
               table des matières.
         - .. line-block::
               true
               false
         - false
       * - id
         - string
         - .. line-block::
               Identifiant unique 
               de la couche à 
               l'échelle de 
               l'application. 
               Particulièrement
               utile pour batir le
               lien pour le partage
               de cartes.
         -                
         - uuid
       * - legendOptions
         - legendOptions
         - .. line-block::
               En construction
         -                
         - 
       * - minResolution
         - Number
         - .. line-block::
               Définir la résolution 
               à laquelle la couche
               d'information arrête
               de s'afficher.

               Pour les **WMS** 
               récupérant certaines
               propriétés du service,
               cette valeur est peut
               être récupérée.
         - 
         -   
       * - maxResolution
         - Number
         - .. line-block::
               Définir la résolution 
               à laquelle la couche
               d'information commence
               de s'afficher. 
               Intéressant pour les 
               couches exigeantes à 
               récupérer à très petite 
               échelle (ex. 1: 5000000).

               Pour les **WMS** 
               récupérant certaines
               propriétés du service,
               cette valeur est peut
               être récupérée. 
         - 
         -     
       * - opacity
         - Number
         - .. line-block::
               Définir la 
               transparence de la couche.
               0 = invisible 
               1 = aucune transparence
               Également controlable
               par l'interface.
         - de 0.0 à 1.0
         - 1 
       * - showInLayerList
         - Boolean
         - .. line-block::
               Autoriser/Bloquer
               la supression de la 
               couche de la table
               des matières.
         - true false
         - true
       * - **sourceOptions***
         - .. line-block::
               - `ArcGis`_.
               - `Tile ArcGis`_.
               - `Carto`_.
               - `OSM`_.
               - `Cluster`_.
               - `TMS (xyz)`_.
               - `Vector Tiles (mvt)`_.
               - `Vecteur`_.
               - `Websocket`_.
               - `WFS`_.
               - `WMS`_.
               - `WMTS`_.
               - `ArcGis`_.
         - .. line-block::
               Divers sources de 
               données sont supportées.
               Référez vous aux 
               section suivantes pour
               plus de détails.
         - 
         - 
       * - **title***
         - String
         - .. line-block::
               Titre de la couches
               tel qu'affiché dans 
               la table des matières
               et dans les résultats 
               d'interrogations.

               Pour les **WMS** et 
               **WMTS** récupérant 
               certaines propriétés
               du service, cette 
               valeur est peut être
               récupérée.
         - 
         - 
       * - visible
         - Boolean
         - .. line-block::
               Visibilité de la
               couche à l'ouverture
               de la thématique.
         - true false
         - true
       * - zIndex
         - Number
         - .. line-block::
               Ordre dans la table
               des matières. Plus 
               le nombre est élevé,
               plus la couche apparait
               au haut de la table
               des matières. Si absent,
               l'ordre dans le 
               contexte.json fait office 
               d'ordonnancement.
         - 
         - 
 
    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

        - `igo2-lib/packages/geo/src/lib/layer/shared/layers/layer.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/layer/shared/layers/layer.interface.ts>`_



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

