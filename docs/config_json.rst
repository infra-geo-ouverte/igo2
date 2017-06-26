.. include:: global.rst

.. meta::
   :DC.creator: Gouvernement du Québec
   :DC.language: fr

------------
Configuration requise
------------

Cette section détaille les configurations possibles pour le navigateur dans un contexe cartographique. 
À l'aide d'un fichier JSON, il est possible de construire un contexte avec des outils et des couches de données propres à chaque usage.

Voici un dépôt avec plusieurs exemples de contexte en JSON : https://github.com/geo-msp/apercu-qc/blob/master/contexts/

JSON
=================
 
En somme, voici les paramètres qui peuvent définir un contexte de vue cartographique (view), des outils (tools) et des couches (layers) :

* /src/contexts/

{
  "map":{
    "view":{
      "projection":"EPSG:3857",
      "center":[
        -72,
        52
      ],
      "zoom":6
    }
  },
  "layers":[
    {
      "name":"nom_titre_alias_wmts",
      "type":"wmts",
      "source":{
        "url":"https://geoegl.msp.gouv.qc.ca/carto/wmts",
        "matrixSet":"EPSG_3857",
        "format":"image/jpeg",
        "layer":"nom_dela_couche_wmts"
      }
    },
    {
      "name":"nom_titre_alias_xyz_tms",
      "type":"xyz",
      "source":{
        "url":"https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png",
        "attributions": "  © <a href='https://www.droitauteur.gouv.qc.ca/copyright.php'><img src='/gouvouvert/public/images/quebec/gouv_qc_logo.png' width='64' height='14'>Gouvernement du Québec</a>"
      }
    },
    {
      "name":"nom_titre_alias_couche_wms",
      "type":"wms",
      "opacity" : 0.3,
      "optionsFromCapabilities": true,
      "metadata": {
          "extern": true
      },
      "visible": false,
      "source":{
        "url":"https://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi?",
        "params":{
          "LAYERS":"nom_couche_wms_layername",
          "VERSION":"1.1.1"
        }
      }
    },
    {
      "title": "nom_titre_alias_wms_time",
      "opacity" : 0.3,
      "type": "wms",
      "optionsFromCapabilities": true,
      "metadata": {
          "extern": true
      },
      "visible": false,
      "source": {
        "url": "https://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi",
        "params": {
          "layers": "nom_couche_wms_layername",
          "version": "1.3.0"
        }
      },
      "timeFilter": {
        "min": "2017-01-01",
        "max": "2018-01-01",
        "range": true,
        "type": "datetime"
      }
     },
    {
      "name" : "nom_alias_wfs",
      "title": "nom_titre_alias_wfs",
      "type" : "wfs",
      "source":{
        "url" : "https://geoegl.msp.gouv.qc.ca/cgi-wms/adnInternetV2.fcgi?service=WFS&version=1.1.0&request=GetFeature&typename=adn_bassin_n1_simplify_500&srsname=EPSG:3857"
      },
      "style" : {
        "Stroke" : {
            "color" : "rgba(140, 140, 255, 1.0)",
            "width" : 3
        }
      },
      "version" : "1.3.0"
    },
    {
      "title":"LayerfromCapabilities",
      "type":"wms",
      "optionsFromCapabilities":true,
      "alias":"États-Unis",
      "source":{
        "url":"http://demo.boundlessgeo.com/geoserver/wms",
        "params":{
          "layers":"topp:states",
          "version":"1.3.0"
        },
        "serverType":"geoserver"
      }
    }
  ],
  "toolbar":[
    "search",
    "context",
    "mapEditor",
    "layers",
    "directions",
    "historicalAnalysis",
    "print",
    "measure"
  ],
  "tools":[
    {
      "name":"context",
      "title":"Contexts",
      "icon":"local_offer"
    },
    {
      "name":"search"
    },
    {
      "name":"mapEditor"
    },
    {
      "name":"add_layers",
      "title":"Add Layers",
      "icon":"add_location"
    },
    {
      "name":"directions",
      "title":"Directions",
      "icon":"directions"
    },
    {
      "name":"historical_analysis",
      "title":"Historical Analysis",
      "icon":"history"
    },
    {
      "name":"print",
      "title":"Print",
      "icon":"local_printshop"
    },
    {
      "name":"measure",
      "title":"Measure",
      "icon":"straighten"
    }
  ]
}

.. note::
   Cette documentation est en construction.
