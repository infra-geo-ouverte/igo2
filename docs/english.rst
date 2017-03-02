.. include:: global.rst

.. meta::
   :DC.creator: Gouvernement du Québec
   :DC.language: en

--------------------
English
--------------------

|igo-logo|

* Installation: `<https://infra-geo-ouverte.github.io/igo2/#installation-en>`_
* Demo: `<https://infra-geo-ouverte.github.io/igo2/>`_
* Tests: `<https://infra-geo-ouverte.github.io/igo2/#tests-en>`_
* Docker: `<https://infra-geo-ouverte.github.io/igo2/#docker-en>`_
* Folder structure: `<https://infra-geo-ouverte.github.io/igo2/#folder-structure>`_
* Overview of the project: `<https://overv.io/infra-geo-ouverte/igo2/>`_
* GitHub repository: `<https://github.com/infra-geo-ouverte/igo2/>`_


Latest update: |date| (|time| UTC)

|CC|


JSON-EN
=================

This section include all configuration possible in the Web |igo2|_ Mapping application. 
With this JSON conguration file, it is possible to build your own context, tools and layers related to each uses.


Parameters related to JSON : 

* /src/contexts/default.json


{
  "map": {
    "view": {
      "projection": "EPSG:3857",
      "center": [-72, 52],
      "zoom": 6
    }
  },


  "layers": [
{
          "name": "name_title_alias_wmts",
          "type": "wmts",
          "source": {
            "url": "http://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/wmts",
            "matrixSet": "EPSG_3857",
            "format": "image/jpeg",
            "layer": "layername_wmts"
          }
},
{
          "name": "name_title_alias__xyz_tms",
          "type": "xyz",
          "source": {
            "url": "https://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png"
          }
},
{
      "name" : "name_title_alias_wms",
      "type" : "wms",
      "source":{
        "url" : "http://geoegl.msp.gouv.qc.ca/cgi-wms/bdtq.fcgi/",
        "params" : {"LAYERS": "layername_wms",
                    "VERSION": "1.1.1"}
      }
    }
  ],


  "tools": [
    {
      "name": "context",
      "title": "Contexts",
      "icon": "local_offer"
    },
    {
      "name": "search"
    },
    {
      "name": "map",
      "title": "Map",
      "icon": "map"
    },
    {
      "name": "add_layers",
      "title": "Add Layers",
      "icon": "add_location"
    },
    {
      "name": "directions",
      "title": "Directions",
      "icon": "directions"
    },
    {
      "name": "historical_analysis",
      "title": "Historical Analysis",
      "icon": "history"
    },
    {
      "name": "print",
      "title": "Print",
      "icon": "local_printshop"
    },
    {
      "name": "measure",
      "title": "Measure",
      "icon": "straighten"
    }
  ]
}


More information available here: http://igouverte.org/english/.


----------

.. toctree::
   :maxdepth: 2
   
   config_json_en


List of individual code `contributeurs`_.       


.. note::
   This documentation is under construction.
