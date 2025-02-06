---------------------
Contrôle par URL
---------------------

*******************************
Langage de l'application
*******************************

    Permet de contrôler par url le langage utilisé dans l'application.
    Si le langage demandé n'existe pas, c'est l'anglais (en) qui sera utilisé.

    Params :
        - lang=   fr ou en

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?lang=fr


*******************************
Ouverture du panneau latéral
*******************************

    Params :
        - sidenav=   1 ou 0 (1 = ouvert)

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?sidenav=1


********************************
Position de la carte
********************************

Le paramètre `pos` définit la position initiale de la carte. Les sous-paramètres doivent être séparés par des virgules `,`.

+-----------------+-------------------------------------------------------------+
| Sous-paramètre  | Description                                                 |
+=================+=============================================================+
| center          | Centre de la carte au format `@longitude,latitude`.          |
|                 | Le préfixe `@` est requis. **Obligatoire**                 |
+-----------------+-------------------------------------------------------------+
| zoom            | Niveau de zoom avec suffixe `z`. Exemple : `8z`.            |
|                 | **Optionnel**                                              |
+-----------------+-------------------------------------------------------------+
| rotation        | Rotation en degrés avec suffixe `r`. Exemple : `9r`.        |
|                 | **Optionnel**                                              |
+-----------------+-------------------------------------------------------------+
| projection      | Code de projection EPSG avec suffixe `p`. Exemple : `EPSG:4326p`. |
|                 | **Optionnel**                                              |
+-----------------+-------------------------------------------------------------+

**Exemple d'utilisation :**

    .. line-block::

        ?pos=@-72.48076,47.72594,8z,9r,EPSG:4326p

Dans cet exemple :

- `@-72.48076,47.72594` définit le centre de la carte.
- `8z` définit le niveau de zoom.
- `9r` définit la rotation de la carte.
- `EPSG:4326p` définit la projection utilisée.


********************************
Ajout de couches provenant de service web
********************************

Les paramètres `urls` et `layers` permettent d'ajouter des couches à la carte. Ces paramètres sont indissociables et doivent être utilisés ensemble.

Les valeurs multiples sont séparées par :
- Virgule `,` pour les sous-paramètres d'une même couche
- Point-virgule `;` pour séparer les couches

+-----------------+-------------------------------------------------------------+
| Paramètre       | Description                                                 |
+=================+=============================================================+
| urls            | Liste d'URLs des services de carte. **Obligatoire**         |
+-----------------+-------------------------------------------------------------+
| layers          | Configuration des couches à ajouter. **Obligatoire**        |
+-----------------+-------------------------------------------------------------+

Configuration d'une couche via `layers` :

+-----------------+-------------------------------------------------------------+
| Sous-paramètre  | Description                                                 |
+=================+=============================================================+
| index           | Position de l'URL dans la liste (commence à 0)              |
|                 | **Obligatoire**                                            |
+-----------------+-------------------------------------------------------------+
| [LAYERS]n       | Nom de la couche entre crochets + suffixe `n`              |
|                 | **Obligatoire**                                            |
+-----------------+-------------------------------------------------------------+
| type            | Type de service avec suffixe `t` :                          |
|                 | - `0t` : WMS                                               |
|                 | - `1t` : WMTS                                              |
|                 | - `2t` : ArcGIS Rest                                       |
|                 | - `3t` : ArcGIS Rest Image                                 |
|                 | - `4t` : ArcGIS Rest Tile                                  |
|                 | **Obligatoire**                                            |
+-----------------+-------------------------------------------------------------+
| opacity         | Transparence entre 0 et 1 avec suffixe `o`. **Optionnel**         |
+-----------------+-------------------------------------------------------------+
| visibility      | Visibilité avec suffixe `v` (0=masqué, 1=visible)          |
|                 | **Optionnel**                                              |
+-----------------+-------------------------------------------------------------+
| zIndex          | Ordre d'affichage avec suffixe `z`. **Optionnel**          |
+-----------------+-------------------------------------------------------------+

**Exemple d'utilisation :**

**Exemple une seule couche :**

        .. line-block::

            &urls=https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi&layers=0,[msp_risc_evenements_public]n,0t,0.6o,1v,12z


- `urls=https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi` définit l'URL de la couche.
- `0` est l'index de l'URL.
- `[msp_risc_evenements_public]n` définit le paramètre `LAYERS`.
- `0t` indique que le type de la couche est `wms`.
- `0.6o` définit l'opacité de la couche à 0.6.
- `1v` rend la couche visible.
- `12z` définit le Z-index de la couche à 12.


**Exemple plusieurs couches :**

**Exemple 1 :**

            .. line-block::

                &urls=https://testgeoegl.msp.gouv.qc.ca/apis/wss/tourisme.fcgi,https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi&layers=0,[msp_911_bornes_sentier_p]n,0t;1,[msp_risc_evenements_public]n,0t


