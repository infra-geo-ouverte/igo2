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

    - `igo2-lib/packages/geo/src/lib/map/shared/map.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/map/shared/map.interface.ts>`_

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
               base sont présentées
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
               utile pour bâtir le
               lien pour le partage
               de cartes.
               Attention: si vous définissez un id, la couche ajoutée par le catalogue ou par la recherche sera considérée par l'app. comme une couche différente, vous aurez donc 2 fois la même couche.
         -
         - uuid
       * - legendOptions
         - `legendOptions`_
         - .. line-block::
               Permet de définir des options sur la légende.
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
               cette valeur peut
               être récupérée.
         -
         -
       * - maxResolution
         - Number
         - .. line-block::
               Définir la résolution
               à laquelle la couche
               d'information commence
               à s'afficher.
               Intéressant pour les
               couches exigeantes à
               récupérer à très petite
               échelle (ex. 1: 5000000).

               Pour les **WMS**
               récupérant certaines
               propriétés du service,
               cette valeur peut
               être récupérée.
         -
         -
       * - metadata
         - Object{}
         - .. line-block::
               Définir la source pour les metadonnées. Lien pour le bouton i de la couche -> 'i'.
               Externe: true ira chercher les metadonnées inscrites dans la configuration du service.
         - {"extern": true}
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
               la suppression de la
               couche de la table
               des matières.
         - true false
         - true
       * - **sourceOptions***
         - .. line-block::
               - `ArcGis`_
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
         - .. line-block::
               Diverses sources de
               données sont supportées.
               Référez-vous aux
               section suivantes pour
               plus de détails.
         -
         -
       * - **title***
         - String
         - .. line-block::
               Titre de la couche
               tel qu'affiché dans
               la table des matières
               et dans les résultats
               d'interrogations.

               Pour les **WMS** et
               **WMTS** récupérant
               certaines propriétés
               du service, cette
               valeur peut y être
               récupérée et n'est plus obligatoire à ce moment.
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




Propriétés de legendOptions

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
         - Permet de modifier les noms des styles provenant du service web
         - Ex:  "stylesAvailable": [
                  { "name": "raster", "title": "pixel" },
                  { "name": "Contour", "title": "aucune couleur" }
                ]

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

     - **atributions** (String) : Les droits d'auteurs liés à la couche.
        Pour OpenStreetMap, la valeur par défaut est @OpenStreetMap
        contributors

     - **crossOrigin** (Boolean): Permet de définir l'entête de l'appel faite au serveur. Permet entre autres, d'éviter les problématiques de CORS. Référez à `réglages CORS <https://developer.mozilla.org/fr/docs/Web/HTML/Reglages_des_attributs_CORS>`_ . De manière plus commune, définir "crossOrigin": "anonymous"

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


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_


Cluster
===============

    .. note::
       Une source de données pour les données vectorielle composées de points. Elle génere des regroupements d'entité lorsque ceux-ci se retrouve près l'une de l'autre.

