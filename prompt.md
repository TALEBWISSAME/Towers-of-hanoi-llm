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