
.. _interactiveTourRef:

******************************
Tour interactif configuration
******************************

Sommaire
===============

Il est possible de configurer des tours interactifs pour présenter le fonctionnement de l'application et de ces outils.
La librairie utilisée pour ce faire est Shepherdjs (https://shepherdjs.dev). Plusieurs tours de présentation sont possibles,
un tour global, général et des particuliers pour chacun des outils. Chaque tour à sa propre configuration. Les tours sont constitués de
plusieurs étapes, communément apelé des 'steps'. Chaque 'step' met en surbrillance un élément de l'application et affiche
un message de description de cet élément. Le pilote peut ainsi configurer plusieurs 'step' à chaqu'un de ces tours interactifs. 
En plus de sélectionner des éléments à mettre en surbrillance, le pilote peut aussi configurer certaines actions lors du tour.



Configurer les tours
---------------------

Les tours sont définis dans le fichier interactiveTour.json déposé dans le dossier config de l'application.

Chaque tour possède des options de configuration qui s'appliqueront à ce tour et/ou s'appliqueront à chaque step de ce tour.
Voir les propriétés disponibles de la librairie Shepherdjs(`Shepherdjs.dev  <https://shepherdjs.dev/docs/Step.html>`_) ou dans interface
IGO (`TourOptions interface <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour/interactive-tour.interface>`_)
À l'intérieur du fichier, chaque tour doit avoir la syntaxe suivante: global : {...} ou nomGénériqueDeOutil: {...} 
pour les tours sur les outils. Voir documentation Tools pour la liste de nom générique des outils (`IGO doc <https://igo2.readthedocs.io/fr/latest/properties.html#outils-tools>`_)
Lorsqu'une certaine configuration est détectée par l'application, le bouton relié apparait automatiquement. Par exemple, lorsque vous aurez
configuré un tour pour un outil X, le bouton de présentation apparaitra dans l'entête de l'outil.

Une configuration pour ne pas avoir de tour interactif en mode mobile est aussi disponible dans le fichier config.json:
"interactiveTourInMobile": true
par defaut les tours interactifs seront présents en mode mobile.


Exemples

      .. code:: json

        {
          "global": {
            "title": "interactiveTour.global.title",
            "position": "auto",
            "steps": [
              {
                "element": ".menu-button",
                "title": "interactiveTour.global.menu-button-title",
                "text": "interactiveTour.global.menu-button",
                "position": "right",
              },
              {
                "element": ".igo-search-bar-container",
                "text": "interactiveTour.global.search-bar"
              },
              {
                "element": "igo-toolbox",
                "title": "interactiveTour.global.toolbox-title",
                "text": "interactiveTour.global.toolbox",
                "beforeShow": {
                  "element": "#homeButton",
                  "action": "click"
                }
              }
            ]
          }
        }

Propriétés - InteractiveTourOptions

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - class
         - String
         - .. line-block::
               Définit la classe a appliquer aux boites contenant les messages d'aide
         -
         -
       * - disableInteraction
         - Boolean
         - .. line-block::
              Permet ou non à l'utilisateur de cliquer sur les élément en surbrillance
         - true | false
         - true
       * - highlightClass
         - Boolean
         - .. line-block::
                Définit la classe a appliquer aux éléments en surbrillance
         - 
         - 
       * - position
         - String
         - .. line-block::
               Définit la position des boites aide
         - 'auto', 'right', 'left', 'bottom', 'top'. NB: Si la propriété position n'est pas présente, les boites seront disposées au centre de l'écran. 
         - 
       * - scrollToElement
         - Boolean
         - .. line-block::
               Indique si on bascule sur l'élément en surbrillance
         - true | false
         - 
       * - steps
         - InteractiveTourStep
         - .. line-block::
               Une list de step
         - 
         - 
       * - title
         - String
         - .. line-block::
               Le message indiquer dans les titres de toutes les boites aide 
         - ...
         - ...

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.



Configurer les steps des tours
--------------------------------

Chaque step est constitué d'au minimum 2 éléments. 
D'abord "element" correspond à l'élément HTML qui doit être mis en surbrillance. On peut indiquer un nom ID, une CLASS ou autre élément HTML 
qui peut être retrouvé via les fonctions de document HTML: document.getElementsByTagName(), document.getElementsByClassName(), 
document.querySelector(), document.getElementById().
Pour voir vos éléments html vous pouvez utiliser l'inspecteur de votre navigateur internet (clic droit sur l'élément -> inspecter)

