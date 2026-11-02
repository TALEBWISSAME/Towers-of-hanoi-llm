const champAnneaux = document.getElementById("nb-anneaux");
const boutonDemarrer = document.getElementById("btn-demarrer");
const elementsTours = document.querySelectorAll(".tour");

let tours = [[], [], []];

function rendre() {
  tours.forEach((anneaux, indexTour) => {
    const elementTour = elementsTours[indexTour];
    elementTour.replaceChildren();

    anneaux.forEach((taille) => {
      const anneau = document.createElement("div");
      anneau.classList.add("anneau");
      anneau.style.width = `${42 + taille * 10}px`;
      anneau.textContent = taille;
      elementTour.appendChild(anneau);
    });
  });
}

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
  rendre();
});

rendre();