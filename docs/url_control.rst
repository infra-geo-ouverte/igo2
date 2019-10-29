---------------------
Contrôle par URL
---------------------

*******************************
Ouverture du panneau latéral
*******************************

    Params :
        - sidenav=   1 ou 0 (1 = ouvert)
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?sidenav=1



*******************************
Ajout de couches
*******************************

    Params :
        - wmsUrl=
        - layers=
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?wmsUrl=https://ws.mapserver.transports.gouv.qc.ca/swtq&layers=zone_degel
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?wmsUrl=/apis/ws/swtq&layers=zone_degel

*******************************
Sélection du contexte
*******************************

    Params :
        - context=
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq

*******************************
 Zoom
*******************************

    Params :
        - zoom=
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?zoom=10

*******************************
 Centre de la carte
*******************************

    Params :
        - center=
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?center=-70.70426615422834,57.62669012416586

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
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&invisiblelayers=*&visiblelayers=bgr_v_centr_servc_geomt_act,bgr_v_sous_route_res_sup_act,satellite
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?invisiblelayers=*&visiblelayers=bb12b9975bbb86d5f5ca36ac4958c6be

********************************
 Outil actif lors de l'ouverture
********************************

    Params :
        - tool=
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=about
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=catalog
        - catalogBrowser (pas disponible car un catalogue doit être sélectionné)
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=contextManager
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=directions
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=ogcFilter
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=timeAnalysis
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=importExport
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=mapDetails
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=map
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=print
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=searchResults

********************************
 Recherche
********************************

    Params :
        - search=
            - #couche pour n'avoir que les couches
            - #adresse
            - .... (à documenter)
 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?search=feu&zoom=18
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?search=915%23adresse&zoom=18

********************************
 Itinéraire
********************************

    Params :
        - tool=directions
        - routing= (liste de longitude,latitude, séparé par virgules)

 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?tool=directions&routing=-72.4540601953125,47.86101094949734;-70.65092909179685,47.24932843990587

********************************
 Table des matières
********************************

    Params :
        - llck = mot clef pour filtrer la liste
        - llca = 1 ou 0 , pour trier la table des matières en ordre alphabétique.
        - llcv = 1 ou 0 , pour ne montrer que les couches visibles.
        - llcr = 1 ou 0 , pour ne montrer que les couches visibles selon l'échelle active de la carte

 
    Exemple:
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&llck=rtss
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&llca=1
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcv=1
        - https://geoegl.msp.gouv.qc.ca/igo2/apercu-qc/?context=mtq&visiblelayers=bgr_v_sous_route_res_sup_act&llcr=1