- `urls` contient deux URLs :
- `https://testgeoegl.msp.gouv.qc.ca/apis/wss/tourisme.fcgi` (index `0`).
- `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi` (index `1`).

- `layers` définit les paramètres des couches :
- `0,[msp_911_bornes_sentier_p]n,0t` :
    - `0` : Index de l'URL (première URL `https://testgeoegl.msp.gouv.qc.ca/apis/wss/tourisme.fcgi`).
    - `[msp_911_bornes_sentier_p]n` : Paramètre `LAYERS` entre crochets, suivi de `n`.
    - `0t` : Type de la couche (wms).

- `1,[msp_risc_evenements_public]n,0t` :
    - `1` : Index de l'URL (deuxième URL `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi`).
    - `[msp_risc_evenements_public]n` : Paramètre `LAYERS` entre crochets, suivi de `n`.
    - `0t` : Type de la couche (wms).


**Exemple 2 :**

            .. line-block::

                &urls=https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi&layers=0,[msp_risc_evenements_public_24h]n,0t;0,[msp_risc_evenements_public]n,0t


- `urls` contient une seule URL :
- `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi` (index `0`).

- `layers` définit les paramètres des couches :
- `0,[msp_risc_evenements_public_24h]n,0t` :
    - `0` : Index de l'URL (première URL `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi`).
    - `[msp_risc_evenements_public_24h]n` : Paramètre `LAYERS` entre crochets, suivi de `n`.
    - `0t` : Type de la couche (wms).

- `0,[msp_risc_evenements_public]n,0t` :
    - `0` : Index de l'URL (même URL `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi`).
    - `[msp_risc_evenements_public]n` : Paramètre `LAYERS` entre crochets, suivi de `n`.
    - `0t` : Type de la couche (wms).

**Exemple 3 - ArcGIS Rest :**

            .. line-block::

                &urls=https://geo.environnement.gouv.qc.ca/donnees/rest/services/Biodiversite/Aires_protegees/MapServer&layers=0,[15]n,2t,1v,4z

- `urls` contient une seule URL de service ArcGIS Rest :
- `https://geo.environnement.gouv.qc.ca/donnees/rest/services/Biodiversite/Aires_protegees/MapServer` (index `0`).

- `layers` définit les paramètres des couches :
- `0,[15]n,2t` :
    - `0` : Index de l'URL (première URL `https://geo.environnement.gouv.qc.ca/donnees/rest/services/Biodiversite/Aires_protegees/MapServer`).
    - `[15]n` : Paramètre `LAYERS` entre crochets, suivi de `n`.
    - `2t` : Type de la couche (ArcGIS Rest).


**Note :**
Si plusieurs couches utilisent la même URL, vous pouvez spécifier cette URL une seule fois dans `urls` et utiliser le même index dans `layers` pour les différentes couches. Par exemple, dans cet exemple, les deux couches utilisent l'URL `https://testgeoegl.msp.gouv.qc.ca/apis/wss/historiquesc.fcgi` avec l'index `0`.


*******************************
Ajout de couches à la volées à partir de fichier
*******************************

.. warning::
    Les méthodes wmsUrl et layers sont dépréciées. Veuillez utiliser la nouvelle méthode avec les paramètres `urls` et `layers` décrite dans la section précédente.

    Params :
        - wmsUrl= (déprécié)
        - layers= (déprécié)

        - vector=

    Exemple:
        *- https://infra-geo-ouverte.github.io/igo2/?wmsUrl=https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi&layers=evenements (déprécié)*

        - https://www.carte-igo.donneesquebec.ca/igo2/apercu-qc/?vector=https:%2F%2Fwww.donneesquebec.ca%2Frecherche%2Fdataset%2Fc5dc2e13-78c5-4eff-9361-a52b003bd69e%2Fresource%2Fe1f96121-8633-47b5-a540-3e96257ca1c0%2Fdownload%2Fsag_borneincendie.geojson
        - https://www.foretouverte.gouv.qc.ca/?vector=https:%2F%2Fwww.donneesquebec.ca%2Frecherche%2Fdataset%2Ff52f4792-4c46-48cb-8073-d10d0faaeaef%2Fresource%2Fc1be9190-6ed2-4bad-a50b-c89e3ec44d50%2Fdownload%2Fnormales-mens-1991-2020.geojson

*******************************
Sélection du contexte
*******************************

Le paramètre `ctx` spécifie le contexte cartographique à charger au démarrage.

**Paramètre :**
- `ctx=` : Identifiant du contexte. Si invalide, utilise le contexte par défaut.

    **Exemple :**

        .. line-block::

            ?ctx=_default

*******************************
Sélection du contexte (déprécié)
*******************************

