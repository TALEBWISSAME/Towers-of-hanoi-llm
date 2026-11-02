# TP3 — Journal des prompts


## Exercice 1 — Page web minimale

### Prompt n°1 — Création de la structure du jeu

**LLM utilisé :** GitHub Copilot

**Objectif :** Créer une page web minimale contenant trois tours, un champ numérique et un bouton Démarrer.

### Texte du prompt

Tu es un développeur web front-end.

Je suis étudiante en informatique et je réalise un TP de No-code et Low-code. Je dois développer progressivement le jeu des Tours de Hanoï avec l'aide d'un LLM.

Mon projet contient trois fichiers vides : index.html, style.css et script.js.

Pour l'exercice 1, je veux uniquement créer la page web minimale du jeu.

Voici les éléments demandés :
- Une zone avec l'identifiant "plateau" contenant trois tours côte à côte. Chaque tour doit avoir la classe "tour".
- Un champ numérique avec l'identifiant "nb-anneaux", un minimum de 1, un maximum de 8 et une valeur initiale de 3.
- Un bouton avec l'identifiant "btn-demarrer" et le texte "Démarrer".

Contraintes techniques :
- Utiliser uniquement HTML, CSS et JavaScript purs.
- Ne pas utiliser de bibliothèque, de framework ou de modules JavaScript.
- Garder les trois fichiers séparés.
- Le jeu doit pouvoir s'ouvrir directement en double-cliquant sur index.html, sans serveur.
- L'interface doit être en français.
- Utiliser du code simple, lisible et facile à comprendre pour un étudiant.
- Ne pas ajouter de fonctionnalités non demandées.
- Ne pas encore créer les anneaux, les déplacements ou les règles du jeu.
- Le bouton Démarrer ne doit provoquer aucune erreur, même s'il ne fait encore rien.

Donne-moi le code complet de chaque fichier séparément, sans explication supplémentaire.

### Résultat obtenu

**Statut : Fonctionne.**

Copilot a généré les trois fichiers demandés :

- `index.html` : contient le titre du jeu, les trois tours, le champ numérique et le bouton Démarrer.
- `style.css` : définit l'apparence de la page et permet d'afficher les trois tours côte à côte.
- `script.js` : contient uniquement un commentaire, car la logique du jeu n'est pas encore demandée.

La page a été ouverte directement dans le navigateur, sans serveur.

### Tests effectués

- Les trois tours sont correctement affichées.
- Le champ numérique affiche 3 par défaut.
- Le bouton Démarrer est visible.
- Les fichiers HTML, CSS et JavaScript sont séparés.
- La console du navigateur ne montre aucune erreur.

Les attributs HTML du champ numérique indiquent un minimum de 1 et un maximum de 8.

### Bugs et problèmes observés

Copilot a rencontré des erreurs techniques pendant l'exécution de certaines commandes de modification et de vérification des fichiers.

Cependant, les fichiers finaux ont été générés et la page s'affiche correctement.

Aucune erreur JavaScript n'a été observée dans la console du navigateur.

**Nombre de reformulations nécessaires : 0.**

Aucun deuxième prompt de correction n'a été nécessaire.

---

### Questions du professeur

**Question A — Le LLM a-t-il respecté la séparation en trois fichiers, ou placé du CSS ou du JavaScript dans la page ? A-t-il ajouté des éléments non demandés ?**

Oui, Copilot a respecté la séparation des trois fichiers. Le HTML contient la structure de la page, le CSS gère l'apparence et le JavaScript est dans un fichier séparé.

Il a ajouté un titre et des attributs d'accessibilité, mais aucune fonctionnalité supplémentaire. Il n'a donc pas été nécessaire d'envoyer un deuxième prompt de correction.

**Question B — Comparer les identifiants et classes générés à ceux demandés : pourquoi est-il utile de les imposer dès le premier prompt ?**

Copilot a respecté les identifiants `plateau`, `nb-anneaux` et `btn-demarrer`, ainsi que la classe `tour`.

