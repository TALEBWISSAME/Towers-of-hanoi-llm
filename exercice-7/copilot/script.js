"use strict";

const entreeAnneaux = document.querySelector("#nb-anneaux");
const tours = Array.from(document.querySelectorAll(".tour"));
const compteCoups = document.querySelector("#compteur-coups");
const minimumCoups = document.querySelector("#minimum-coups");
const scoreAffiche = document.querySelector("#score");
const message = document.querySelector("#message");
const boutonTheme = document.querySelector("#btn-theme");

let etat = [[], [], []];
let nombreAnneaux = 3;
let coups = 0;
let minimum = 7;
let tourSelectionnee = null;
let enCours = false;
let demonstration = false;
let victoireAffichee = false;
let generation = 0;
let animationActive = null;
let minuterieActive = null;

function annoncer(texte) {
  message.textContent = texte;
}

function actualiserStatistiques() {
  compteCoups.textContent = String(coups);
  minimumCoups.textContent = String(minimum);
  const score = coups === 0 ? 0 : Math.min(100, Math.round((minimum / coups) * 100));
  scoreAffiche.textContent = `${score} %`;
}

function rendre() {
  tours.forEach((tour, indexTour) => {
    const pile = tour.querySelector(".pile");
    pile.replaceChildren();

    etat[indexTour].forEach((taille) => {
      const anneau = document.createElement("span");
      anneau.className = "anneau";
      anneau.dataset.taille = String(taille);
      anneau.style.width = `${44 + (taille / nombreAnneaux) * 46}%`;
      anneau.style.setProperty("--couleur-anneau", `hsl(${(taille * 47 + 175) % 360} 68% 77%)`);
      anneau.setAttribute("aria-label", `Anneau de taille ${taille}`);
      if (tourSelectionnee === indexTour && taille === etat[indexTour][etat[indexTour].length - 1]) {
        anneau.classList.add("selectionne");
      }
      pile.append(anneau);
    });

    const description = etat[indexTour].length
      ? `Tour ${indexTour + 1}, ${etat[indexTour].length} anneau${etat[indexTour].length > 1 ? "x" : ""}`
      : `Tour ${indexTour + 1}, vide`;
    tour.setAttribute("aria-label", description);
  });

  actualiserStatistiques();
}

function deplacementValide(de, vers) {
  if (!Number.isInteger(de) || !Number.isInteger(vers) || de < 0 || vers < 0 ||
      de >= etat.length || vers >= etat.length || de === vers || etat[de].length === 0) {
    return false;
  }

  const anneauDeplace = etat[de][etat[de].length - 1];
  const anneauDestination = etat[vers][etat[vers].length - 1];
  return anneauDestination === undefined || anneauDeplace < anneauDestination;
}

function annulerMinuterie() {
  if (minuterieActive !== null) {
    window.clearTimeout(minuterieActive);
    minuterieActive = null;
  }
}

function attendre(delai, numeroGeneration) {
  return new Promise((resolve) => {
    minuterieActive = window.setTimeout(() => {
      minuterieActive = null;
      resolve(numeroGeneration === generation);
    }, delai);
  });
}

function terminerAnimation() {
  if (!animationActive) {
    return Promise.resolve();
  }

  const animation = animationActive;
  return animation.finished.then(
    () => {
      if (animationActive === animation) animationActive = null;
    },
    () => {
      if (animationActive === animation) animationActive = null;
    }
  );
}

function annulerActionsEnCours() {
  generation += 1;
  annulerMinuterie();
  if (animationActive) {
    animationActive.cancel();
    animationActive = null;
  }
  document.querySelectorAll(".anneau-anime").forEach((anneau) => anneau.remove());
  enCours = false;
  demonstration = false;
  return generation;
}

async function deplacer(de, vers, numeroGeneration) {
  if (!deplacementValide(de, vers)) return false;

  const tourSource = tours[de];
  const anneauSource = tourSource.querySelector(".anneau:last-child");
  if (!anneauSource) return false;

  const depart = anneauSource.getBoundingClientRect();
  const largeur = depart.width;
  const hauteur = depart.height;
  const anneauAnime = anneauSource.cloneNode(true);
  anneauAnime.classList.remove("selectionne");
  anneauAnime.classList.add("anneau-anime");
  anneauAnime.setAttribute("aria-hidden", "true");
  anneauAnime.style.position = "fixed";
  anneauAnime.style.left = `${depart.left}px`;
  anneauAnime.style.top = `${depart.top}px`;
  anneauAnime.style.width = `${largeur}px`;
  anneauAnime.style.height = `${hauteur}px`;
  document.body.append(anneauAnime);

  etat[de].pop();
  etat[vers].push(Number(anneauSource.dataset.taille));
  coups += 1;
  tourSelectionnee = null;
  rendre();

  const anneauDestination = tours[vers].querySelector(".anneau:last-child");
  const arrivee = anneauDestination.getBoundingClientRect();
  anneauDestination.style.visibility = "hidden";
  const decalageX = arrivee.left - depart.left;
  const decalageY = arrivee.top - depart.top;
  const hauteurLevee = Math.max(75, Math.abs(decalageY) + 60);
  const duree = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 700;
  animationActive = anneauAnime.animate(
    [
      { transform: "translate(0, 0)", offset: 0 },
      { transform: `translate(0, -${hauteurLevee}px)`, offset: 0.3 },
      { transform: `translate(${decalageX}px, -${hauteurLevee}px)`, offset: 0.7 },
      { transform: `translate(${decalageX}px, ${decalageY}px)`, offset: 1 }
    ],
    { duration: duree, easing: "ease-in-out", fill: "forwards" }
  );

  await terminerAnimation();
  anneauAnime.remove();
  anneauDestination.style.visibility = "";
  if (numeroGeneration !== generation) return false;

  enCours = false;
  rendre();
  verifierVictoire();
  return true;
}

