const champAnneaux = document.getElementById("nb-anneaux");
const boutonDemarrer = document.getElementById("btn-demarrer");
const boutonDemo = document.getElementById("btn-demo");
const boutonReset = document.getElementById("btn-reset");
const boutonTheme = document.getElementById("btn-theme");
const affichageCompteur = document.getElementById("compteur-coups");
const affichageCoupsMinimum = document.getElementById("coups-minimum");
const affichageScore = document.getElementById("score");
const elementsTours = document.querySelectorAll(".tour");
const delaiDemo = 600;
const dureeAnimation = 900;
const hauteurAnimation = 70;

let tours = [[], [], []];
let nombreAnneauxInitial = Number(champAnneaux.value);
let nombreMinimalCoups = 2 ** nombreAnneauxInitial - 1;
let compteurCoups = 0;
let tourSelectionnee = null;
let tourRefusee = null;
let minuterieRefus = null;
let minuterieDemo = null;
let minuterieVictoire = null;
let demonstrationEnCours = false;
let animationEnCours = false;
let animationAnneau = null;
let numeroAnimation = 0;
let victoireAnnoncee = false;

/**
 * Met à jour dans la page le nombre de coups effectué.
 * Effet de bord : modifie le texte de l'élément du compteur dans le DOM.
 * @returns {void}
 */
function mettreAJourCompteur() {
  affichageCompteur.textContent = `Nombre de coups : ${compteurCoups}`;
}

/**
 * Recalcule le minimum de coups et le score, puis actualise leur affichage.
 * Effet de bord : modifie le DOM et la variable nombreMinimalCoups.
 * @returns {void}
 */
function mettreAJourScore() {
  nombreMinimalCoups = 2 ** nombreAnneauxInitial - 1;
  const score =
    compteurCoups === 0
      ? 0
      : Math.min(100, Math.round((nombreMinimalCoups / compteurCoups) * 100));

  affichageCoupsMinimum.textContent =
    `Nombre minimal de coups : ${nombreMinimalCoups}`;
  affichageScore.textContent = `Score : ${score} %`;
}

/**
 * Compte un déplacement et met à jour ses affichages.
 * Effet de bord : incrémente compteurCoups et modifie le DOM.
 * @returns {void}
 */
function compterCoup() {
  compteurCoups++;
  mettreAJourCompteur();
  mettreAJourScore();
}

/**
 * Vérifie si tous les anneaux sont correctement placés sur la troisième tour.
 * Si une victoire est détectée pour la première fois, programme une alerte
 * après un délai de 100 ms et marque la victoire comme annoncée.
 *
 * Effets de bord : modifie victoireAnnoncee et minuterieVictoire,
 * et programme l'affichage d'une alerte.
 *
 * @returns {boolean} true uniquement si une nouvelle victoire est détectée
 * et que son alerte vient d'être programmée ; false dans les autres cas.
 */
function verifierVictoire() {
  const tousLesAnneauxSurTroisiemeTour =
    nombreAnneauxInitial > 0 &&
    tours[0].length === 0 &&
    tours[1].length === 0 &&
    tours[2].length === nombreAnneauxInitial &&
    tours[2].every(
      /**
       * Vérifie que les tailles de la troisième pile sont dans l'ordre attendu.
       * @param {number} taille Taille de l'anneau à cette position.
       * @param {number} index Position de l'anneau dans la pile.
       * @returns {boolean} Vrai si l'anneau est à sa position attendue.
       */
      (taille, index) => taille === nombreAnneauxInitial - index
    );

  if (tousLesAnneauxSurTroisiemeTour && !victoireAnnoncee) {
    victoireAnnoncee = true;
    minuterieVictoire = setTimeout(
      /**
       * Affiche le message après avoir laissé le navigateur rafraîchir la page.
       * Effet de bord : affiche une alerte et modifie minuterieVictoire.
       * @returns {void}
       */
      () => {
        minuterieVictoire = null;
        alert("Félicitations, vous avez gagné !");
      },
      100
    );
    return true;
  }

  return false;
}

