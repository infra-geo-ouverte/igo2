.. include:: global.rst

.. meta::
   :DC.creator: Gouvernement du Québec
   :DC.language: en

--------------------
English
--------------------

|igo-logo|

* Installation: `<https://github.com/infra-geo-ouverte/igo2#installation-en>`_
* Tests: https://github.com/infra-geo-ouverte/igo2#tests-en
* Docker: https://github.com/infra-geo-ouverte/igo2#docker-en
* Folder structure: https://github.com/infra-geo-ouverte/igo2#folder-structure


Latest update: |date| (|time| UTC)

|CC|


JSON-EN
=================

This section include all configuration possible in the Web |igo2|_ Mapping application. 
With this JSON conguration file, it is possible to build your own context, tools and layers related to each uses.


Parameters related to JSON : 

* view.mock.json
* tools.mock.json
* layers.mock.json
  
Here is all parameters that can defined view context, tools and layers :

* view.mock.json
  "view": {
    "center": [-8181982.573305608, 5969615.322970143],
    "zoom": 7,
    "projection": "EPSG:3857"
  }


* tools.mock.json
{
  "tools": []
}

* layers.mock.json
{
    "protocole": "WMS",
    "url": "http://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi",
    "name": "MSP_DIRECTION_REG_COG_S",
    "title": "test1"
}


More information available here: http://igouverte.org/english/.


----------

.. toctree::
   :maxdepth: 2
   
   config_json_en


List of individual code `contributeurs`_.       


.. note::
   This documentation is under construction.
