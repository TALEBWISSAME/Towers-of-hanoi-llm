const champAnneaux = document.getElementById("nb-anneaux");
const boutonDemarrer = document.getElementById("btn-demarrer");
const elementsTours = document.querySelectorAll(".tour");

let tours = [[], [], []];
let tourSelectionnee = null;
let tourRefusee = null;
let minuterieRefus = null;

function rendre() {
  tours.forEach((anneaux, indexTour) => {
    const elementTour = elementsTours[indexTour];
    elementTour.replaceChildren();
    elementTour.classList.toggle("tour-refusee", tourRefusee === indexTour);

    anneaux.forEach((taille, indexAnneau) => {
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
    });
  });
}

function deplacementValide(de, vers) {
  if (de === vers || tours[de].length === 0) {
    return false;
  }

  const anneauDeplace = tours[de][tours[de].length - 1];
  const anneauArrivee = tours[vers][tours[vers].length - 1];

  return anneauArrivee === undefined || anneauDeplace < anneauArrivee;
}

elementsTours.forEach((elementTour, indexTour) => {
  elementTour.addEventListener("click", () => {
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
      const anneauDeplace = tours[tourSelectionnee].pop();
      tours[indexTour].push(anneauDeplace);
      tourSelectionnee = null;
      tourRefusee = null;
      clearTimeout(minuterieRefus);
      rendre();
      return;
    }

    tourRefusee = indexTour;
    clearTimeout(minuterieRefus);
    rendre();
    minuterieRefus = setTimeout(() => {
      tourRefusee = null;
      rendre();
    }, 500);
  });
});

boutonDemarrer.addEventListener("click", () => {
  const valeur = champAnneaux.value.trim();
  const nombreAnneaux = Number(valeur);

  if (
    valeur === "" ||
    !Number.isInteger(nombreAnneaux) ||
    nombreAnneaux < 1 ||
    nombreAnneaux > 8
  ) {
    alert("Choisissez un nombre entier entre 1 et 8.");
    return;
  }

  const premiereTour = [];
  for (let taille = nombreAnneaux; taille >= 1; taille--) {
    premiereTour.push(taille);
  }

  tours = [premiereTour, [], []];
  tourSelectionnee = null;
  tourRefusee = null;
  clearTimeout(minuterieRefus);
  rendre();
});

rendre();