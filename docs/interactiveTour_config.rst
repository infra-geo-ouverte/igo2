

.. _igoInteractiveTourConfig:

******************************
Tour interactif configuration
******************************

Sommaire
===============

Il est possible de configurer des tours interactifs pour présenter le fonctionnement de l'application et de ces outils.
La librairie utilisée par IGO pour ce faire est Shepherdjs (https://shepherdjs.dev). Plusieurs tours de présentation sont possibles,
un tour global, général et des particuliers pour chacun des outils. Chaque tour à sa propre configuration. Les tours sont constitués de
plusieurs étapes, communément appelé des 'steps' ou étapes. Chaque 'step' met en surbrillance un élément de l'application et affiche
un message de description de cet élément. Le pilote peut ainsi configurer plusieurs 'step' à chacun de ces tours interactifs.
En plus de sélectionner des éléments à mettre en surbrillance, le pilote peut aussi configurer certaines actions lors du tour.



Configurer les tours
---------------------

Les tours sont définis dans le fichier interactiveTour.json déposé dans le dossier config de l'application.

Chaque tour possède des options de configuration qui s'appliqueront à ce tour et/ou s'appliqueront à chaque step de ce tour.
À l'intérieur du fichier, chaque tour doit avoir la syntaxe suivante: global : {...} ou nomGénériqueDeOutil: {...}
pour les tours sur les outils. Voir documentation Tools pour la liste de nom générique des outils (`IGO doc <https://igo2.readthedocs.io/fr/latest/properties.html#outils-tools>`_)
Lorsqu'une certaine configuration est détectée par l'application, le bouton relié apparait automatiquement. Par exemple, lorsque vous aurez
configuré un tour pour un outil X, le bouton de présentation apparaitra dans l'entête de l'outil.

Une configuration pour ne pas avoir de tour interactif en mode mobile est aussi disponible dans le fichier config.json:
"interactiveTourInMobile": true
par défaut les tours interactifs seront présents en mode mobile.


Exemples

      .. code:: json

        {
          "global": {
            "position": "auto",
            "scrollToElement":true,
            "title": "Titre de toutes les boites du tour",
            "steps": [
              {
                "text": "Bienvenue dans le tour de présentation IGO",
              }

            ]
          }
        }

Propriétés - Objet InteractiveTourOptions

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
       * - disableInteraction
         - Boolean
         - .. line-block::
              Permet ou non à l'utilisateur de cliquer sur les éléments en surbrillance
         - true | false
         - true
       * - highlightClass
         - Boolean
         - .. line-block::
                Définit la classe à appliquer aux éléments en surbrillance
         -
         -
       * - position
         - String
         - .. line-block::
               Définit la position des boites aide
         - 'auto', 'right', 'left', 'bottom', 'top'. NB.: Si la propriété position n'est pas présente, les boites seront disposées au centre de l'écran.
         -
       * - scrollToElement
         - Boolean
         - .. line-block::
               Indique si on défile la page sur l'élément en surbrillance
         - true | false
         -
       * - steps
         - :ref:`InteractiveTourStep <igoInteractiveTourStep>`
         - .. line-block::
               Une liste de step
         -
         -
       * - title
         - String
         - .. line-block::
               Le titre de toutes les boites aide
         - ...
         - ...

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens
      - `TourOptions interface <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour/interactive-tour.interface>`_


Configurer les 'steps' des tours
--------------------------------

Chaque 'step' est constitué d'au minimum 2 éléments.
D'abord "element" correspond à l'élément HTML qui doit être mis en surbrillance. On peut indiquer un nom ID, une CLASS ou autre élément HTML
qui peut être retrouvé via les fonctions de document HTML: document.getElementsByTagName(), document.getElementsByClassName(),
document.querySelector(), document.getElementById().
Pour voir vos éléments html vous pouvez utiliser l'inspecteur de votre navigateur internet (clic droit sur l'élément -> inspecter)

Le second élément obligatoire est "text" ou l'on saisit le message inscrit dans de la boîte. Du HTML peut y être inséré.

NB.: attention à la séquence que prendra votre tour, l'élément doit être visible au moment où le step est déclenché pour être
mis en surbrillance sinon votre tour pourrait avoir certains problèmes et/ou vous devrez ajouter des actions pour attendre que l'élément HTML
soit visible.



Steps, autres propriétés
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

En plus des 2 propriétés essentielles à chaque step, il est possible d'en ajouter d'autre comme "title" ou "position" pour mettre un titre
à la boite d'aide et indiquer la position de la boite. Il est aussi possible de ne pas permettre les clics par l'utilisateur dans ce step à
l'aide de "disableInteraction": true ou de ne pas mettre le bouton précédent dans un step particulier à l'aide de la propriété "noBackButton".




Steps, actions et déclenchements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Il est aussi possible de réaliser des actions lors d'un step. Pour ce faire simplement ajouter le moment ou doit être déclenché l'action
dans le step et indiquer l'action voulu.


Possibilité de déclenchement:
  * beforeShow: Déclenchement avant l'apparition de la boite. Attends avant d'ouvrir l'étape (en combinaison de waitFor qui prend du css)
  * beforeChange: Déclenchement avant le changement de boite. Attends avant de passer à l'étape suivante (en combinaison de waitFor qui prend du css)
  * onShow: Déclenchement lors de l'apparition de la boite
  * onHide: Déclenchement lorsque la boite disparait