function verifierVictoire() {
  if (victoireAffichee || etat[2].length !== nombreAnneaux ||
      etat[0].length !== 0 || etat[1].length !== 0) {
    return;
  }

  victoireAffichee = true;
  demonstration = false;
  annoncer("Félicitations, vous avez gagné !");
}

function gererClicTour(index) {
  if (enCours || demonstration || victoireAffichee) return;

  if (tourSelectionnee === null) {
    if (etat[index].length === 0) {
      annoncer("Cette tour est vide : aucun anneau à sélectionner.");
      return;
    }
    tourSelectionnee = index;
    annoncer("Anneau sélectionné. Choisissez une tour de destination, ou recliquez pour annuler.");
    rendre();
    return;
  }

  if (tourSelectionnee === index) {
    tourSelectionnee = null;
    annoncer("Sélection annulée.");
    rendre();
    return;
  }

  if (!deplacementValide(tourSelectionnee, index)) {
    annoncer("Déplacement impossible : un grand anneau ne peut pas recouvrir un plus petit.");
    return;
  }

  enCours = true;
  annoncer("Déplacement en cours…");
  deplacer(tourSelectionnee, index, generation).then((deplacementEffectue) => {
    if (deplacementEffectue && !victoireAffichee) annoncer("À vous de jouer.");
  });
}

function lireNombreAnneaux() {
  const valeur = entreeAnneaux.valueAsNumber;
  if (!Number.isInteger(valeur) || valeur < 1 || valeur > 8) {
    entreeAnneaux.setCustomValidity("Entrez un nombre entier compris entre 1 et 8.");
    entreeAnneaux.reportValidity();
    entreeAnneaux.setCustomValidity("");
    entreeAnneaux.focus();
    return null;
  }
  return valeur;
}

function nouvellePartie(valeur) {
  annulerActionsEnCours();
  nombreAnneaux = valeur;
  entreeAnneaux.value = String(valeur);
  etat = [Array.from({ length: valeur }, (_, index) => valeur - index), [], []];
  coups = 0;
  minimum = 2 ** valeur - 1;
  tourSelectionnee = null;
  victoireAffichee = false;
  rendre();
  annoncer("Choisissez une tour pour sélectionner un anneau.");
}

function resoudre(n, de, vers, via) {
  const mouvements = [];
  function deplacerRecursivement(nombre, source, destination, intermediaire) {
    if (nombre === 0) return;
    deplacerRecursivement(nombre - 1, source, intermediaire, destination);
    mouvements.push([source, destination]);
    deplacerRecursivement(nombre - 1, intermediaire, destination, source);
  }
  deplacerRecursivement(n, de, vers, via);
  return mouvements;
}

async function lancerDemonstration() {
  const numeroAnneaux = lireNombreAnneaux();
  if (numeroAnneaux === null) return;

  nouvellePartie(numeroAnneaux);
  const numeroGeneration = generation;
  const mouvements = resoudre(numeroAnneaux, 0, 2, 1);
  demonstration = true;
  annoncer("Démonstration en cours…");

  for (let index = 0; index < mouvements.length; index += 1) {
    if (numeroGeneration !== generation) return;
    enCours = true;
    const [de, vers] = mouvements[index];
    const mouvementEffectue = await deplacer(de, vers, numeroGeneration);
    if (!mouvementEffectue || numeroGeneration !== generation) return;
    if (index < mouvements.length - 1 && !(await attendre(240, numeroGeneration))) return;
  }

  demonstration = false;
  if (!victoireAffichee) annoncer("Démonstration terminée.");
}

document.querySelector("#btn-demarrer").addEventListener("click", () => {
  const valeur = lireNombreAnneaux();
  if (valeur !== null) nouvellePartie(valeur);
});

document.querySelector("#btn-reset").addEventListener("click", () => {
  nouvellePartie(nombreAnneaux);
});

document.querySelector("#btn-demo").addEventListener("click", lancerDemonstration);

tours.forEach((tour, index) => {
  tour.addEventListener("click", () => gererClicTour(index));
});

boutonTheme.addEventListener("click", () => {
  const sombre = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = sombre ? "dark" : "light";
  boutonTheme.setAttribute("aria-pressed", String(sombre));
  boutonTheme.innerHTML = sombre
    ? '<span aria-hidden="true">☀</span> Mode clair'
    : '<span aria-hidden="true">☾</span> Mode sombre';
});

nouvellePartie(3);