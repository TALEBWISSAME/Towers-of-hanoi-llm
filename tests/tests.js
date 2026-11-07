const listeResultats = document.getElementById("resultats");
const affichageBilan = document.getElementById("bilan");
let testsReussis = 0;
let testsEchoues = 0;

function verifier(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function pilesInitiales(nombreAnneaux) {
  const premiereTour = [];
  for (let taille = nombreAnneaux; taille >= 1; taille--) {
    premiereTour.push(taille);
  }
  return [premiereTour, [], []];
}

function verifierResolution(nombreAnneaux, nombreCoupsAttendu) {
  const toursAvantResolution = tours.map((pile) => pile.slice());
  const coups = resoudre(nombreAnneaux, 0, 2, 1);
  verifier(
    coups.length === nombreCoupsAttendu,
    `Nombre de déplacements attendu : ${nombreCoupsAttendu}, obtenu : ${coups.length}.`
  );
  verifier(
    JSON.stringify(tours) === JSON.stringify(toursAvantResolution),
    "resoudre() ne doit pas modifier l'état des tours."
  );

  tours = pilesInitiales(nombreAnneaux);
  coups.forEach(([de, vers], index) => {
    verifier(
      deplacementValide(de, vers),
      `Le déplacement ${index + 1} (${de} vers ${vers}) est interdit.`
    );
    const anneau = tours[de].pop();
    verifier(
      anneau !== undefined,
      `Le déplacement ${index + 1} tente de déplacer un anneau inexistant.`
    );
    tours[vers].push(anneau);
  });

  verifier(
    JSON.stringify(tours) ===
      JSON.stringify([[], [], pilesInitiales(nombreAnneaux)[0]]),
    "Tous les anneaux doivent terminer sur la troisième tour, du plus grand au plus petit."
  );
}

function executerTest(nom, test) {
  const etatSauvegarde = {
    tours: tours.map((pile) => pile.slice()),
    nombreAnneauxInitial,
    nombreMinimalCoups,
    compteurCoups,
    tourSelectionnee,
    tourRefusee,
    victoireAnnoncee,
    valeurChamp: champAnneaux.value,
    theme: document.documentElement.getAttribute("data-theme"),
    ariaTheme: boutonTheme.getAttribute("aria-pressed")
  };

  try {
    test();
    testsReussis++;
    ajouterResultat("Réussi", nom, true);
  } catch (erreur) {
    testsEchoues++;
    ajouterResultat("Échoué", `${nom} — ${erreur.message}`, false);
  } finally {
    clearTimeout(minuterieRefus);
    clearTimeout(minuterieDemo);
    clearTimeout(minuterieVictoire);
    annulerAnimation();
    minuterieRefus = null;
    minuterieDemo = null;
    minuterieVictoire = null;
    demonstrationEnCours = false;
    tours = etatSauvegarde.tours;
    nombreAnneauxInitial = etatSauvegarde.nombreAnneauxInitial;
    nombreMinimalCoups = etatSauvegarde.nombreMinimalCoups;
    compteurCoups = etatSauvegarde.compteurCoups;
    tourSelectionnee = etatSauvegarde.tourSelectionnee;
    tourRefusee = etatSauvegarde.tourRefusee;
    victoireAnnoncee = etatSauvegarde.victoireAnnoncee;
    champAnneaux.value = etatSauvegarde.valeurChamp;
    if (etatSauvegarde.theme === null) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", etatSauvegarde.theme);
    }
    if (etatSauvegarde.ariaTheme === null) {
      boutonTheme.removeAttribute("aria-pressed");
    } else {
      boutonTheme.setAttribute("aria-pressed", etatSauvegarde.ariaTheme);
    }
    mettreAJourCompteur();
    mettreAJourScore();
    rendre();
  }
}

function ajouterResultat(statut, nom, reussi) {
  const resultat = document.createElement("li");
  resultat.className = reussi ? "reussi" : "echoue";
  resultat.textContent = `${statut} : ${nom}`;
  listeResultats.appendChild(resultat);
}

executerTest("resoudre() avec 1 anneau : 1 déplacement valide", () => {
  verifierResolution(1, 1);
});

executerTest("resoudre() avec 2 anneaux : 3 déplacements valides", () => {
  verifierResolution(2, 3);
});

executerTest("resoudre() avec 3 anneaux : 7 déplacements valides", () => {
  verifierResolution(3, 7);
});

