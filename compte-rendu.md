# TP3 — No-code et Low-code

## Exercice 7 — Génération du jeu avec un prompt unique

### Question A — Influence des contraintes du prompt

Les parties du prompt qui ont eu le plus d'effet sont la liste détaillée des fonctionnalités et les contraintes techniques. Elles permettent de préciser le comportement attendu du jeu des Tours de Hanoï.

Pour étudier l'influence des contraintes, j'ai supprimé la section « Architecture obligatoire » et relancé la génération avec Claude.

Même sans cette section, Claude a utilisé trois tableaux pour représenter les tours, une fonction `deplacementValide()` pour vérifier les déplacements et une fonction `resoudre()` séparée des animations.

La principale différence observée est que la fonction d'affichage s'appelle `dessiner()` au lieu de `rendre()`.

J'en conclus qu'un prompt détaillé aide à obtenir un code organisé, même sans imposer une architecture. Cependant, les contraintes d'architecture permettent de mieux contrôler la structure du code généré.


### Tableau comparatif — GitHub Copilot et Claude

| Critère | GitHub Copilot | Claude (use.ai) |
|---|---|---|
| Fonctionnalités correctes au premier essai | Fonctionnalités principales validées | Fonctionnalités principales validées |
| Nombre de reformulations correctives | 0 | 0 |
| Taille du code HTML | 73 lignes | 40 lignes |
| Taille du code CSS | 403 lignes | 119 lignes |
| Taille du code JavaScript | 300 lignes | 267 lignes |
| Taille totale | 776 lignes | 426 lignes |
| Respect des contraintes | Conforme aux tests réalisés | Fonctionnement validé, architecture à vérifier |
| Lisibilité | Code détaillé et structuré | Code plus compact |

### Question B — Le code obtenu avec un seul prompt est-il meilleur ou moins bon que celui construit en six exercices ?

Les deux méthodes m'ont permis d'obtenir un jeu fonctionnel des Tours de Hanoï.

Avec le prompt unique, j'ai obtenu directement les fonctionnalités principales du jeu, sans avoir besoin de reformuler ma demande. Cette méthode est donc plus rapide pour générer une première version complète.

Avec les six exercices, j'ai construit le jeu progressivement. Cette méthode m'a permis de mieux comprendre chaque fonctionnalité, de tester les déplacements, les animations et le score séparément, et de corriger les problèmes au fur et à mesure.

Je trouve donc que le prompt unique est plus rapide, mais que la construction en plusieurs étapes est plus intéressante pour apprendre et contrôler le développement du jeu.

La comparaison entre Copilot et Claude montre également que deux LLM peuvent produire des codes de tailles très différentes pour un même résultat : 776 lignes pour Copilot contre 426 lignes pour Claude. La taille du code ne suffit donc pas à déterminer sa qualité.