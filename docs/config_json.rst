.. include:: global.rst

.. meta::
   :DC.creator: Gouvernement du Québec
   :DC.language: fr

------------
Configuration requise
------------

Cette section détaille les configurations possibles pour le navigateur. 
À l'aide d'un fichier JSON, il est possible de construire un contexte avec des outils et des couches de données propres à chaque usage.

JSON
=================

Modification du JSON : 

* view.mock.json
* tools.mock.json
* layers.mock.json
  
En somme, voici les paramètres qui peuvent définir un contexte (view), des outils (tools)) et des couches (layers) :

* view.mock.json

::

  "view": {
    "center": [-8181982.573305608, 5969615.322970143],
    "zoom": 7,
    "projection": "EPSG:3857"
  }


* tools.mock.json

::

   {
     "tools": []
   }

* layers.mock.json

::

   {
      "protocole": "WMS",
      "url": "http://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi",
      "name": "MSP_DIRECTION_REG_COG_S",
      "title": "test1"
   }

.. note::
   Cette documentation est en construction.