/**
 * Reconstruit l'affichage des anneaux à partir des piles et de la sélection.
 * Effet de bord : remplace les enfants des tours et leurs classes dans le DOM.
 * @returns {void}
 */
function rendre() {
  tours.forEach(
    /**
     * Reconstruit l'affichage d'une tour et de ses anneaux.
     * Effet de bord : crée et ajoute des éléments au DOM de cette tour.
     * @param {number[]} anneaux Tailles des anneaux placés sur la tour.
     * @param {number} indexTour Indice de la tour dans les piles.
     * @returns {void}
     */
    (anneaux, indexTour) => {
       const elementTour = elementsTours[indexTour];
       elementTour.replaceChildren();
       elementTour.classList.toggle("tour-refusee", tourRefusee === indexTour);

       anneaux.forEach(
         /**
          * Crée l'élément visuel correspondant à un anneau.
          * Effet de bord : crée et ajoute un élément au DOM.
          * @param {number} taille Taille de l'anneau.
          * @param {number} indexAnneau Position de l'anneau dans sa pile.
          * @returns {void}
          */
         (taille, indexAnneau) => {
           const anneau = document.createElement("div");
           anneau.classList.add("anneau");
           if (
             tourSelectionnee === indexTour &&
             indexAnneau === anneaux.length - 1
           ) {
             anneau.classList.add("anneau-selectionne");
           }
           anneau.style.width = `${42 + taille * 10}px`;
           anneau.textContent = taille;
           elementTour.appendChild(anneau);
         }
       );
    }
  );
}

/**
 * Vérifie, à partir des seules piles JavaScript, si un coup est autorisé.
 * @param {number} de Indice de la tour de départ.
 * @param {number} vers Indice de la tour d'arrivée.
 * @returns {boolean} Vrai si le coup respecte les règles, sinon faux.
 */
function deplacementValide(de, vers) {
  if (de === vers || tours[de].length === 0) {
    return false;
  }

  const anneauDeplace = tours[de][tours[de].length - 1];
  const anneauArrivee = tours[vers][tours[vers].length - 1];

  return anneauArrivee === undefined || anneauDeplace < anneauArrivee;
}

/**
 * Calcule récursivement les déplacements nécessaires pour résoudre le jeu.
 * Cette fonction ne modifie ni l'état du jeu ni le DOM.
 * @param {number} n Nombre d'anneaux à déplacer.
 * @param {number} de Indice de la tour de départ.
 * @param {number} vers Indice de la tour de destination.
 * @param {number} via Indice de la tour intermédiaire.
 * @returns {Array<[number, number]>} Liste de couples [de, vers] représentant les déplacements.
 */
function resoudre(n, de, vers, via) {
  if (n === 0) {
    return [];
  }

  return [
    ...resoudre(n - 1, de, via, vers),
    [de, vers],
    ...resoudre(n - 1, via, vers, de)
  ];
}

/**
 * Lit et valide le nombre d'anneaux indiqué dans le champ.
 * Effet de bord : affiche une alerte si la valeur n'est pas valide.
 * @returns {number | null} Nombre entier entre 1 et 8, ou null si invalide.
 */
function obtenirNombreAnneaux() {
  const valeur = champAnneaux.value.trim();
  const nombreAnneaux = Number(valeur);

  if (
    valeur === "" ||
    !Number.isInteger(nombreAnneaux) ||
    nombreAnneaux < 1 ||
    nombreAnneaux > 8
  ) {
    alert("Choisissez un nombre entier entre 1 et 8.");
    return null;
  }

  return nombreAnneaux;
}

/**
 * Arrête la démonstration automatique et annule son prochain coup programmé.
 * Effet de bord : modifie l'état de la démonstration et sa minuterie.
 * @returns {void}
 */
function annulerDemonstration() {
  demonstrationEnCours = false;
  clearTimeout(minuterieDemo);
  minuterieDemo = null;
}

/**
 * Annule l'animation courante et invalide son éventuel rappel de fin.
 * Effet de bord : modifie l'état de l'animation et annule l'animation Web.
 * @returns {void}
 */
function annulerAnimation() {
  numeroAnimation++;
  animationEnCours = false;

  if (animationAnneau !== null) {
    animationAnneau.cancel();
    animationAnneau = null;
  }
}