Il est important de définir ces noms dès le premier prompt pour garder une structure cohérente. Cela permettra au JavaScript des prochains exercices de retrouver facilement les éléments HTML sans devoir modifier leurs identifiants.

---

### Bilan de l'exercice 1

Cet exercice m'a permis de créer la structure de base du jeu des Tours de Hanoï avec l'aide de Copilot.

J'ai compris qu'un prompt précis permet d'obtenir un code qui respecte les consignes. J'ai aussi vérifié le résultat dans le navigateur et utilisé

## Exercice 2 — Génération dynamique des anneaux

### Prompt n°2 — Génération et validation des anneaux

**LLM utilisé :** GitHub Copilot

**Objectif :** Générer dynamiquement les anneaux sur la première tour en fonction du nombre choisi.

### Texte du prompt

Tu es un développeur web front-end.

Je continue mon TP de No-code et Low-code sur le jeu des Tours de Hanoï. L'exercice 1 est terminé : mon projet contient déjà index.html, style.css et script.js, avec trois tours, un champ numérique et un bouton Démarrer.

Je veux maintenant réaliser uniquement l'exercice 2 : la génération dynamique des anneaux.

**Objectif :**

Quand je clique sur le bouton Démarrer, les anneaux doivent apparaître sur la première tour, correctement empilés, selon le nombre choisi dans le champ numérique.

**Contraintes obligatoires :**

1. Conserver les trois fichiers séparés et les identifiants existants : plateau, nb-anneaux, btn-demarrer et la classe tour.
2. Utiliser uniquement HTML, CSS et JavaScript purs, sans bibliothèque, framework ni modules ES.
3. Le jeu doit fonctionner directement en ouvrant index.html dans le navigateur, sans serveur.
4. Stocker l'état du jeu dans une structure JavaScript contenant trois piles, par exemple [[3, 2, 1], [], []] pour trois anneaux.
5. Créer une fonction nommée rendre() qui reconstruit entièrement l'affichage des anneaux à partir de cette structure.
6. Le DOM doit uniquement servir à l'affichage et ne doit jamais être utilisé comme source de vérité pour l'état du jeu.
7. Générer les anneaux dynamiquement en JavaScript, avec des largeurs décroissantes du bas vers le haut. Ne pas coder les anneaux directement dans le HTML.
8. Permettre de choisir entre 1 et 8 anneaux, avec 3 comme valeur par défaut.
9. Vérifier la valeur saisie en JavaScript, y compris si l'utilisateur entre 0, 12 ou laisse le champ vide. Refuser les valeurs invalides avec un message simple en français, sans créer d'anneaux incorrects.
10. Un nouveau clic sur Démarrer doit réinitialiser le jeu et remplacer les anneaux précédents, sans doublons.
11. Ne pas encore implémenter le déplacement des anneaux, la sélection à la souris, les règles de déplacement ou la résolution automatique.
12. Utiliser un code simple, lisible et adapté à un étudiant en informatique, avec une logique facile à expliquer.

**Format de réponse :**

Modifie uniquement les fichiers nécessaires du projet existant. Conserve la structure réalisée à l'exercice 1 et explique brièvement les modifications apportées.

Ne réalise pas les exercices suivants.

### Résultat obtenu

**Statut : Fonctionne pour les tests observés.**

Copilot a modifié deux fichiers :

- `script.js` : gestion des trois piles JavaScript, génération des anneaux, fonction `rendre()` et validation des valeurs.
- `style.css` : mise en forme des anneaux et de leurs tailles.

Le fichier `index.html` est resté inchangé.

### Tests effectués

- Affichage de 8 anneaux sur la première tour : réussi.
- Empilement du plus grand au plus petit : réussi.
- Saisie de 12 : message d'erreur affiché.
- Conservation des anneaux précédents après une valeur invalide : réussi.
- Tests automatiques annoncés par Copilot : réussis.

