.. include:: global.rst

------------
Configuration requise
------------

Cette section d�taille les configurations possibles pour le navigateur. 
� l'aide d'un fichier JSON, il est possible de construire un contexte avec des touils et couches de donn�es propre � chaque usage.

Minimum
=================

Modification du JSON : 
- view.mock.json
- tools.mock.json
- layers.mock.json
  
Param�tres JSON
=================

En somme, voici les param�tres qui peuvent d�finir un contexte (view), ces outils (tools)) et ces couches (layers)) :
1. view.mock.json
.. code-block:: json
  "view": {
    "center": [-8181982.573305608, 5969615.322970143],
    "zoom": 7,
    "projection": "EPSG:3857"
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