/**
 * Déplace un anneau dans les piles, anime son trajet et appelle le rappel final.
 * Effets de bord : modifie les piles et le compteur, met à jour le DOM et lance
 * une animation Web.
 * @param {number} de Indice de la tour de départ.
 * @param {number} vers Indice de la tour d'arrivée.
 * @param {() => void} apresDeplacement Fonction appelée lorsque l'animation finit.
 * @returns {void}
 */
function deplacerAvecAnimation(de, vers, apresDeplacement) {
  const anneauDeplace = tours[de][tours[de].length - 1];
  const elementDepart = elementsTours[de].lastElementChild;
  const positionDepart = elementDepart.getBoundingClientRect();

  tours[de].pop();
  tours[vers].push(anneauDeplace);
  tourSelectionnee = null;
  tourRefusee = null;
  clearTimeout(minuterieRefus);
  compterCoup();
  rendre();

  const elementArrivee = elementsTours[vers].lastElementChild;
  const positionArrivee = elementArrivee.getBoundingClientRect();
  const decalageX = positionDepart.left - positionArrivee.left;
  const decalageY = positionDepart.top - positionArrivee.top;
  const animationId = ++numeroAnimation;

  animationEnCours = true;
  animationAnneau = elementArrivee.animate(
    [
      {
        transform: `translate(${decalageX}px, ${decalageY}px)`,
        offset: 0
      },
      {
        transform: `translate(${decalageX}px, ${decalageY - hauteurAnimation}px)`,
        offset: 0.25
      },
      {
        transform: `translate(0, -${hauteurAnimation}px)`,
        offset: 0.75
      },
      { transform: "translate(0, 0)", offset: 1 }
    ],
    {
      duration: dureeAnimation,
      easing: "ease-in-out",
      fill: "both"
    }
  );

  /**
   * Termine l'animation courante si elle n'a pas été annulée.
   * Effet de bord : annule l'effet d'animation, libère le verrou et appelle
   * apresDeplacement.
   * @returns {void}
   */
  animationAnneau.onfinish = () => {
    if (animationId !== numeroAnimation) {
      return;
    }

    animationAnneau.cancel();
    animationAnneau = null;
    animationEnCours = false;
    apresDeplacement();
  };
}

/**
 * Crée une nouvelle partie avec tous les anneaux sur la première tour.
 * Effets de bord : remplace les piles, réinitialise compteurs et sélection,
 * annule animations/minuteries et reconstruit l'affichage.
 * @param {number} nombreAnneaux Nombre d'anneaux de la nouvelle partie.
 * @returns {void}
 */
function initialiserPartie(nombreAnneaux) {
  annulerAnimation();
  const premiereTour = [];
  for (let taille = nombreAnneaux; taille >= 1; taille--) {
    premiereTour.push(taille);
  }

  tours = [premiereTour, [], []];
  nombreAnneauxInitial = nombreAnneaux;
  compteurCoups = 0;
  mettreAJourCompteur();
  mettreAJourScore();
  victoireAnnoncee = false;
  tourSelectionnee = null;
  tourRefusee = null;
  clearTimeout(minuterieRefus);
  clearTimeout(minuterieVictoire);
  minuterieVictoire = null;
  rendre();
}

/**
 * Exécute le coup indiqué, puis programme le suivant après l'animation.
 * Effets de bord : modifie les piles, le compteur, le DOM et les minuteries.
 * @param {Array<[number, number]>} coups Liste des coups prévus.
 * @param {number} [index=0] Indice du prochain coup à effectuer.
 * @returns {void}
 */
function executerCoups(coups, index = 0) {
  if (!demonstrationEnCours) {
    return;
  }

  if (index >= coups.length) {
    demonstrationEnCours = false;
    minuterieDemo = null;
    return;
  }

  const [de, vers] = coups[index];
  deplacerAvecAnimation(
    de,
    vers,
    /**
     * Vérifie la victoire à la fin de l'animation et programme le coup suivant.
     * Effet de bord : peut programmer une minuterie pour poursuivre la démo.
     * @returns {void}
     */
    () => {
    const victoire = verifierVictoire();

    if (victoire || index + 1 >= coups.length) {
      demonstrationEnCours = false;
      minuterieDemo = null;
    } else {
      minuterieDemo = setTimeout(
        /**
         * Lance le coup suivant de la démonstration.
         * Effet de bord : poursuit l'exécution temporisée des coups.
         * @returns {void}
         */
        () => {
          executerCoups(coups, index + 1);
        },
        delaiDemo
      );
    }
    }
  );
}