Les autres tests seront confirmés avant validation définitive.

### Bugs et problèmes observés

Aucun bug fonctionnel constaté sur la capture. Copilot n'a pas signalé de problème dans ses tests automatiques.

**Nombre de reformulations nécessaires : 0 à ce stade.**

### Questions du professeur

**Question A — Où le LLM a-t-il rangé l'état du jeu ?**

L'état du jeu est stocké dans une structure JavaScript appelée `tours`, contenant trois tableaux. La fonction `rendre()` reconstruit l'affichage à partir de cet état.

Cette séparation est importante pour les exercices suivants, car les déplacements des anneaux pourront être gérés directement dans les tableaux JavaScript.

**Question B — Que se passe-t-il avec une valeur hors limites ?**

Lorsqu'une valeur incorrecte comme 12 est saisie, le programme affiche un message d'erreur et conserve l'état précédent. La validation des valeurs est réalisée en JavaScript.

### Bilan de l'exercice 2

Cet exercice m'a permis de comprendre comment générer des éléments HTML dynamiquement avec JavaScript. J'ai également appris à séparer les données du jeu de leur affichage et à vérifier les valeurs saisies par l'utilisateur.

## Exercice 3 — Déplacement des anneaux

### Prompt n°3 — Gestion des déplacements manuels

**LLM utilisé :** GitHub Copilot

**Objectif :** Permettre à l'utilisateur de déplacer les anneaux entre les trois tours avec la souris, en respectant les règles du jeu des Tours de Hanoï.

### Texte du prompt

Tu es un développeur web front-end.

Je suis étudiante en informatique et je réalise un TP de No-code et Low-code. Je développe progressivement le jeu des Tours de Hanoï avec HTML, CSS et JavaScript, en utilisant GitHub Copilot.

Les exercices 1 et 2 sont déjà terminés et fonctionnent.

Mon projet contient trois fichiers :
- `index.html` : structure de la page.
- `style.css` : apparence des tours et des anneaux.
- `script.js` : gestion de l'état du jeu et génération des anneaux.

Pour l'exercice 3, je veux permettre à l'utilisateur de déplacer les anneaux à la souris.

Fonctionnalités demandées :

1. Un premier clic sur une tour contenant des anneaux sélectionne uniquement l'anneau du sommet.
2. L'anneau sélectionné doit être visuellement mis en évidence.
3. Un deuxième clic sur une autre tour déplace l'anneau si le déplacement est autorisé.
4. Il est interdit de placer un grand anneau sur un anneau plus petit.
5. Il est interdit de déplacer un anneau depuis une tour vide.
6. Un clic sur la même tour annule la sélection.
7. Si le déplacement est interdit, l'état du jeu ne doit pas changer et un retour visuel doit apparaître.
8. Le bouton Démarrer doit toujours permettre de recommencer une partie.

Contraintes techniques :

- Utiliser uniquement HTML, CSS et JavaScript purs.
- Conserver les trois fichiers séparés.
- Garder le code simple, lisible et adapté à un étudiant.
- Conserver l'état du jeu dans le tableau JavaScript `tours`.
- Utiliser la fonction `rendre()` pour actualiser l'affichage.
- Créer une fonction `deplacementValide(de, vers)` qui vérifie les règles sans accéder au DOM.
- Ne pas utiliser le DOM comme source de vérité.
- Ne pas ajouter de compteur, de score ou de détection de victoire : ces fonctionnalités seront développées plus tard.
- Ne pas modifier les fonctionnalités des exercices précédents.
- Ne pas modifier le fichier `prompts.md`.

Modifie uniquement les fichiers nécessaires et conserve une logique JavaScript simple.

### Résultat obtenu

**Statut : Fonctionne.**

Copilot a modifié les fichiers `script.js` et `style.css`.

- `script.js` : ajoute la sélection des anneaux, la vérification des déplacements et la mise à jour des trois piles.
- `style.css` : ajoute une mise en évidence de l'anneau sélectionné et un retour visuel lorsqu'un déplacement est refusé.
- `index.html` : reste inchangé.

