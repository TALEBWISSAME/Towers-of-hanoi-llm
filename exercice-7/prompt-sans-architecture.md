# Rôle
Tu es un développeur web front-end expérimenté, spécialisé en HTML, CSS et JavaScript.

# Contexte
Je suis étudiante en L2 Informatique et je réalise un TP de No-code et Low-code.

Je souhaite développer en une seule fois un jeu complet des Tours de Hanoï.

Mon projet contient trois fichiers vides : `index.html`, `style.css` et `script.js`.

Le jeu doit fonctionner directement dans un navigateur, sans serveur.

# Fonctionnalités demandées

1. **Structure de l'interface**

- Afficher trois tours côte à côte dans une zone `#plateau`.
- Utiliser la classe `.tour` pour chaque tour.
- Ajouter un champ numérique `#nb-anneaux`, entre 1 et 8, avec 3 par défaut.
- Ajouter un bouton `#btn-demarrer`.
2. **Génération des anneaux**

- Générer dynamiquement les anneaux sur la première tour.
- Respecter l'ordre du plus grand au plus petit.
- Vérifier les valeurs incorrectes.
- Réinitialiser correctement la partie avec Démarrer.
3. **Déplacements manuels**

- Un clic sélectionne l'anneau supérieur d'une tour.
- Un deuxième clic permet de le déplacer vers une autre tour.
- Interdire de placer un grand anneau sur un plus petit.
- Interdire les déplacements depuis une tour vide.
- Permettre d'annuler une sélection.
- Mettre visuellement en évidence l'anneau sélectionné.
4. **Interface graphique**

- Utiliser un style moderne et élégant.
- Prévoir des couleurs pastel distinctes pour les anneaux.
- Ajouter des boutons arrondis, des ombres légères et un fond agréable.
- Adapter l'affichage aux petits écrans.
5. **Démonstration automatique**

- Ajouter un bouton « Démo automatique ».
- Utiliser l'algorithme récursif des Tours de Hanoï.
- Créer une fonction `resoudre(n, de, vers, via)` qui renvoie une liste de déplacements.
- Exécuter les déplacements progressivement avec un délai.
- Bloquer les déplacements manuels pendant la démonstration.
6. **Compteur de coups**

- Afficher le nombre de déplacements effectués.
- Compter uniquement les déplacements valides.
- Inclure les déplacements manuels et automatiques.
- Réinitialiser le compteur à chaque nouvelle partie.
7. **Détection de victoire**

- Détecter lorsque tous les anneaux sont sur la troisième tour, dans le bon ordre.
- Afficher « Félicitations, vous avez gagné ! ».
- Afficher le message une seule fois par partie.
- Attendre que le dernier déplacement soit visuellement terminé avant d'afficher le message.
8. **Calcul du score**

- Calculer le minimum de coups avec `2 ** n - 1`.
- Afficher le nombre minimal de coups.
- Calculer le score avec `(minimum / nombreDeCoups) * 100`.
- Arrondir le résultat et limiter le score à 100 %.
- Afficher 0 % avant le premier déplacement.
9. **Bouton Reset**

- Remettre tous les anneaux sur la première tour.
- Remettre le compteur et le score à zéro.
- Annuler les sélections.
- Arrêter immédiatement une démonstration ou une animation en cours.
- Annuler toute ancienne alerte de victoire programmée.
10. **Animations avancées**

- Chaque anneau doit se soulever verticalement, glisser horizontalement puis redescendre.
- Utiliser des animations fluides.
- Appliquer ces animations aux déplacements manuels et automatiques.
- Empêcher les interactions pendant un déplacement animé.
11. **Mode sombre / clair**

- Ajouter un bouton permettant de changer de thème.
- Conserver le thème clair par défaut.
- Adapter les couleurs de toute l'interface en mode sombre.
- Conserver le thème choisi après Démarrer et Reset.

# Contraintes techniques

- Utiliser uniquement HTML5, CSS3 et JavaScript pur.
- Ne pas utiliser de framework ni de bibliothèque externe.
- Conserver les trois fichiers séparés.
- Ne pas utiliser de serveur ni de modules JavaScript.
- Le jeu doit fonctionner en ouvrant directement `index.html`.
- Conserver les identifiants HTML demandés.
- Écrire un code simple, lisible et commenté uniquement lorsque nécessaire.
# Format de réponse attendu
Génère directement les trois fichiers complets :

1. `index.html`
2. `style.css`
3. `script.js`
Fournis un code complet, cohérent et directement exécutable.

Ne développe pas les fonctionnalités en plusieurs étapes : réalise tout le jeu avec cette seule demande.

Ne modifie pas `prompt.md` ni `prompt-final.md`.

À la fin, donne un résumé des fonctionnalités implémentées et des tests effectués.