Le second élément obligatoire est "text" ou l'on saisit le message inscrit dans de la boîte. Du HTML peut y être inséré.

NB: attention à la séquence que prendra votre tour, l'élément doit être visible au moment ou le step est déclenché pour être
mis en surbrillance sinon votre tour pourrait avoir certains problèmes et/ou vous devrez ajouter des actions pour attendre que l'élément HTML 
soit visible.



Steps, propriétés en options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

En plus des 2 propriétées essentielles à chaque step, il est possible d'en ajouter d'autre comme "title" qui indique le text placé dans la 
barre de titre. Il y a aussi la position dans le cas où l'on voudrait que cette boite particulière soit disposée d'une autre façon. Exemple on ajoute "position": "right" dans le step, pour que cette boite de 
message particulière ce place à droite de l'élément en surbrillance. Si aucune position n'est définit, la boite s'affichera au centre de l'écran.
"disableInteraction": true, pour ne pas permettre les clics par l'utilisateur dans ce step.
Voir les options possibles (`InteractiveTourStep interface <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour/interactive-tour.interface>`_)
 



Steps, actions et déclanchements
^^^^^^^^^^^^^^^^^^^^^
Il est possible de réaliser des actions lors d'un step. Pour ce faire simplement ajouter le moment ou doit être déclanché l'action 
dans le step et indiquer l'action voulu.


Possibilité de déclanchement:
  * beforeShow: Déclanchement avant l'apparition de la boite. Attends avant d'ouvrir l'étape (en combinaison de waitFor qui prend du css)
  * beforeChange: Déclanchement avant le changement de boite. Attends avant de passer à l'étape suivante (en combinaison de waitFor qui prend du css)
  * onShow: Déclanchement lors de l'apparition de la boite
  * onHide: Déclanchement lorsque la boite disparait


Actions possibles:

    * click : Cliquer sur l'élément

Options des actions:
  * waitFor: Indiquer l'élement html a attendre avant de fare l'action
  * maxWait: Temps a attendre avant l'abandon
  * condition: Condition a respecter pour effectuer l'action
  * element: Élement à cliquer sur
   

Exemples

    .. code:: json

      {
          "steps": [
            {
              "element": ".menu-button",
              "text": "menu menu"
            },
            {
              "element": ".menu-button",
              "text": "Effectue un clic sur le bouton menu à l'arrivé de cette boite d'aide",
              "onShow": {
                "action": "click"
              }
            },
            {
              "element": ".igo-search-bar-container",
              "text": "Effectue un clic sur le bouton menu à la fermeture de la boite d'aide de la recherche",
              "onHide": {
                "element": ".menu-button",
                "action": "click"
              }
            },
            {
              "element": ".menu-button",
              "text": "test menu menu"
            },
            {
              "element": ".menu-button",
              "text": "Effectue un clic avant l'arrivé de la boite seulement si le menu est fermé",
              "onShow": {
                "action": "click",
                "condition": "app-sidenav:not([ng-reflect-opened=true])"
              }
            },
            {
              "element": ".menu-button",
              "text": "test menu menu"
            },
            {
              "element": "igo-actionbar-item:nth-child(2) mat-list-item",
              "text": "clic sur l'outil context",
              "beforeShow": {
                "action": "click"
              }
            },
            {
              "element": "igo-actionbar-item:nth-child(2) mat-list-item",
              "text": "clic sur l'outil context mais avant que la boite apparaissent clic sur le conteneur d'outil et avant l'apparaission de la boite, clic sur le bouton home",
              "beforeShow": {
                "element": "#homeButton",
                "action": "click"
              },
              "beforeChange": {
                "action": "click",
                "waitFor": ".igo-tool-container"
              }
            },
            {
              "element": "igo-context-item:nth-of-type(3)",
              "text": "clic sur le 3e context mais avant de cliquer attend que l'élément igo-list soit arrivé",
              "beforeChange": {
                "action": "click",
                "waitFor": "igo-list"
              }
            }
          ]
      }