.. warning::
    Cette méthode est dépréciée. Veuillez utiliser la nouvelle méthode avec le paramètre `ctx` décrite dans la section précédente.

    Params :
        - context=

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?context=simple2

*******************************
Zoom (déprécié)
*******************************

.. warning::
    Cette méthode est dépréciée. Veuillez utiliser la nouvelle méthode avec le paramètre `pos` décrite dans la section précédente.

    Params :
        - zoom=

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?zoom=10

*******************************
Centre de la carte (déprécié)
*******************************

.. warning::
    Cette méthode est dépréciée. Veuillez utiliser la nouvelle méthode avec le paramètre `pos` décrite dans la section précédente.

    Les coordonnées sont en latitude longitude.

    Params :
        - center=

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?center=-70.70426615422834,57.62669012416586

*******************************
Étendue de la carte
*******************************

    Permet de zoomer à l'étendue désirée à l'ouverture de la carte.
    Les coordonnées sont en latitude longitude, selon la logique suivante
    [minx, miny, maxx, maxy]. Elles seront converties selon la projection
    de la carte.

    Ce paramètre d'URL a été introduite  car le zoom et le center (par url)
    ne permettent pas d'obtenir le même résultat, par mobile, tablette ou bureau.

    Params :
        - zoomExtent=

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?zoomExtent=-72,60,-71,61

*******************************
Visibilité des couches
*******************************

    Basé sur les identifiants du layer. L'id peut être configuré
    dans les contexte OU assigné automatiquement (uuid).

        .. code:: json

            {
                "title": "OSM",
                "baseLayer": true,
                "**id**":"osm1",
                "sourceOptions": {
                    "type": "osm"
                    }
            }


    Params :
        - visiblelayers= (liste de id, séparés par une virgule OU * (tous) )
        - invisiblelayers= (liste de id, séparés par une virgule OU * (tous) )

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?invisiblelayers=*&visiblelayers=6143562e58898a852eeb658ba493e8e7,carte_gouv_qc

********************************
Outil actif lors de l'ouverture
********************************

    Params :
        - tool=

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?tool=about
        - https://infra-geo-ouverte.github.io/igo2/?tool=catalog
        - catalogBrowser (pas disponible car un catalogue doit être sélectionné)
        - https://infra-geo-ouverte.github.io/igo2/?tool=contextManager
        - https://infra-geo-ouverte.github.io/igo2/?tool=directions
        - https://infra-geo-ouverte.github.io/igo2/?tool=ogcFilter
        - https://infra-geo-ouverte.github.io/igo2/?tool=timeFilter
        - https://infra-geo-ouverte.github.io/igo2/?tool=spatialFilter
        - https://infra-geo-ouverte.github.io/igo2/?tool=importExport
        - https://infra-geo-ouverte.github.io/igo2/?tool=mapDetails
        - https://infra-geo-ouverte.github.io/igo2/?tool=map
        - https://infra-geo-ouverte.github.io/igo2/?tool=mapTools
        - https://infra-geo-ouverte.github.io/igo2/?tool=measurer
        - https://infra-geo-ouverte.github.io/igo2/?tool=print
        - https://infra-geo-ouverte.github.io/igo2/?tool=searchResults
        - https://infra-geo-ouverte.github.io/igo2/?tool=mapLegend
        

********************************
Recherche
********************************

    Params :
        - search=
            - #couche pour n'avoir que les couches
            - #adresse
            - #route
            - #municipalites, #mun
            - #mrc
            - #entreprise
            - #lieu
            - #sumi, #borne, #bornes
            - #code-postal
            - #anciennes-adresses
            - #ancienne-municipalites
            - #région-administrative ou #regadmin
            - #borne, #bornes, #repère, #km
        - search=915&sf=1
            - **sf=1** permet de zoomer sur le premier résultat
        - search=915&searchGeom=1
            - **searchGeom=1** permet de faire afficher la géométrie des résultats retournés par la recherche.
        - search=1000000&exactMatch=1
            - **exactMatch=1** permet de conserver dans la liste des résultats que ceux ayant un match exact. Controle par URL pour la 1ère recherche par url seulement.

    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?search=feu&zoom=18
        - https://infra-geo-ouverte.github.io/igo2/?search=915%23adresse
        - https://infra-geo-ouverte.github.io/igo2/?search=cabaret%23lieu
        - https://infra-geo-ouverte.github.io/igo2/?search=g1v4j7%23code-postal&sf=1
        - https://infra-geo-ouverte.github.io/igo2/?search=915%23adresse&searchGeom=1

********************************
Itinéraire
********************************

    Params :
        - tool=directions
        - routing= (liste de longitude,latitude, séparé par virgules)


    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?tool=directions&routing=-72.4540601953125,47.86101094949734;-70.65092909179685,47.24932843990587