La fonction `deplacementValide(de, vers)` vérifie les règles du jeu sans utiliser directement les éléments HTML.

### Tests effectués

- Sélection d'un anneau au sommet d'une tour : fonctionne.
- Déplacement d'un petit anneau vers une tour vide : fonctionne.
- Tentative de placement d'un grand anneau sur un petit : refusée.
- Annulation de la sélection en cliquant sur la même tour : fonctionne.
- Redémarrage d'une partie : fonctionne.
- Conservation de l'état du jeu dans les tableaux JavaScript : respectée.
- Console du navigateur : aucune erreur JavaScript observée.

**Problème rencontré pendant les tests :**

Au début, les clics sur les anneaux ne semblaient pas fonctionner.

Après avoir actualisé la page avec `Ctrl + F5`, la nouvelle version du JavaScript a été chargée et les déplacements ont fonctionné correctement.

Il s'agissait donc d'un problème d'actualisation du navigateur, et non d'une erreur dans la logique du jeu.

### Bugs et reformulations

**Nombre de reformulations nécessaires : 0.**

Aucun nouveau prompt de correction n'a été nécessaire.

---

### Questions du professeur

**Question A — Comment vérifier que seuls les anneaux du sommet peuvent être déplacés ?**

La sélection se fait au niveau de la tour et concerne uniquement son dernier anneau, c'est-à-dire celui du sommet de la pile JavaScript.

Les anneaux situés en dessous ne peuvent donc pas être déplacés directement.

**Question B — Pourquoi séparer la fonction `deplacementValide(de, vers)` de l'affichage ?**

Cette séparation permet de vérifier les règles du jeu indépendamment de l'interface.

La fonction travaille uniquement avec les tableaux JavaScript. Elle est donc plus simple à comprendre, à tester et à réutiliser.

La fonction `rendre()` s'occupe uniquement de l'affichage des anneaux.

---

### Bilan de l'exercice 3

Cet exercice m'a permis de comprendre comment gérer les interactions de l'utilisateur avec JavaScript.

J'ai appris à sélectionner un anneau, à vérifier si un déplacement est autorisé et à mettre à jour l'affichage à partir de l'état du jeu.

J'ai également compris l'importance de séparer la logique du jeu de son interface et de vérifier que le navigateur utilise bien la dernière version du code.

## Exercice 4 — Améliorations visuelles

### Prompt n°4 — Proposition de deux styles graphiques

**LLM utilisé :** GitHub Copilot

**Objectif :** Améliorer l'apparence du jeu des Tours de Hanoï sans modifier son fonctionnement, en comparant deux propositions de style.

### Texte du prompt

Tu es un développeur web front-end.

Je suis étudiante en informatique et je réalise un TP de No-code et Low-code sur le jeu des Tours de Hanoï.

Les exercices 1, 2 et 3 sont terminés et fonctionnent correctement.

Mon projet contient trois fichiers :
- `index.html` : structure HTML du jeu.
- `style.css` : apparence du jeu.
- `script.js` : logique du jeu, gestion des anneaux et déplacements.

**Exercice 4 — Améliorations visuelles**

Je souhaite améliorer l'interface du jeu sans modifier son fonctionnement.

Avant de modifier les fichiers, propose-moi deux styles différents :

1. **Style moderne et élégant** : couleurs pastel, fond clair, coins arrondis, ombres légères et présentation soignée.
2. **Style ludique et coloré** : couleurs plus vives, interface dynamique et présentation adaptée à un jeu.

Pour chaque proposition, donne une courte description des couleurs, du fond, des anneaux et des boutons.

Ne modifie encore aucun fichier. Attends que je choisisse une des deux propositions.

Après mon choix, tu devras respecter les contraintes suivantes :

