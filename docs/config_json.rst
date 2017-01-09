.. include:: global.rst

------------
Configuration requise
------------

Cette section détaille les configurations possibles pour le navigateur. 
À l'aide d'un fichier JSON, il est possible de construire un contexte avec des touils et couches de données propre à chaque usage.

Minimum requis
=================

Modification du JSON : 
1. view.mock.json
2. tools.mock.json
3. layers.mock.json
  
JSON
+++++

En somme, voici les paramètres qui peuvent définir un contexte (view), ces outils (tools)) et ces couches (layers)) :
1. view.mock.json
.. code-block:: json
{
  "view": {
    "center": [-8181982.573305608, 5969615.322970143],
    "zoom": 7,
    "projection": "EPSG:3857"
  }
}

2. tools.mock.json
.. code-block:: json
 {
  "tools": []
}

3. layers.mock.json

.. code-block:: json
{
    "protocole": "WMS",
    "url": "http://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi",
    "name": "MSP_DIRECTION_REG_COG_S",
    "title": "test1"
}
