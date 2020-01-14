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

    .. note::
       En cours de construction.


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
               - `ArcGis`_
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


Vector Tiles
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
        Les exemples seront présentées pour chacune des sources de recherche. 

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
               Paramètres supplémentaire 
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

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `igo2-lib/packages/geo/src/lib/search/shared/sources/source.interfaces.ts <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/source.interfaces.ts>`_


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

    Seulement les propriétés spécifique à ce service sont présentées.

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
    
    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

Liens

    - `en.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/en.geo.json>`_
    - `fr.geo.json  <https://github.com/infra-geo-ouverte/igo2-lib/blob/eaa7565fd0cfbc66eefcae6906489cb30ad11e50/packages/geo/src/locale/fr.geo.json>`_   


iCherche
===============

    .. line-block::
        iCherche est un service de recherche développé 
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_  
        afin de permettre des recherche textuelles sur les entités suivantes:
            - Adresses
            - Code postal
            - Routes (segments de routes)
            - Municipalités (et ancien municipalités)
            - MRC
            - Régions administratives
            - Lieux nommés 
        Le contenu accessible par le service de recherche est limité au territoire quuébécois. 
        ** Le code de iCherche peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.
            
Exemples

        .. code:: json

            "icherche": {
                "searchUrl": 'https://geoegl.msp.gouv.qc.ca/apis/icherche',
                "params": {
                    "limit": '8'
                 }
            }

Propriétés

    Seulement les propriétés spécifique à ce service sont présentées.

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
       * - title
         - iCherche

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

Liens

    - `Code iCherche <https://github.com/infra-geo-ouverte/igo2-lib/blob/56e45cdb030d39d1637ddfaf81f07e65345dcd89/packages/geo/src/lib/search/shared/sources/icherche.ts#L42>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


iCherche Reverse
================

    .. line-block::
        iCherche Reverse est un service de recherche développé 
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_  
        afin de permettre des recherche par coordonnées / rayon sur les entités suivantes:
            - Adresses
            - Routes (segments de routes)
            - Arrondissement (segments de routes)         
            - Municipalités (et ancien municipalités)
            - MRC
            - Régions administratives
        Le contenu accessible par le service de recherche est limité au territoire quuébécois. 
        ** Le code de iCherche Reverse peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.
            
Exemples

        .. code:: json

            "icherchereverse": {
                "searchUrl": 'https://geoegl.msp.gouv.qc.ca/apis/territoires',
                "params": {
                    "bufffer": 12
                 }
            }

Propriétés

    Seulement les propriétés spécifique à ce service sont présentées.

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

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

Liens

    - `Code iCherche Reverse <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/icherche.ts#L385>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


iLayer
================

    .. line-block::
        iLayer est un service de recherche développé 
        par le `Ministère de la Sécurité Publique du Québec <https://www.securitepublique.gouv.qc.ca>`_  
        afin de permettre des recherche de couches d'information par mot clef.
        Le contenu accessible par le service de recherche est limité au territoire quuébécois. 
        
        Une fois la couche trouvée, il vous est possible de l'ajouter à la carte.

        Actuellement, les couches retournées dans le service de recherche sont des couches WMS.

        ** Le code de iLayer peut être utilisé comme exemple afin d'adapter votre propre service de recherche textuel.
            
Exemples

        .. code:: json

            "ilayer": {
                "searchUrl": 'https://geoegl.msp.gouv.qc.ca/apis/layers/search',
                "params": {
                    "limit": 15
                 }
            }

Propriétés

    Seulement les propriétés spécifique à ce service sont présentées.

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

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

Liens

    - `Code iLayer <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


Nominatim
================

    .. line-block::
        Nominatim est un service de recherche développé autour de la communauté
        OpenStreetMap. Il est possible de faire des recherches par mot clef.

        Pour plus de détails:
            - `API Nominatim <https://nominatim.org/release-docs/develop/>`_
       
    .. note::
        Bien que la recherche par coordonnées soit disponible par Nominatim, 
        IGO2 ne gère pas les appels par coordonnées vers Nominatim.


Exemples

        .. code:: json

            "ilayer": {
                "searchUrl": 'https://nominatim.openstreetmap.org/search',
                "params": {
                    "limit": 15
                 }
            }

Propriétés

    Seulement les propriétés spécifique à ce service sont présentées.

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

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

Liens

    - `Code Nominatim <https://github.com/infra-geo-ouverte/igo2-lib/blob/master/packages/geo/src/lib/search/shared/sources/ilayer.ts>`_
    - `API Nominatim <https://nominatim.org/release-docs/develop/>`_
    - `Exemple de config <https://github.com/infra-geo-ouverte/igo2/blob/master/src/environments/environment.ts>`_