executerTest("deplacementValide() refuse une tour de départ vide", () => {
  tours = [[], [], []];
  verifier(!deplacementValide(0, 1), "Une tour vide ne peut pas fournir d'anneau.");
});

executerTest("deplacementValide() autorise un déplacement vers une tour vide", () => {
  tours = [[1], [], []];
  verifier(deplacementValide(0, 1), "Le déplacement vers une tour vide devrait être autorisé.");
});

executerTest("deplacementValide() refuse un grand anneau sur un petit", () => {
  tours = [[3], [1], []];
  verifier(!deplacementValide(0, 1), "Le grand anneau ne doit pas être posé sur le petit.");
});

executerTest("deplacementValide() refuse un déplacement vers la même tour", () => {
  tours = [[1], [], []];
  verifier(!deplacementValide(0, 0), "La tour de départ et d'arrivée ne peuvent pas être identiques.");
});

executerTest("resoudre() avec 4 anneaux : 15 déplacements légaux et état final ordonné", () => {
  verifierResolution(4, 15);
});

executerTest("resoudre() avec 5 anneaux : 31 déplacements légaux et état final ordonné", () => {
  verifierResolution(5, 31);
});

executerTest("resoudre() avec 6 anneaux : 63 déplacements légaux et état final ordonné", () => {
  verifierResolution(6, 63);
});

executerTest("resoudre() avec 7 anneaux : 127 déplacements légaux et état final ordonné", () => {
  verifierResolution(7, 127);
});

executerTest("resoudre() avec 8 anneaux : 255 déplacements légaux et état final ordonné", () => {
  verifierResolution(8, 255);
});

executerTest("deplacementValide() autorise un petit anneau sur un grand", () => {
  tours = [[1], [3], []];
  verifier(deplacementValide(0, 1), "Un petit anneau peut être posé sur un grand.");
});

executerTest("deplacementValide() autorise les six déplacements entre tours distinctes vides", () => {
  const combinaisons = [
    [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]
  ];

  combinaisons.forEach(([de, vers]) => {
    tours = [[], [], []];
    tours[de].push(1);
    verifier(
      deplacementValide(de, vers),
      `Le déplacement de la tour ${de} vers la tour ${vers} devrait être valide.`
    );
  });
});

executerTest("deplacementValide() vérifie l'anneau supérieur de la tour de départ", () => {
  tours = [[3, 1], [2], []];
  verifier(
    deplacementValide(0, 1),
    "L'anneau supérieur de taille 1 peut être posé sur l'anneau de taille 2."
  );
});

executerTest("deplacementValide() refuse deux anneaux de même taille", () => {
  tours = [[2], [2], []];
  verifier(!deplacementValide(0, 1), "Deux anneaux de même taille ne peuvent pas être empilés.");
});

executerTest("deplacementValide() ne modifie pas les piles", () => {
  tours = [[3, 1], [2], []];
  const pilesAvant = JSON.stringify(tours);
  deplacementValide(0, 1);
  verifier(
    JSON.stringify(tours) === pilesAvant,
    "La validation d'un déplacement ne doit pas modifier l'état du jeu."
  );
});

executerTest("initialiserPartie() crée correctement une partie à 1 anneau", () => {
  initialiserPartie(1);
  verifier(
    JSON.stringify(tours) === JSON.stringify([[1], [], []]),
    "Un anneau doit être placé seul sur la première tour."
  );
});

executerTest("initialiserPartie() crée correctement une partie à 8 anneaux", () => {
  initialiserPartie(8);
  verifier(
    JSON.stringify(tours) === JSON.stringify([[8, 7, 6, 5, 4, 3, 2, 1], [], []]),
    "Huit anneaux doivent être placés du plus grand au plus petit sur la première tour."
  );
});

executerTest("initialiserPartie() réinitialise compteurs, sélection et victoire", () => {
  initialiserPartie(3);
  compteurCoups = 5;
  tourSelectionnee = 0;
  tourRefusee = 1;
  victoireAnnoncee = true;
  initialiserPartie(8);

  verifier(compteurCoups === 0, "Le compteur doit revenir à zéro.");
  verifier(nombreMinimalCoups === 255, "Le minimum théorique pour 8 anneaux doit être 255.");
  verifier(affichageScore.textContent.includes("0 %"), "Le score doit revenir à 0 %.");
  verifier(tourSelectionnee === null, "La sélection doit être annulée.");
  verifier(tourRefusee === null, "L'indication de tour refusée doit être effacée.");
  verifier(!victoireAnnoncee, "L'état de victoire doit être réinitialisé.");
});