Exemples

        .. code:: json

            "sourceOptions": {
                "url": "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places.geojson",
                "type": "cluster",
                "distance": 50
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
               Liste des attributs exclus du
               getInfo lorsque l'application
               est en ligne.
         -
         -
       * - excludeAttributeOffline
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du
               getInfo lorsque l'application
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

    - `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_



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
               L'URL du service de données tuilées
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `igo2/src/contexts/_base.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_base.json>`_


Vector Tiles
===============

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
               L'URL du service de données tuilées
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
       * - excludeAttribute
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du
               getInfo lorsque l'application
               est en ligne.
         -
         -
       * - excludeAttributeOffline
         - Array.<String>
         - .. line-block::
               Liste des attributs exclus du
               getInfo lorsque l'application
               est hors-ligne.
         -
         -
       * - featureClass
         - String
         - .. line-block::
               Définir cette option en tant que
               'feature' pour obtenir une prise
               en charge complète de l'édition
               et de la géométrie des tuiles.
               Cette option diminue les performances
               de rendu des tuiles.

               Ne pas utiliser cette option pour
               optimiser le rendu des tuiles.
         - feature
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

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
        Une source de données pour les services de données au format `OGC WMS <https://www.opengeospatial.org/standards/wms>`_ .
        Les diverses version WMS sont acceptées.


    .. note::
        En cours de construction.

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
                "queryTitle": "desclocal",
                "optionsFromCapabilities": true
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
         - Référez-vous à : `Configuration filtre OGC (ogcFilters)`_ .
         -
       * - sourceFields
         - Object
         - .. line-block::
               Configuration des attributs du layer. (champs source de la couche)
         - Référez-vous à : `Configuration des attributs (sourceFields)`_ .
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

    - `igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/datasource/shared/datasources/wms-datasource.interface.ts>`_
    - `OGC WMS <https://www.opengeospatial.org/standards/wms>`_


WMTS
===============

    .. line-block::
        Une source de données pour les services de données au format `OGC WMTS <https://www.opengeospatial.org/standards/wmts>`_ .

Exemples

        .. code:: json

            "sourceOptions": {
                "type": "wmts",
                "url": "https://geoegl.msp.gouv.qc.ca/carto/wmts",
                "format": "image/jpeg",
                "matrixSet": "EPSG_3857",
                "layer": "orthos"
            }


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

    - `OGC WMTS <https://www.opengeospatial.org/standards/wmts>`_



************************************
Options de sources avancées
************************************

.. _igoTimeFilterObject:

Configuration filtre temporel WMS-T (timeFilter)
================================================

Exemples

        .. code:: json

            {
                  "min": "1890",
                  "max": "2019",
                  "style": "calendar",
                  "range": true,
                  "step": 63072000000,
                  "type": "year"
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
         - En fonction du type, peut être une année, une date ou une heure.
         -
       * - max
         - String
         - Periode de temps maximum.
         - En fonction du type, peut être une année, une date ou une heure.
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
  Plusieurs configuration de filtre sont disponibles. Par exemple, il est possible de créer des boutons sur lesquels l'utilisateur
  pourra appuyer pour filtrer la couche affichée, de réaliser des groupes de filtre, ou bien de donner la possibilité à l'utilisateur
  de créer lui même ces propres filtres à l'aide des filtres avancés.

    - **Limitation**: Disponible uniquement sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.
    - Les outils ogcFilter et/ou activeOgcFilter doivent être activés dans les outils ('tool'). (:ref:`igoactiveogcFilter` et :ref:`igoogcFilter` )
    - Pour activation des filtres avancés, ils est nécessaire de définir un objet sourceField. Référez-vous à: :ref:`igosourceFieldsObject`



Exemples
----------

Exemple - filtre avancé disponible à l'utilisateur avec 3 attributs filtrables et quelques valeurs diponibles chacun.

        .. code:: json

            {
                  "ogcFilters": {
                        "enabled": true,
                        "editable": true,
                        "allowedOperatorsType": "Basic"
                      },
                    "sourceFields": [
                      {"name": "reg_eco", "alias": "région ecologique", "values": ["1a", "2b", "2b", "2c", "4F","5g"]},
                      {"name": "dom_bio", "alias": "domaine bio-climatique", "allowedOperatorsType": "BasicAndSpatial"},
                      {"name": "szone_veg", "alias": "sous zone véggtation ", "values": ["Z21", "z12"]}
                    ]
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
                          "buttons": [
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


Exemple - groupe de filtre avec boutons

        .. code:: json

            {
                "ogcFilters": {
                    "enabled": true,
                    "editable": true,
                    "allowedOperatorsType": "All",
                    "pushButtons": {
                        "groups": [
                            {"title": "filtre foret","name":"1", "ids": ["type_couv", "densite"]},
                            {"title": "filtre metadonnée", "name":"2", "ids": ["no_program"]}
                        ],
                        "bundles" : [
                            {
                                "id": "type_couv",
                                "logical": "Or",
                                "buttons": [
                                  {
                                        "title": "type couv = R",
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
                                        "title": "type couv = F",
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
                                "buttons": [
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
                            {
                                "id": "no_program",
                                "logical": "Or",
                                "vertical":false,
                                "buttons": [
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
         - Paramètre relatif aux filtres avancés. Les opérateurs pour construire l'expression filtrante qui seront accessible
           à l'utilisateur.
           NB: Ce paramètre s'appliquera a tous les champs definit dans sourceField mais ce paramètre peut aussi être définit
           à l'intérieur de sourceField pour le définir au niveau du champ si besoin.
         - BasicNumericOperator, Basic, BasicAndSpatial, Spatial, All, time.
         - BasicAndSpatial
       * - editable
         - Boolean
         - Active ou non la possibilité à l'utilisateur de ce construire des filtres avancés.
         - true | false
         - true
       * - enabled
         - Boolean
         - Active ou non les filtres modifiable par l'utilisateur sur la couche. Si = false, le bouton de filtre n'apparait plus.
           Par exemple dans le cas que le pilote voudrait filtrer une couche mais que ce filtre ne soit pas modifiable par l'utilisateur.
         - true | false
         - true
       * - filters
         - IgoLogicalArrayOptions | AnyBaseOgcFilterOptions;
         - Permet de définir un filtre avancé. :ref:`igoOgcFilterFiltersObject`
         -
         -
       * - pushButtons
         - PushButton
         - Permet de définir des boutons poussoirs qui pouront être activés par l'utilisateur pour appliquer des filtres voulus.
           :ref:`igoOgcFilterPushButtons`
         -
         -


    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens

    - `ogc-filter.interface.ts<https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/filter/shared/ogc-filter.interface.ts>`_



.. _igoOgcFilterPushButtons:
Propriétés de l'objet ogcFilter.pushButtons.groups

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
         - Liste des identifiants pour le classement des paquets("bundled") de boutons dans les groupes.
         -
         -
       * - title
         - String
         - Le titre du groupe qui apparaitra à l'utilisateur.
         -
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

.. _igoOgcFilterButtonsBundlesObject:
Propriétés de l'objet ogcFilter.pushButtons.bundles

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
       * - buttons
         - OgcPushButton[]
         - Liste de boutton
         -
         -
       * - **id***
         - String
         - Id rataché au groupe pour le classement dans le groupe. Doit être présente et identique dans
         ogcFilter.pushButtons.groups.ids
         -
         -
       * - **logical***
         - String
         - Opérateur logique à appliquer entre les boutons lorsque plusieurs boutons seront activés. "ET", "OU"
         - Or, And
         - Doit être définit
       * - vertical
         - Boolean
         - Indique si la disposition des boutons dans la fenetre se fait de manière verticale
         - true | false
         -

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


.. _igoOgcFilterButtonsButtonsObject:
Propriétés de l'objet ogcFilter.pushButtons.bundles.buttons

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
         - Configuration de l'expression filtrante appliquée sur l'activation du bouton. Voir :ref:`igoOgcFilterFiltersObject`.
         -
         -
       * - title
         - String
         - Indique ce qu'il y aura d'inscrit sur le bouton.
         -
         - " " blanc
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
         - Opérateurs à appliquer
         - PropertyIsEqualTo - ...
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


.. _igosourceFieldsObject:

Configuration des attributs champs source de donnée (sourceFields)
======================================================================

Une liste de nom d'attribut, de leur alias, valeurs permises et autres configurations.
** Nécessaire pour utilisation des filtres attributaires avancés. Ce sont ces configurations qui définiront ce qui sera
présentées à l'utilisateur lors de l'utilisation des filtres avancés.

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
               BasicNumericOperator OU Basic OU BasicAndSpatial OU Spatial OU All OU Time
               Référez vous à `ce lien <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/filter/shared/ogc-filter.ts#L291>`_ pour les opérateurs correspondants.
         - BasicAndSpatial

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


************************************
Sources de recherche (search-source)
************************************

    Description


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

        Selon votre contexte, les sources de recherche ayant une limitation au Québec,
        peuvent être utilisées comme exemple afin d'adapter votre propre service de recherche.


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

    - `igo2-lib/packages/geo/src/lib/search/shared/sources/source.interfaces.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/source.interfaces.ts>`_


Cadastre
===============

    .. line-block::
        Le service de recherches de lots rénovés du Québec.
        Le résultat de la recherche est la géométrie du lot rénové.
        ** Pour fonctionner l'application doit avoir accès au service CPTAQ (sécurité, CORS)

Exemples

    .. code:: json

        "cadastre": {
            "searchUrl": "https://carto.cptaq.gouv.qc.ca/php/find_lot_v1.php?"
        }

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
            - Degré décimal
                - lon, lat (-68.165547, 48.644546)
                - lat, lon (48.644546, -68.165547)
            - Projeté
                - -7588141.73,6214750.96       (exemple en 3857)
            - À compléter

        Le résultat de la recherche est la position du point, un lien vers Google Maps / Streetview.
        Le service est disponible par défaut dans les applications.

Exemples

    .. code:: json

        "coordinatesreverse": {
            "order": 1,
            "enabled": false,
            "available": true
        }

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
                   - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`_
                   - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`_

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`_
    - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`_


iCherche
===============

    .. line-block::
        iCherche est un service de recherche développé
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_
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

            "icherche": {
                "title":"ICherche",
                "showInPointerSummary": true,
                "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/icherche",
                "params": {
                    "limit": "8"
                 }
            }

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

    - `Doc de l'api iCherche <https://geoegl.msp.gouv.qc.ca/apis/icherche/docs>`_
    - `Code iCherche <https://github.com/infra-geo-ouverte/igo2-lib/blob/56e45cdb030d39d1637ddfaf81f07e65345dcd89/packages/geo/src/lib/search/shared/sources/icherche.ts#L42>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


iCherche Reverse
================

    .. line-block::
        iCherche Reverse est un service de recherche développé
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_
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

            "icherchereverse": {
                "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/territoires",
                "params": {
                    "bufffer": 12
                 }
            }

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
         - `Ligne 427 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/icherche.ts#L427>`_
       * - title
         - Territoire (Géocodage inversé)

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Doc de l'api iCherche Reverse <https://geoegl.msp.gouv.qc.ca/apis/terrAPI/docs>`_
    - `Code iCherche Reverse <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/icherche.ts#L385>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


iLayer
================

    .. line-block::
        iLayer est un service de recherche développé par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_
        afin de permettre des recherches de couches d'informations par mots clefs.
        Le contenu accessible par le service de recherche est limité au territoire quuébécois.

        Une fois la couche trouvée, il vous est possible de l'ajouter à la carte.

        Actuellement, les couches retournées dans le service de recherche sont des couches WMS.

        ** Le code de iLayer peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.

Exemples

        .. code:: json

            "ilayer": {
                "searchUrl": "https://geoegl.msp.gouv.qc.ca/apis/icherche/layers",
                "params": {
                    "limit": 15
                 },
                "queryFormat": {
                  "html": {
                      "urls": ["https://geoegl.msp.gouv.qc.ca/apis/ws/mffpecofor.fcgi"]
                  }
                }
            }

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
         - `Ligne 93 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts#L93>`_
       * - title
         - .. line-block::
               Basé sur la traduction de 2 fichiers.
               Propriété igo.geo.search.layer.title dans
                   - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`_
                   - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`_
       * - queryFormat
         - .. line-block::
               Possibilité de définir le format par URL pour la présentation des informations lors de l'intérogation de la couche.

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code iLayer <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


Nominatim
================

    .. line-block::
        Nominatim est un service de recherche développé autour de la communauté
        OpenStreetMap. Il est possible de faire des recherches par mots clefs.

        Pour plus de détails:
            - `API Nominatim <https://nominatim.org/release-docs/develop/>`_

    .. note::
        Bien que la recherche par coordonnées soit disponible par Nominatim,
        IGO2 ne gère pas les appels par coordonnées vers Nominatim.


Exemples

        .. code:: json

            "ilayer": {
                "searchUrl": "https://nominatim.openstreetmap.org/search",
                "params": {
                    "limit": 15
                 }
            }

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
         - `Ligne 44 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/nominatim.ts#L44>`_
       * - title
         - Nominatim (OSM)

    Pour les autres propriétés, référez-vous à `Source (base commune)`_ .

Liens

    - `Code Nominatim <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`_
    - `API Nominatim <https://nominatim.org/release-docs/develop/>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


StoredQueries
================

    .. note::
        Il se veut plus un EXEMPLE qu'un réel service de recherche.

    .. line-block::
        StoredQueries est un service de recherche par mots clefs exploitant les capacités WFS 2.0.
        Actuellement, il interroge un service WMS du `Ministère du Transport du Québec <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetCapabilities>`_
        qui peut retourner:
            - Route                                    ex: 138
            - Route tronçon                            ex: 13801
            - Route tronçon section (RTS)              ex: 13801110
            - Route tronçon section sous-route (RTSS)  ex: 0013801110000C
            - RTSS Chainage                            ex: 0013801110000C+12

        Cette StoredQueries nécessite l'envoi au serveur de 2 attributs.
            - rtss
            - chainage

        Ces 2 attributs et leurs valeurs par défault
        sont définies par 2 champs dans la configuration
        (voir l'exemple ici-bas).

Exemples

        .. code:: json

            "storedqueries": {
                "searchUrl": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                "storedquery_id": "rtss",
                "fields": [
                  {"name": "rtss","defaultValue": "-99"},
                  {"name": "chainage","defaultValue": "0","splitPrefix": "\\+"}
                ],
                "resultTitle": "etiquette"
            }

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
       * - **fields***
         - .. line-block::
               Liste des champs à interroger pour la StoredQueries.
               La structure est la suivante:
               1er attribut: {"name": "rtss","defaultValue": "-99"},
               2e attribut : {"name": "chainage","defaultValue": "0","splitPrefix": "\\+"}
               afin de représenter le terme dans la barre de recherche:
               0013801110000c+12

               Attention à la syntaxe du splitPrefix. Sensible au caractère REGEX.

               Si votre requête consiste à l'envoi d'un seul attribut, vous pouvez définir
               simplement un objet plutôt qu'une liste.
         -
       * - outputFormat
         - .. line-block::
               Référer au GetCapabilities pour découvrir les formats supportés par votre serveur.
               Vous ne pouvez définir de GML 3.2 + compte tenu d'un `bug <https://github.com/openlayers/openlayers/pull/6400>`_  connu d'Openlayers.
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

    - `Code Stored Queries Ligne 34 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/storedqueries.ts#L34>`_
    - `Bug Openlayers et les GML 3.2+ en WFS <https://github.com/openlayers/openlayers/pull/6400>`_
    - `Exemple d'appel StoredQueries <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&REQUEST=GetFeature&STOREDQUERY_ID=rtss&rtss=0013801110000C&chainage=0&outputformat=text/xml;%20subtype=gml/3.1.1&SRSNAME=epsg:4326>`_
    - `Décrire la requête "rtss" <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=DescribeStoredQueries&storedQuery_Id=rtss>`_


StoredQueries Reverse
=====================

    .. note::
        Il se veut plus un EXEMPLE qu'un réel service de recherche.

    .. line-block::
        StoredQueries Reverse est un service de recherche par coordonnées exploitant les capacités WFS 2.0.
        Actuellement, il interroge un service WMS du `Ministère du Transport du Québec <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=1.1.0&request=GetCapabilities>`_
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

            "storedqueriesreverse": {
                "searchUrl": "https://ws.mapserver.transports.gouv.qc.ca/swtq",
                "storedquery_id": "lim_adm",
                "longField": "long",
                "latField": "lat",
                "resultTitle": "nom_unite"
            }

Propriétés

    Seulement les propriétés spécifique à ce service sont présentées.

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
               Vous ne pouvez définir de GML 3.2 + compte tenu d'un `bug <https://github.com/openlayers/openlayers/pull/6400>`_  connu d'Openlayers.
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

    - `Code Stored Queries Reverse Ligne 273 <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/storedqueries.ts#L273>`_
    - `Bug Openlayers et les GML 3.2+ en WFS <https://github.com/openlayers/openlayers/pull/6400>`_
    - `Exemple d'appel StoredQueries Reverse <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&REQUEST=GetFeature&STOREDQUERY_ID=lim_adm&long=-71.292469&lat=46.748107&outputformat=text/xml;%20subtype=gml/3.1.1&SRSNAME=epsg:4326>`_
    - `Décrire la requête "lim_adm" <https://ws.mapserver.transports.gouv.qc.ca/swtq?service=wfs&version=2.0.0&request=DescribeStoredQueries&storedQuery_Id=lim_adm>`_





==============================
Intégration
==============================

    .. line-block::
        La composante intégration permet de définir
        une gamme d'outils aisément intégrables à l'application grâce
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
                    "html": "<p>Voici IGO</p>" // ou ["<p>Voici IGO</p>", "<p>Voici la seconde ligne</p>"]
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
               Valeur défaut
       * - icon
         - String
         - Icône dans la barre d'outil
         - `MDI <https://materialdesignicons.com/>`_
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

    - `about-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/about/about-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.

Liens

    - `catalog-library-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-library-tool>`_
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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`_

.. _igocontextManager:


contextManager
================

    .. line-block::
        Outil permettant de lister/gérer plusieurs contextes à l'intérieur d'une même application.
        Il existe un fichier de configuration définissant les contexte disponibles à l'intérieur du gestionnaire de contexte.
            - `_context.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_contexts.json>`_
        Ce dernier constitue une liste des contextes disponibles à l'intérieur du gestionnaire de contexte.

        Si un contexte est non présent dans ce fichier, il ne sera pas mis à la disposition dans l'application.
        De ce fait, le seul moyen d'y accéder est par URL.
            - http://votreDomaine/?context=nomDuContexteNonGéréParLeGestionnaireDeContexte

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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`_



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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `directions-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/directions/directions-tool>`_


.. _igoogcFilter:

ogcFilter
===========

    .. line-block::
      Outil permettant de définir des filtres que l'utilisateur pourra appliquer sur les couches visibles dans la carte et ainsi voir
      seulement les objets géométriques(points, polygones, etc) qui correspondent aux filtres qu'il a appliqués. Les filtres peuvent être
      configurés comme des boutons que l'utilisateur peut activer ou comme filtres avancés, dans ce cas c'est l'utilisateur qui doit
      saisir le champ, l'opérateur à appliquer ainsi que la valeur à filtrer.

      ** Limitation: Disponible uniquement sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.

      Cet outil présente toutes les couches de la carte ayant un ou plusieurs filtres configurés. Comparativement à l'outil
      activeOgcFilter qui lui présente uniquement le/les filtres de la couche active sélectionnée.

      NB: L'activation de l'outil se fait ici via "tools", mais la configuration de chaque filtre disponible doit se faire à l'intérieur
      de la couche dans les contextes.
         layer -> sourceOptions -> ogcFilters
         Référez-vous à : `Configuration filtre OGC (ogcFilters)`_  pour configurer les filtres au niveau des couches.


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `ogc-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/ogc-filter-tool>`_
    - `OGC FES <https://www.ogc.org/standards/filter>`_



.. _igoactiveogcFilter:

activeOgcFilter
===============

    .. line-block::
      Outil permettant de définir un ou plusieurs filtres sur **la couche active** de service OGC filtrable.

      Outil relatif à la couche active. Une fois activé dans "tools" l'outil sera disponible dans les outils de la couche
      sélectionnée.
      ** Limitation: Disponible sur des couches de type WFS ou WMS produite par mapServer 7.2 et+ ou geoserver.

      Cet outil présente uniquement le ou les filtres qui sont applicables sur la couche **active**, comparativement à l'outil
      ogcFilter, qui lui présentera toute les couches ayant un filtre configuré. Comme cet outil présente uniquement le filtre appliqué
       sur une seule couche, la configuration classique est de ne pas présenter cet outil dans la barre verticale avec les autres outils
        de l'application et de le laisser uniquement dans les outils de la couche active.
        Pour ce faire, vous devez mettre l'outil dans "tools" et ne pas le mettre dans "toolbar"

      NB: L'activation se fait ici via les outils, mais la configuration du filtre doit se faire à l'intérieur
      de la couche dans les contextes.
         layer -> sourceOptions -> ogcFilters
         Référez-vous à : `Configuration filtre OGC (ogcFilters)`_  pour configurer les filtres au niveau des couches.

Exemples

        .. code:: json

            {
                "name": "activeOgcFilter"
            }

Liens

    - `active-ogc-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/active-ogc-filter-tool>`_
    - `OGC FES <https://www.ogc.org/standards/filter>`_
    - `Exemple IGO-DEMO <https://infra-geo-ouverte.github.io/igo2/?context=ogcFilters&zoom=6&center=-71.93809,48.44698&invisiblelayers=*&visiblelayers=89596908775de376b7aa497efdf49d50,c2499974-5dc9-37d5-d0ba-f595690a06c7,carte_gouv_qc>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `time-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/time-filter-tool>`_


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

    - `active-time-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/active-time-filter-tool>`_



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
            "name": "importExport"
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
         - `MDI <https://materialdesignicons.com/>`_
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

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `import-export-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/import-export/import-export-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `map-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `map-legend <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-legend>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `map-details-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-details-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `map-tools <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/map/map-tools>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `measurer-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/measure/measurer-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `print-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/print/print-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `search-results-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/search/search-results-tool>`_


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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `spatial-filter-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/filter/spatial-filter-tool>`_


.. _igoshareMap:


shareMap
==========

    .. line-block::
        Outil permettant de partager, à l'aide d'un lien, la carte à l'écran.

Exemples

        .. code:: json

            {
              "name": "shareMap",
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
         - `MDI <https://materialdesignicons.com/>`_
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

    - `context-share-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/context/context-share-tool>`_
