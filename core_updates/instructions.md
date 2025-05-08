Ajouter les fichiers modifiés du framework IGO2 dans ce dossier. Pour chaque fichier ajouté, indiquer ici sa destination.

->24 : fond de carte
    node_modules/@igo2/geo/fesm2022/igo2-geo.mjs , ligne 17335 :
       expand = false => expand = true

-> 25 : Couleur du marqueur de selection
    node_modules/@igo2/geo/fesm2022/igo2-geo.mjs, ligne 642 :
      svgIconColor = `"rgba(${newColor[0]},${newColor[1]},${newColor[2]},${opacity})"`; => svgIconColor = `"rgba(9,87,151,${opacity})"`;
    node_modules/@igo2/geo/esm2022/lib/style/shared/overlay/overlay-marker-style.utils.mjs, ligne 19 : 
      svgIconColor = `"rgba(${newColor[0]},${newColor[1]},${newColor[2]},${opacity})"`; => svgIconColor = `"rgba(9,87,151,${opacity})"`;