StoredQueries
================

    .. note::
        Il se veut plus un EXEMPLE qu'un réel service de recherche. 

    .. line-block::
        StoredQueries est un service de recherche par mot clef exploitant les capacités WFS 2.0.
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

    Seulement les propriétés spécifique à ce service sont présentées.

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
               la structure est la suivante:
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

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

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

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

    Pour les autres propriétés, référez vous à `Source (base commune)`_ .

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
        une gamme d'outils aisément intégrable à l'application grâce 
        aux configuration d'outils (tools).

        

*******************************
Outils (tools)
*******************************

    .. line-block::
        Les outils existant:
            - `about`_
            - `catalog`_
            - `catalogBrowser`_
            - `contextManager`_
            - `directions`_
            - `ogcFilter`_
            - `timeFilter`_
            - `importExport`_
            - `mapDetails`_
            - `map`_
            - `print`_
            - `searchResults`_


.. _igoabout:

about
===============

    .. line-block::
        Outil générique offrant la possibilitée d'informer les usagers grâce à un outil d'aide.

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
               Si vous modifier le titre par défaut, vous devez ajouter 
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`. 
         - 
         - igo.integration.tools.about
       * - options
         - Object
         - .. line-block::
               Options de l'outil. Ici pour configurer le html qui sera
               présenté dans l'outil.
         - .. line-block::
               { 
                   htlm: '' 
                   ou 
                   htlm: ['','']
               }
         - `Voir html <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/about/about-tool/about-tool.component.ts>`_

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `about-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/about/about-tool>`_


.. _igocatalogtool:

catalog
===============

    .. line-block::
        Outil permettant de lister les catalogues disponibles configurés dans l'application:
            - :ref:`Configuration des catalogue <igocatalog>`. 

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
               Si vous modifier le titre par défaut, vous devez ajouter 
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`. 
         - 
         - igo.integration.tools.catalog

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `catalog-library-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-library-tool>`_
    - :ref:`Configuration des catalogue <igocatalog>`. 


.. _igocatalogBrowser:

catalogBrowser
===============

    .. line-block::
        Outil permettant de lister les couches d'information du catalogue sélectionné par l'usager.
        L'outil catalogue fore dans le catalogue jusqu'à concurence de 2 niveaux hiérarchiques.
        Tous les couches d'information doivent être dans un groupe.

Exemples

        .. code:: json

            {
                "name": "catalogBrowser"
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
               Si vous modifier le titre par défaut, vous devez ajouter 
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`
         - 
         - igo.integration.tools.catalog
       * - options
         - Object
         - .. line-block::
               Options de l'outil: 
               toggleCollapsedGroup permet de force 
               l'usager à entrer dans le groupe et 
               d'y visualiser  les couches disponible
               avant de pouvoir ajouter le groupe
               à la carte.
               **false** = le groupe doit être ouvert avant
               de pouvoir l'ajouter à la carte
         - .. line-block::
               { 
                   toggleCollapsedGroup: false
               }
         - .. line-block::
               { 
                   toggleCollapsedGroup: true
               }

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`_

.. _igocontextManager:

contextManager
===============

    .. line-block::
        Outil permettant de lister/gérer plusieurs contexte à l'intérieur d'une même application. 
        Il existe un fichier de configuration définissant les contexte disponibles à l'intérieur du gestionnaire de contexte.
            - `_context.json <https://github.com/infra-geo-ouverte/igo2/blob/master/src/contexts/_contexts.json>`_
        Ce dernier constitue une liste des contexte disponibles à l'intérieur du gestionnaire de contexte.

        Si un contexte est non présent dans ce fichier, il ne sera pas mis à la disposition dans l'application. 
        De ce fait, le seul moyen d'y accéder est par URL.
            - http://votreDomaine/?context=nomDuContexteNonGéréParLeGestionnaireDeContexte

Exemples

        .. code:: json

            {
                "name": "contextManager"
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
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter 
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`. 
         - 
         - igo.integration.tools.contexts

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `catalog-browser-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/catalog/catalog-browser-tool>`_



.. _igodirections:

directions
===============

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
               Le titre affiché dans l'application. Sujet aux traduction.
               Si vous modifier le titre par défaut, vous devez ajouter 
               ce titre dans les langues supportées par IGO2 (fr-en).
                   - fichiers dans :ref:`Language <igolanguage>`. 
         - 
         - igo.integration.tools.directions

    Important : Les propriétés en caractère gras suivis d'un * sont obligatoires.

Liens

    - `directions-tool <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/integration/src/lib/directions/directions-tool>`_



.. _igoogcFilter:

ogcFilter
===============

.. _igotimeFilter:

timeFilter
===============

.. _igoimportExport:

importExport
===============

.. _igomapDetails:

mapDetails
===============

.. _igomaptool:

map
===============

.. _igoprint:

print
===============

.. _igosearchResults:

searchResults
===============
