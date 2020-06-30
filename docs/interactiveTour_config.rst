
******************************
Tour interactif configuration
******************************

Sommaire
===============

Il est possible de configurer des tours interactifs pour présenter le fonctionnement de l'application et de ces outils.
La librairie utilisée pour ce faire est Intro.js (https://introjs.com/). Plusieurs tours de présentation sont possibles,
un tour global, général et des particuliers pour chacun des outils. Chaque tour à sa propre configurations. Les tours sont constitués de
plusieurs étapes, communément apellé des 'steps'. Chaque step met en surbrillance un élément de l'application et affiche
un message de description de cet élément. Le pilote peut ainsi configurer plusieurs 'step' à son tour interactif. En plus de
sélectionner des éléments à mettre en surblillance, le pilote peux aussi configurer certaines actions lors du tour.



Exemples

      .. code:: json

        {
            "introInteractiveTourInMobile": true,

            "introOptions" :{
              "skipLabel": "<h3 style='color:blue'>Fermer </h3>",
              "nextLabel": "<h3 style='color:blue'>Suivant</h3>",
              "prevLabel": "",
              "doneLabel": "Terminé",
              "hidePrev": true,
              "hideNext": true,
              "positionPrecedence": ["right", "bottom", "top", "left"],
              "showStepNumbers": false,
              "disableInteraction": true,
              "highlightClass":"igo-introjs-helperLayer",
              "buttonClass":"mat-raised-button",
              "tooltipClass":"mat-h2",

              "steps": [
                {
                  "element": "menu-button",
                  "intro": "MENU <br> Ouvre et fermer le menu",
                  "introEnglish": "this is the menu button, open and close menu",
                  "position": "right",
                },
                {
                  "element": "igo-search-bar-container",
                  "intro": "BARRE RECHERCHE <br> Saisir un nom de couche ,de ville, d'adresse, point GPS, etc",
                  "introEnglish": "SEARCHBAR You can write town, adress and more"
                }
              ]
            }
        }


Configurer les tours
---------------------

Chaque tour possède des options de configuration qui s'appliqueront à CE tour et/ou s'appliqueront a chaque step de ce tour.
Voir les propriétés disponibles de la librarie intro.js (`IntroJs : <https://introjs.com/docs/intro/options/>`_) ou dans interface
IGO (`TourOptions interface <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour/interactive-tour.interface>`_
Une configuration pour ne pas avoir de tour interactif en mode mobile est aussi disponible dans le fichier config.json:
"interactiveTourInMobile": true
par default les tours interactifs seront présents en mode mobile.

Chaque tour possède des options de configuration qui s'appliqueront à ce tour et/ou s'appliqueront a chaque step de ce tour.
Voir les propriétés disponibles de la librarie intro.js. Les tours sont définis dans le fichier interactiveTour_configOptions.json
dans le dossier locale de l'application. À l'intérieur il doivent avoir la syntaxe suivante: introOptions_nomGénériqueDeOutil:{...} ou
introOptions_global: {...} pour le tour global de présentation. Voir documentation Tools pour la liste de nom générique des outils (`IGO doc <https://igo2.readthedocs.io/fr/latest/properties.html#outils-tools>`_)
Lorsqu'une certaine configuration est détectée par l'application, le bouton relié apparait automatiquement. Par exemple, lorsque vous aurez
configuré un tour pour un outil X, le bouton de présentation apparaitra dans l'entête de l'outil.


Configurer les steps du tours
--------------------------------

Chaque step est constitué d'au minimum 2 éléments. Le premier "element" correspond à l'élément HTML qui doit être mis en
surbrillance. On peut indiquer un nom ID, de CLASS ou tout élément HTML qui peut être retrouvé via les fonctions de document HTML:
document.getElementsByTagName(), document.getElementsByClassName(), document.querySelector(), document.getElementById().
Pour voir vos éléments html vous pouvez utiliser l'inspecteur de votre navigateur internet (clic droit sur l'élément -> inspecter)

Le second élément obligatoire d'un 'step' est "intro" ou est inscrit le message de la boîte. Du HTML peut y être inséré.

NB: attention à la séquence que prendra votre tour, l'élément doit être visible au moment ou le step est déclanché pour être
mis en surbrillance sinon votre tour pourrait avoir certain problème et ne fonctionnera pas.


Steps, traduction
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Il est possible de mettre une traduction anglaise du message, pour ce faire ajouter le paramètre "introEnglish": "message to show in english"
au step voulu. Le message en anglais s'affichera en fonction de la langue de votre navigateur internet. Si le paramètre "introEnglish" n'est pas
présent, le message présenté sera celui présent dans le paramètre "intro".



Exemples

  .. code:: json

    {
      "steps": [
        {
          "element": "menu-button",
          "intro": "element est un ID",
          "introEnglish": "this is an ID element",
          "position": "right"
        },
        {
          "element": "igo-search-bar-container",
          "intro": "<h3>element igo</h3>"
        },
        {
          "element": "igo-actionbar-item:nth-child(2)",
          "intro": "le child 2 de <strong>l'élément</strong> igo-actionbar",
          "introEnglish": "this is the second child of igo-actionbar"
        }
      ]
    }



Steps, propriétés en options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

En plus des 2 propriétées essentielles à chaque step, il est possible d'en ajouter certaines comme la position dans le cas ou l'on voudrait
que cette boite particulière soit disposée d'une autre facon. Exemple on ajoute "position": "right" dans le step, pour que cette boite de message
particulière ce place à droite de l'élément en surbrillance. Voir la librairie IntroJs et les propriétés disponibles sur les steps.



Steps, actions
^^^^^^^^^^^^^^^^^^^^^
Il est possible de réaliser des actions lors d'un step. Pour ce faire simplement ajouter action dans les propriétés
du step et indiquer l'action voulu.
Actions possibles:

    * openMenu : Cliquer sur ouvrir le menu.
    * closeMenu : Cliquer sur le fermer le menu.
    * clickOnToolX : Cliquer sur l'outil numéro X. Remplacer le X par le numéro d'outil voulu. Attention le numéro est fonction de l'ordre de présentation des outils.
    * clickOnContextX : Cliquer sur le context X. Remplacer le X par le numéro du context (clickOnContext4).
    * clickOnLayerX: Cliquer sur le context X. Rempalcer le X par le no du layer (clickOnLayer12).
    * clickOnElem : Cliquer sur l'élément qui est sélectionné dans la propriété élément. NB: Pour fonctionner, l'élément html doit avoir une fonction click. Il doit être possible d'effectuer dessus -> element.click().

** NB: Les index des actions débute toujours à 0
       Les éléments doivent être visibles et sélectionnables au moment ou est lancé le step, avant que l'action soit exécutée.

Exemples

    .. code:: json

      {
        "steps": [
          {
              "element": "menu-button",
              "intro": "MENU CLICK<br> En appuyant sur le bouton menu, le menu général ouvre",
              "position": "right",
              "action": "clickOnMenu"
          },
          {
              "element": ".igo-panel-title",
              "intro": "Clique sur l'outil 1",
              "action": "clickOnTool1"
          },
          {
              "element": "igo-list",
              "intro": "cliquer sur le contexte no 2",
              "action": "clickOnContext2",
              "position": "right"
          },
          {
              "element": "igo-layer-item:nth-child(3)",
              "action": "clickOnLayer1",
              "intro": "Cliquer sur le titre de couche -> la légende ouvre"
          },
          {
              "element": "igo-layer-item:nth-child(2) button",
              "intro": "click sur bouton oeil ->  Active et désactive  la couche",
              "action": "clickOnElem"
          },
          {
              "element": "igo-layer-item:nth-child(3) button:nth-of-type(2)",
              "action": "clickOnElem",
              "intro": "Click sur les outils disponibles sur CETTE couche",
              "introEnglish" : "Activate tool available on THAT layer"
          }
        ]
      }


 ** NB: Les index des éléments sont ceux des éléments de l'application, il se peut donc qu'il ne pas débute pas à 1, par
 exemple lorsque l'élément filtre de couche est présent ou non dans une liste, l'index ne sera pas le même. Particulièrement
 lorsqu'on sélectionne un élément avec "nth-child(x)". Exemple pour sélectioner l'élément du 1er context lorsque le filtre de contexte
 est présent vous devrez mettre dans 'element': 'igo-context-item:nth-child(3)' et se même si vous voulez sélectionner le 1er context.
 Toujours bien vérifier dans l'inspecteur de votre navigateur que vous ciblez le bon élément.


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
