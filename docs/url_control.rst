---------------------
Contrôle par URL
---------------------

*******************************
Ouverture du panneau latéral
*******************************

    Params :
        - sidenav=   1 ou 0 (1 = ouvert)
 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?sidenav=1



*******************************
Ajout de couches
*******************************

    Params :
        - wmsUrl=
        - layers=
        - vector=
 
    Exemple:    
        - https://infra-geo-ouverte.github.io/igo2/?wmsUrl=https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi&layers=evenements
        - https://donnees.ville.montreal.qc.ca/dataset/8889ef01-29ee-476a-980b-cd7ab06c98e9/resource/f7fcccaf-5a50-45d8-bf30-72a42fffa1ef/download/programmation-culturelle-estivale-2020.geojson
        - https://www.donneesquebec.ca/recherche/fr/dataset/f647f5ed-a8f3-4a47-8ceb-977cbf090675/resource/68e0e20a-415d-44f5-af82-a90311784616/download/bornes-incendies.geojson

*******************************
Sélection du contexte
*******************************

    Params :
        - context=
 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?context=simple2

*******************************
 Zoom
*******************************

    Params :
        - zoom=
 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?zoom=10

*******************************
 Centre de la carte
*******************************

    Params :
        - center=
 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?center=-70.70426615422834,57.62669012416586

*******************************
 Visibilité des couches
*******************************

    Basé sur les identifiant du layer. L'id peut être configuré 
    dans les contexte OU assigné automatiquement (uuid).

        .. code:: json

            { 
                "title": "OSM",
                "baseLayer": true,
                **"id":"osm1",**
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
        - https://infra-geo-ouverte.github.io/igo2/?tool=measurer
        - https://infra-geo-ouverte.github.io/igo2/?tool=print
        - https://infra-geo-ouverte.github.io/igo2/?tool=searchResults

********************************
 Recherche
********************************

    Params :
        - search=
            - #couche pour n'avoir que les couches
            - #adresse
            - .... (à documenter)
 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?search=feu&zoom=18
        - https://infra-geo-ouverte.github.io/igo2/?search=915%23adresse

********************************
 Itinéraire
********************************

    Params :
        - tool=directions
        - routing= (liste de longitude,latitude, séparé par virgules)

 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?tool=directions&routing=-72.4540601953125,47.86101094949734;-70.65092909179685,47.24932843990587

********************************
 Table des matières
********************************

    Params :
        - llck = mot clef pour filtrer la liste des couches
        - llca = 1 ou 0 , pour trier la table des matières en ordre 
          alphabétique.
        - llcv = 1 ou 0 , pour ne montrer que les couches visibles.
        - llcr = 1 ou 0 , pour ne montrer que les couches visibles 
          selon l'échelle active de la carte

    0 = actif
    1 = inactif

 
    Exemple:
        - https://infra-geo-ouverte.github.io/igo2/?llck=rtss
        - https://infra-geo-ouverte.github.io/igo2/?&llca=1
        - https://infra-geo-ouverte.github.io/igo2/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcv=1
        - https://infra-geo-ouverte.github.io/igo2/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcr=1