elementsTours.forEach(
  /**
   * Ajoute le gestionnaire de clic à chaque tour.
   * @param {Element} elementTour Élément DOM de la tour.
   * @param {number} indexTour Indice de la tour dans les piles.
   * @returns {void}
   */
  (elementTour, indexTour) => {
  elementTour.addEventListener(
    "click",
    /**
     * Gère les clics sur une tour : sélection, annulation ou tentative de coup.
     * Effets de bord : modifie sélection/état, DOM, animations et minuteries.
     * @returns {void}
     */
    () => {
    if (demonstrationEnCours || animationEnCours) {
      return;
    }

    if (tourSelectionnee === null) {
      if (tours[indexTour].length === 0) {
        return;
      }

      tourSelectionnee = indexTour;
      rendre();
      return;
    }

    if (tourSelectionnee === indexTour) {
      tourSelectionnee = null;
      rendre();
      return;
    }

    if (deplacementValide(tourSelectionnee, indexTour)) {
      deplacerAvecAnimation(tourSelectionnee, indexTour, verifierVictoire);
      return;
    }

    tourRefusee = indexTour;
    clearTimeout(minuterieRefus);
    rendre();
    minuterieRefus = setTimeout(
      /**
       * Retire après un délai le retour visuel d'un coup refusé.
       * Effet de bord : modifie l'état et l'affichage de la tour refusée.
       * @returns {void}
       */
      () => {
        tourRefusee = null;
        rendre();
      },
      500
    );
    }
  );
  }
);

boutonDemarrer.addEventListener(
  "click",
  /**
   * Valide la valeur du champ et démarre une nouvelle partie.
   * Effet de bord : arrête la démo et réinitialise le jeu et son affichage.
   * @returns {void}
   */
  () => {
  const nombreAnneaux = obtenirNombreAnneaux();
  if (nombreAnneaux === null) {
    return;
  }

  annulerDemonstration();
  initialiserPartie(nombreAnneaux);
  }
);

boutonDemo.addEventListener(
  "click",
  /**
   * Initialise et démarre la résolution automatique de la partie.
   * Effets de bord : lit le champ, réinitialise les piles et programme la démo.
   * @returns {void}
   */
  () => {
  const nombreAnneaux = obtenirNombreAnneaux();
  if (nombreAnneaux === null) {
    return;
  }

  annulerDemonstration();
  initialiserPartie(nombreAnneaux);
  demonstrationEnCours = true;
  const coups = resoudre(nombreAnneaux, 0, 2, 1);
  minuterieDemo = setTimeout(
    /**
     * Lance le premier coup de la démonstration.
     * Effet de bord : démarre l'exécution animée des coups.
     * @returns {void}
     */
    () => {
      executerCoups(coups);
    },
    delaiDemo
  );
  }
);

boutonReset.addEventListener(
  "click",
  /**
   * Arrête la démo et réinitialise la partie avec son nombre d'anneaux actuel.
   * Effet de bord : annule minuteries/animation et met à jour l'état et le DOM.
   * @returns {void}
   */
  () => {
    annulerDemonstration();
    initialiserPartie(nombreAnneauxInitial);
  }
);

boutonTheme.addEventListener(
  "click",
  /**
   * Bascule entre les thèmes sombre et clair et met à jour l'état accessible.
   * Effet de bord : modifie l'attribut de thème et aria-pressed dans le DOM.
   * @returns {void}
   */
  () => {
    const modeSombreActif = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = modeSombreActif ? "dark" : "light";
    boutonTheme.setAttribute("aria-pressed", String(modeSombreActif));
  }
);

mettreAJourCompteur();
mettreAJourScore();
rendre();