executerTest("compterCoup() actualise le compteur et calcule le score avec plafond et arrondi", () => {
  initialiserPartie(3);
  compterCoup();
  verifier(compteurCoups === 1, "Le compteur interne doit passer à 1.");
  verifier(affichageCompteur.textContent.endsWith("1"), "L'affichage du compteur doit indiquer 1.");
  verifier(affichageScore.textContent.includes("100 %"), "Le score ne doit pas dépasser 100 %.");

  for (let index = 1; index < 14; index++) {
    compterCoup();
  }
  verifier(compteurCoups === 14, "Quatorze appels doivent compter quatorze coups.");
  verifier(affichageScore.textContent.includes("50 %"), "Le score pour 7 sur 14 coups doit être 50 %.");

  initialiserPartie(3);
  for (let index = 0; index < 12; index++) {
    compterCoup();
  }
  verifier(
    affichageScore.textContent.includes("58 %"),
    "Le score 7 / 12 doit être arrondi à 58 %."
  );
});

executerTest("Démarrer initialise le nombre saisi et remet les statistiques à zéro", () => {
  initialiserPartie(2);
  compteurCoups = 4;
  champAnneaux.value = "4";
  boutonDemarrer.click();

  verifier(nombreAnneauxInitial === 4, "La partie doit utiliser le nombre saisi.");
  verifier(
    JSON.stringify(tours) === JSON.stringify([[4, 3, 2, 1], [], []]),
    "Démarrer doit replacer les quatre anneaux sur la première tour."
  );
  verifier(compteurCoups === 0, "Démarrer doit remettre le compteur à zéro.");
  verifier(nombreMinimalCoups === 15, "Le minimum théorique pour 4 anneaux doit être 15.");
});

executerTest("Reset remet la partie à l'état initial en conservant son nombre d'anneaux", () => {
  initialiserPartie(4);
  tours = [[], [4, 3, 2, 1], []];
  compteurCoups = 9;
  tourSelectionnee = 1;
  victoireAnnoncee = true;
  boutonReset.click();

  verifier(
    JSON.stringify(tours) === JSON.stringify([[4, 3, 2, 1], [], []]),
    "Reset doit replacer tous les anneaux sur la première tour."
  );
  verifier(compteurCoups === 0, "Reset doit remettre le compteur à zéro.");
  verifier(affichageScore.textContent.includes("0 %"), "Reset doit remettre le score à zéro.");
  verifier(tourSelectionnee === null, "Reset doit annuler la sélection.");
  verifier(!victoireAnnoncee, "Reset doit effacer l'état de victoire.");
});

executerTest("verifierVictoire() ne signale pas une partie incomplète", () => {
  initialiserPartie(2);
  tours = [[2], [], [1]];
  verifier(!verifierVictoire(), "Une partie non résolue ne doit pas être déclarée gagnée.");
});

executerTest("verifierVictoire() reconnaît la solution et ne la signale qu'une fois", () => {
  initialiserPartie(2);
  tours = [[], [], [2, 1]];
  verifier(verifierVictoire(), "La configuration résolue doit déclencher une nouvelle victoire.");
  verifier(!verifierVictoire(), "Une victoire déjà annoncée ne doit pas être signalée une seconde fois.");
});

executerTest("verifierVictoire() refuse une troisième tour dans le mauvais ordre", () => {
  initialiserPartie(3);
  tours = [[], [], [1, 2, 3]];
  verifier(!verifierVictoire(), "Les anneaux doivent être rangés du plus grand au plus petit.");
});

executerTest("rendre() affiche les piles dans l'ordre et distingue l'anneau sélectionné", () => {
  tours = [[3, 1], [2], []];
  tourSelectionnee = 0;
  rendre();

  const anneauxTourUn = Array.from(elementsTours[0].children);
  verifier(
    anneauxTourUn.map((anneau) => anneau.textContent).join(",") === "3,1",
    "La première tour doit afficher les anneaux dans l'ordre de la pile."
  );
  verifier(
    anneauxTourUn[1].classList.contains("anneau-selectionne"),
    "Seul l'anneau supérieur de la tour sélectionnée doit être mis en évidence."
  );
  verifier(elementsTours[1].children[0].textContent === "2", "La deuxième tour doit afficher son anneau.");
});

affichageBilan.textContent =
  `Bilan : ${testsReussis} test(s) réussi(s), ${testsEchoues} test(s) échoué(s), ` +
  `${testsReussis + testsEchoues} test(s) au total.`;