Propriétés - InteractiveTourStep

    .. list-table::
       :widths: 10 10 30 15 10
       :header-rows: 1

       * - .. line-block::
               Propriétés
         - .. line-block::
               Type
         - .. line-block::
               Description
         - .. line-block::
               Valeurs possibles
         - .. line-block::
               Valeur défaut
       * - beforeChange
         - InteractiveTourAction
         - .. line-block::
               Déclanchement avant le changement de boite. Attends avant de passer à l'étape suivante (en combinaison de waitFor qui prend du css)
         -
         -
       * - beforeShow
         - InteractiveTourAction
         - .. line-block::
               Déclanchement avant l'apparition de la boite. Attends avant d'ouvrir l'étape (en combinaison de waitFor qui prend du css)
         -
         -
       * - class
         - String
         - .. line-block::
                Définit la classe a appliquer aux boites contenant les messages d'aide
         -
         -
       * - disableInteraction
         - Boolean
         - .. line-block::
              Permet ou non à l'utilisateur de cliquer sur l'éléments du step en surbrillance
         - true | false
         - true
       * - element
         - string
         - .. line-block::
                Element HTML à mettre en surbrillance. NB.: doit être visible lors du décanchement
         - 
         - 
       * - highlightClass
         - Boolean
         - .. line-block::
                Définit la classe a appliquer aux éléments en surbrillance
         - 
         - 
       * - onHide
         - InteractiveTourAction
         - .. line-block::
                Déclanchement lorsque la boite disparait
         - 
         - 
       * - onShow
         - InteractiveTourAction
         - .. line-block::
                Déclanchement lors de l'apparition de la boite
         - 
         - 
       * - position
         - String
         - .. line-block::
               Définit la position des boites aide
         - 'auto', 'right', 'left', 'bottom', 'top'. NB: Si la propriété position n'est pas présente, les boites seront disposées au centre de l'écran. 
         - 
       * - scrollToElement
         - Boolean
         - .. line-block::
               Indique si on bascule sur l'élément en surbrillance
         - true | false
         - 
       * - text
         - String
         - .. line-block::
               Le texte inscrit dans la boite d'aide. On peut y mettre du html. NB.: voir traduction
         - 
         - 
       * - title
         - String
         - .. line-block::
               Le message indiquer dans les titres de toutes les boites aide 
         - ...
         - ...

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.




* Traduction
^^^^^^^^^^^^^^^^^^^^^^^^^^
Il est possible de mettre une traduction aux différents message, pour ce faire vous devez utiliser une clé de traduction à l'intérieur de votre tour 
et inscrire le message a afficher dans les fichiers en.json et fr.json.
Le message s'affichera en fonction de la langue de votre navigateur internet.



Exemple

interactifTour.json

  .. code:: json

          {
            "steps": [
                      {
                      "element": ".igo-search-bar-container",
                      "title": "interactiveTour.global.maCleDeTraduction_titre",
                      "text": "interactiveTour.global.maCleDeTraduction"
                    },
            ]
          }

en.json

  .. code:: json

    {
        "interactiveTour": {
          "global": {
            "maCleDeTraduction_titre": "Nice interatif tour",
            "maCleDeTraduction": "This is the search bar "
    }

fr.json

  .. code:: json

    {
        "interactiveTour": {
          "global": {
            "maCleDeTraduction_titre": "Super tour interatif",
            "maCleDeTraduction": "Voici la barre de recherche "
    }


Dépannage
-----------

Je ne vois pas le bouton de mon tour apparaitre.
** Solution:
    Vérifier que le fichier interactiveTour_configOptions.json est bien présent dans le dosisier locale et que le nom est exactement identique.
    Vérifier que le nom de l'outil est bien exact et que la syntaxe du tour est bien présenté de cette facon: introOptions_nomGénériqueDeOutil:{...}
    Si vous êtes en mobile vérifier la configuration dans le fichier de config: "introInteractiveTourInMobile": true


Propriétés
 ** Voir librairie IntroJs **

Liens
 ** a faire **
        - `Exemple de configuration <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/src/locale/interactiveTour_configOptions.json>`_
        - `igo2-lib/packages/common/src/lib/interactive-tour <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour>`_