- Chaque anneau doit avoir une couleur distincte.
- L'anneau sélectionné doit être clairement visible.
- Ajouter des transitions CSS simples et discrètes.
- Améliorer la mise en page et les boutons.
- Adapter l'interface aux fenêtres étroites.
- Conserver les trois tours côte à côte.
- Ne pas modifier la logique des déplacements.
- Ne pas modifier `script.js` ni `index.html`.
- Modifier uniquement `style.css`.
- Ne pas utiliser de bibliothèque ou de framework.
- Garder un CSS simple, lisible et compréhensible pour un étudiant.
- Ne pas modifier `prompts.md`.
- Ne pas ajouter de fonctionnalités non demandées.

Présente les deux propositions de style de manière claire et numérotée, puis attends ma réponse.

### Résultat du prompt n°4

Copilot a proposé deux styles :

**Proposition 1 — Moderne et élégant**

Fond clair légèrement pastel, panneaux blancs avec des coins arrondis et des ombres discrètes. Anneaux aux couleurs pastel distinctes, sélection bien visible et boutons sobres.

**Proposition 2 — Ludique et coloré**

Fond lumineux, couleurs plus vives, présentation joyeuse, anneaux colorés et boutons plus dynamiques.

**Choix effectué :** proposition 1, moderne et élégant.

Copilot a présenté les deux propositions avant de modifier les fichiers, conformément à la demande.

---

### Prompt n°5 — Application du style choisi

**LLM utilisé :** GitHub Copilot

**Objectif :** Appliquer le style moderne et élégant à l'interface du jeu.

### Texte du prompt

Je choisis la proposition 1 : **Moderne et élégant**.

Applique ce style au jeu des Tours de Hanoï en respectant les contraintes définies précédemment.

Je souhaite :
- Un fond clair avec des couleurs pastel.
- Une présentation moderne et soignée.
- Des anneaux de couleurs différentes.
- Une sélection clairement visible.
- Des transitions CSS discrètes.
- Des boutons arrondis.
- Une interface lisible sur une fenêtre étroite.

**Contraintes importantes :**
- Modifie uniquement `style.css`.
- Ne modifie pas `index.html`, `script.js` ou `prompts.md`.
- Ne change aucune règle du jeu.
- Conserve les fonctionnalités des exercices précédents.
- Utilise uniquement du CSS simple, sans bibliothèque.

### Résultat du prompt n°5

**Statut : Fonctionne.**

Copilot a appliqué le style moderne et élégant dans `style.css`.

Les modifications comprennent :
- Des couleurs pastel différentes pour les anneaux.
- Une mise en évidence plus visible de l'anneau sélectionné.
- Des transitions CSS discrètes.
- Une amélioration de la présentation du plateau et des boutons.
- Une adaptation aux fenêtres étroites, avec défilement horizontal du plateau si nécessaire.

Copilot a confirmé que seul `style.css` avait été modifié.

La logique JavaScript est restée inchangée.

### Tests effectués

- Le jeu s'affiche avec le nouveau style : fonctionne.
- Les anneaux ont des couleurs différentes : fonctionne.
- La sélection d'un anneau reste visible : fonctionne.
- Les déplacements des anneaux continuent de fonctionner : fonctionne.
- Les règles du jeu sont conservées : fonctionne.
- L'interface reste adaptée aux fenêtres étroites : prise en charge par le CSS.
- La syntaxe JavaScript a été vérifiée par Copilot.

Le résultat a été testé dans le navigateur et le fonctionnement général a été confirmé.

### Bugs et problèmes observés

Aucun bug fonctionnel n'a été signalé après l'application du nouveau style.

Copilot n'a pas modifié les fichiers HTML et JavaScript.

**Nombre de reformulations correctives nécessaires : 0.**

Le deuxième prompt correspond au choix du style demandé par le professeur, et non à une correction d'erreur.

---

### Questions du professeur

**Question A — Le LLM a-t-il modifié `script.js` alors que seul le style était demandé ? Quelle contrainte ajouter au prompt pour l'en empêcher ?**