Actions possibles:
  * click : Cliquer sur l'élément

Options des actions:
  * waitFor: Indiquer l'élement html à attendre avant de fare l'action
  * maxWait: Temps à attendre avant l'abandon
  * condition: Condition à respecter pour effectuer l'action
  * element: Élement à cliquer sur


Exemples

    .. code:: json

      {
        "global": {
          "position": "auto",
          "steps": [
            {
              "element": ".menu-button",
              "text": "Un step avec ces options",
              "title": "<h1>titre de la boite </h1>",
              "position": "bottom",
              "disableInteraction": true
            },
            {
              "element": ".menu-button",
              "text": "Effectue un clic sur le bouton menu à l'arrivée de cette boite d'aide",
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
              "text": "Voici le menu "
            },
            {
              "element": ".menu-button",
              "text": "Effectue un clic à l'arrivée de la boite seulement si le menu est fermé",
              "onShow": {
                "action": "click",
                "condition": "mat-sidenav:not(.mat-drawer-opened)"
              }
            },
            {
              "element": ".menu-button",
              "text": "Voici le menu"
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
              "text": "clic sur l'outil context mais avant que la boite apparaisse clic sur le conteneur d'outil et avant l'apparition de la boite, clic sur le bouton home",
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
      }



.. _igoInteractiveTourStep:

Propriétés - Objet InteractiveTourStep

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
               Déclenchement avant le changement de boite. Attends avant de passer à l'étape suivante (en combinaison de waitFor qui prend du css)
         -
         -
       * - beforeShow
         - InteractiveTourAction
         - .. line-block::
               Déclenchement avant l'apparition de la boite. Attends avant d'ouvrir l'étape (en combinaison de waitFor qui prend du css)
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
                Elément HTML à mettre en surbrillance. NB.: doit être visible lors du déclanchement
         -
         -
       * - highlightClass
         - Boolean
         - .. line-block::
                Définit la classe à appliquer aux éléments en surbrillance
         -
         -
       * - noBackButton
         - Boolean
         - .. line-block::
                Définit si le step aura un bouton précédent
         -
         -
       * - onHide
         - InteractiveTourAction
         - .. line-block::
                Déclenchement lorsque la boite disparait
         -
         -
       * - onShow
         - InteractiveTourAction
         - .. line-block::
                Déclenchement lors de l'apparition de la boite
         -
         -
       * - position
         - String
         - .. line-block::
               Définit la position des boites aide
         - .. line-block::
              'auto', 'right', 'left', 'bottom', 'top'.
              NB.: Si la propriété position n'est pas présente,
              les boites seront disposées au centre de l'écran
         -
       * - scrollToElement
         - Boolean
         - .. line-block::
               Indique si on défile la page sur l'élément en surbrillance
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
               Le titre de la boite d'aide
         - ...
         - ...

    Important : Les propriétés en caractère gras suivies d'un * sont obligatoires.


Liens
      - `InteractiveTourStep interface <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour/interactive-tour.interface.ts>`_



Traduction
^^^^^^^^^^^^^^^^^^^^^^^^^^
Il est possible de mettre une traduction aux différents messages, pour ce faire vous devez utiliser une clé de traduction que vous définissez
 et inscrire le message dans les fichiers en.json et fr.json. Le message s'affichera en fonction de la langue de votre navigateur internet.



Exemple

interactiveTour.json

  .. code:: json

          {
            "global": {
                "steps": [
                      {
                      "element": ".igo-search-bar-container",
                      "title": "interactiveTour.global.maCleDeTraduction_titre",
                      "text": "interactiveTour.global.maCleDeTraduction"
                    },
                ]
            }
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
            "maCleDeTraduction_titre": "Super tour intératif",
            "maCleDeTraduction": "Voici la barre de recherche "
    }


Dépannage
-----------

Je ne vois pas le bouton de mon tour apparaitre.
    Solution:
        - Vérifier que le fichier interactiveTour.json est bien présent dans le dossier config de votre application.
        - Vérifier que le nom de l'outil est bien exact
        - Vérifier que la syntaxe du tour est bien présentée de cette façon: global: {...} ou nomGénériqueDeOutil:{...}
        - Si vous êtes en mode mobile vérifier la configuration dans le fichier config.json: "introInteractiveTourInMobile": true

L'élément de mon tour n'est pas mis en surbrillance.
    Solution:
        - Vérifier que votre élément est bien sélectionnable via la console et document.querySelector('monElement')
        - Vérifier selon la séquence si votre élément est bien disponible lors du déclanchement du step. Il se pourrait que vous deviez ajouter
          une action ainsi qu'un wait sur votre élément HTML si par exemple vous cliquez sur un menu et voulez sélectionner un élément à l'intérieur
          dans l'étape suivante.



Liens

        - `Exemple de configuration <https://github.com/infra-geo-ouverte/igo2/tree/master/src/config/interactiveTour.json>`_
        - `component igo2-lib/packages/common/src/lib/interactive-tour <https://github.com/infra-geo-ouverte/igo2-lib/tree/master/packages/common/src/lib/interactive-tour>`_