Non, Copilot a respecté la consigne et a modifié uniquement `style.css`.

Pour éviter toute modification inutile, j'ai précisé dans mon prompt : « Modifie uniquement `style.css`. Ne modifie pas `index.html`, `script.js` ou `prompts.md`. »

Cette contrainte permet de conserver la logique du jeu et de limiter les risques de bugs.

**Question B — Demander deux propositions de style différentes dans un même prompt, puis en retenir une : en quoi le format de réponse demandé change-t-il la qualité du résultat ?**

J'ai demandé à Copilot de présenter deux styles numérotés avec une description des couleurs, du fond, des anneaux et des boutons.

Ce format m'a permis de comparer facilement les propositions avant de choisir.

J'ai retenu le style moderne et élégant, car il correspondait à l'apparence que je souhaitais obtenir.

Un format de réponse précis permet donc d'avoir un résultat plus organisé et mieux adapté à la demande.

---

### Bilan de l'exercice 4

Cet exercice m'a permis de comprendre comment utiliser un LLM pour améliorer l'apparence d'une application sans modifier son fonctionnement.

J'ai appris à demander plusieurs propositions, à choisir celle qui me convient et à imposer des contraintes précises sur les fichiers à modifier.

J'ai également compris qu'il est important de tester le jeu après chaque modification, même lorsqu'on change uniquement le CSS.
## Exercice 5 — Démo automatique

### Prompt n°5 — Implémentation de la démonstration automatique

**LLM utilisé :** GitHub Copilot

**Objectif :** Ajouter une démonstration automatique qui résout le jeu des Tours de Hanoï grâce à un algorithme récursif.

### Texte du prompt

Tu es un développeur web front-end.

Je suis étudiante en informatique et je réalise un TP de No-code et Low-code. Je développe progressivement le jeu des Tours de Hanoï avec HTML, CSS et JavaScript purs.

Les exercices 1 à 4 sont terminés. Mon jeu possède déjà trois tours, une génération dynamique des anneaux, des déplacements manuels et une interface améliorée.

Pour l'exercice 5, je veux ajouter une démonstration automatique qui résout le jeu.

Voici les fonctionnalités demandées :

- Ajouter un bouton « Démo automatique ».
- Lorsqu'on clique sur ce bouton, démarrer une nouvelle partie avec le nombre d'anneaux choisi.
- Utiliser l'algorithme récursif des Tours de Hanoï.
- Créer une fonction `resoudre(n, de, vers, via)` qui renvoie la liste des déplacements sous forme de couples `[de, vers]`.
- Cette fonction doit uniquement calculer les déplacements, sans modifier l'affichage.
- Créer une deuxième fonction qui exécute les déplacements un par un avec un délai, par exemple avec `setTimeout`.
- Après la démonstration, tous les anneaux doivent se trouver sur la troisième tour.
- Pendant la démonstration, empêcher les déplacements manuels.
- Si l'utilisateur clique sur « Démarrer » pendant la démonstration, arrêter l'animation et réinitialiser le jeu.

Contraintes techniques :

- Conserver les trois fichiers existants : `index.html`, `style.css` et `script.js`.
- Ne pas utiliser de bibliothèque ou de framework.
- Conserver les fonctionnalités des exercices précédents.
- Utiliser les trois tableaux JavaScript pour représenter l'état du jeu.
- Continuer à utiliser la fonction `rendre()` pour actualiser l'affichage.
- Garder un code simple, lisible et adapté à une étudiante en informatique.
- Ne pas ajouter de fonctionnalités non demandées.
- Ne pas modifier le fichier `prompt.md`.

Modifie uniquement les fichiers nécessaires et vérifie le fonctionnement du programme.

### Résultat obtenu

**Statut : Fonctionne.**

Copilot a ajouté la démonstration automatique dans le jeu.

Les modifications concernent principalement :

- `index.html` : ajout du bouton « Démo automatique ».
- `script.js` : ajout de l'algorithme récursif et de l'exécution automatique des déplacements.
- `style.css` : aucune modification nécessaire.

Deux fonctions distinctes ont été utilisées :

- `resoudre(n, de, vers, via)` : calcule la liste des déplacements nécessaires.
- `executerCoups()` : effectue les déplacements progressivement avec un délai de 600 ms.

Le jeu conserve les fonctionnalités précédentes.

### Tests effectués

**Test 1 — Algorithme récursif**

Dans la console du navigateur, j'ai exécuté :

`resoudre(3, 0, 2, 1).length`

Résultat obtenu : **7**.

Ce résultat correspond au nombre minimal de déplacements pour trois anneaux.

**Test 2 — Démonstration automatique**

J'ai choisi trois anneaux, puis cliqué sur « Démo automatique ».

Les anneaux se déplacent progressivement et arrivent sur la troisième tour.

**Résultat : Fonctionne.**

**Test 3 — Vérifications réalisées par Copilot**

Copilot a indiqué avoir testé :

- Le calcul des déplacements pour 1 à 8 anneaux.
- Le respect des règles de déplacement.
- Le blocage des clics manuels pendant la démonstration.
- L'arrêt de la démonstration avec le bouton « Démarrer ».

Ces vérifications ont été annoncées par Copilot. La démonstration visuelle et le résultat de sept déplacements ont également été vérifiés dans le navigateur.

### Bugs et problèmes observés

Lors des premiers essais dans la console, j'ai obtenu deux erreurs `SyntaxError` à cause de commandes mal saisies.

Après avoir corrigé la saisie, la commande `resoudre(3, 0, 2, 1).length` a correctement renvoyé `7`.

Ces erreurs ne provenaient pas de l'algorithme.

La démonstration automatique fonctionne dans le navigateur.

**Nombre de reformulations nécessaires : 0.**

Aucun deuxième prompt de correction n'a été nécessaire pour obtenir une démonstration fonctionnelle.

---

### Questions du professeur

**Question A — Envoyer d'abord le prompt sans donner l'algorithme : le LLM le connaît-il ? Est-il correct ?**

Oui, Copilot a proposé l'algorithme récursif classique des Tours de Hanoï sans que je lui fournisse son pseudo-code.

L'algorithme consiste à déplacer les `n-1` premiers anneaux vers la tour intermédiaire, déplacer le plus grand anneau vers la tour d'arrivée, puis déplacer les `n-1` anneaux vers la tour d'arrivée.

J'ai vérifié son fonctionnement avec trois anneaux : la fonction renvoie sept déplacements, ce qui correspond à la formule `2^n - 1`.

La démonstration permet également de déplacer tous les anneaux vers la troisième tour.

**Question B — Pourquoi séparer le calcul de la liste des coups de leur exécution animée ? Que se passe-t-il si l'utilisateur clique sur « Démarrer » pendant la démo, et comment le LLM a-t-il traité ce cas ?**

Il est important de séparer le calcul des déplacements et leur animation pour avoir un programme plus clair et plus facile à tester.

La fonction `resoudre()` calcule uniquement les déplacements, tandis que `executerCoups()` les réalise progressivement à l'écran.

Cette séparation permet de vérifier l'algorithme sans avoir besoin de lancer l'animation.

Si l'utilisateur clique sur « Démarrer » pendant la démonstration, le programme annule l'animation en cours et réinitialise le jeu.

Copilot a prévu ce comportement pour éviter que les déplacements automatiques continuent après le démarrage d'une nouvelle partie.

---

### Bilan de l'exercice 5

Cet exercice m'a permis de comprendre comment utiliser un algorithme récursif pour résoudre automatiquement les Tours de Hanoï.

J'ai également appris l'intérêt de séparer le calcul des déplacements de leur affichage animé.

L'utilisation de Copilot m'a aidée à intégrer cette nouvelle fonctionnalité tout en conservant les exercices précédents.