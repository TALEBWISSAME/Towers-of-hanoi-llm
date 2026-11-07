// ---------- État du jeu (source de vérité) ----------
let tours = [[], [], []];     // ex. [[3, 2, 1], [], []]
let nbAnneaux = 3;
let selection = null;         // index de la tour sélectionnée
let coups = 0;
let occupe = false;           // animation ou démo en cours : interactions bloquées
let enDemo = false;
let victoireAffichee = false;
let idPartie = 0;             // change à chaque reset/démarrage : invalide les anciennes tâches
let minuterieDelai = null;    // setTimeout de pause (démo)
let minuterieVictoire = null; // setTimeout du message de victoire
let animationEnCours = null;  // animation Web Animations active

const DUREE_ETAPE = 250;      // ms par étape d'animation
const DELAI_DEMO = 300;       // ms entre deux coups de la démo
const ECART = 4;              // doit correspondre au gap CSS (px)

// ---------- Éléments ----------
const plateau = document.getElementById("plateau");
const elTours = [...document.querySelectorAll(".tour")];
const inputNb = document.getElementById("nb-anneaux");
const elCompteur = document.getElementById("compteur");
const elMinimum = document.getElementById("minimum");
const elScore = document.getElementById("score");
const elMessage = document.getElementById("message");
const btnTheme = document.getElementById("btn-theme");
const btnDemarrer = document.getElementById("btn-demarrer");
const btnDemo = document.getElementById("btn-demo");

// ---------- Logique pure ----------
function deplacementValide(de, vers) {
  if (de === vers) return false;
  if (!tours[de] || !tours[vers]) return false;
  if (tours[de].length === 0) return false;
  const anneau = tours[de][tours[de].length - 1];
  const dessus = tours[vers][tours[vers].length - 1];
  return dessus === undefined || anneau < dessus;
}

// Algorithme récursif : renvoie la liste des déplacements [de, vers]
function resoudre(n, de, vers, via) {
  if (n === 0) return [];
  return [
    ...resoudre(n - 1, de, via, vers),
    [de, vers],
    ...resoudre(n - 1, via, vers, de),
  ];
}

function estGagne() {
  const t = tours[2];
  if (t.length !== nbAnneaux) return false;
  return t.every((v, i) => v === nbAnneaux - i);
}

function calculerScore() {
  if (coups === 0) return 0;
  const minimum = 2 ** nbAnneaux - 1;
  return Math.min(100, Math.round((minimum / coups) * 100));
}

// ---------- Affichage ----------
function rendre() {
  elTours.forEach((el, i) => {
    el.innerHTML = "";
    tours[i].forEach((taille, rang) => {
      const a = document.createElement("div");
      a.className = "anneau";
      a.style.width = 30 + (taille / nbAnneaux) * 65 + "%";
      a.style.background = `hsl(${(taille - 1) * 45}, 70%, 78%)`;
      if (selection === i && rang === tours[i].length - 1) a.classList.add("selectionne");
      el.appendChild(a);
    });
  });
  elCompteur.textContent = coups;
  elMinimum.textContent = 2 ** nbAnneaux - 1;
  elScore.textContent = calculerScore() + " %";
  btnDemo.disabled = occupe;
}

function afficherMessage(texte, type = "") {
  elMessage.textContent = texte;
  elMessage.className = "message " + type;
}

// ---------- Gestion des minuteries / annulation ----------
function toutArreter() {
  idPartie++;
  clearTimeout(minuterieDelai);
  clearTimeout(minuterieVictoire);
  minuterieDelai = minuterieVictoire = null;
  if (animationEnCours) {
    animationEnCours.cancel();
    animationEnCours = null;
  }
  occupe = false;
  enDemo = false;
  selection = null;
}

function pause(ms) {
  return new Promise((resolve) => {
    minuterieDelai = setTimeout(resolve, ms);
  });
}

// ---------- Animation : lever, glisser, descendre ----------
function animerAnneau(de, vers) {
  const elAnneau = elTours[de].lastElementChild;
  if (!elAnneau || !elAnneau.animate) return Promise.resolve();

  const rAnneau = elAnneau.getBoundingClientRect();
  const rSource = elTours[de].getBoundingClientRect();
  const rCible = elTours[vers].getBoundingClientRect();

  const dx = (rCible.left + rCible.width / 2) - (rSource.left + rSource.width / 2);
  const monter = -(rAnneau.top - rSource.top) + 6;           // au-dessus des tiges
  const pas = rAnneau.height + ECART;
  const descente = (tours[de].length - 1 - tours[vers].length) * pas;

  elAnneau.classList.remove("selectionne");
  elAnneau.classList.add("mobile");

  const anim = elAnneau.animate(
    [
      { transform: "translate(0, 0)", offset: 0 },
      { transform: `translate(0, ${monter}px)`, offset: 0.33, easing: "ease-in-out" },
      { transform: `translate(${dx}px, ${monter}px)`, offset: 0.66, easing: "ease-in-out" },
      { transform: `translate(${dx}px, ${descente}px)`, offset: 1 },
    ],
    { duration: DUREE_ETAPE * 3, easing: "ease-in-out", fill: "forwards" }
  );
  animationEnCours = anim;
  // Une animation annulée ne se termine jamais : Reset débloque via idPartie
  return anim.finished.catch(() => {}).then(() => {
    if (animationEnCours === anim) animationEnCours = null;
  });
}

// ---------- Exécution d'un déplacement ----------
async function jouer(de, vers) {
  if (occupe || !deplacementValide(de, vers)) return false;
  const id = idPartie;
  occupe = true;
  selection = null;
  btnDemo.disabled = true;

  await animerAnneau(de, vers);
  if (id !== idPartie) return false; // reset ou nouvelle partie pendant l'animation

  tours[vers].push(tours[de].pop());
  coups++;
  occupe = false;
  rendre();
  verifierVictoire(id);
  return true;
}

function verifierVictoire(id) {
  if (victoireAffichee || !estGagne()) return;
  victoireAffichee = true;
  // petit délai : le dernier anneau est déjà posé et rendu
  minuterieVictoire = setTimeout(() => {
    if (id !== idPartie) return;
    afficherMessage("Félicitations, vous avez gagné !", "victoire");
  }, 150);
}

// ---------- Parties ----------
function nouvellePartie(n) {
  toutArreter();
  nbAnneaux = n;
  tours = [[], [], []];
  for (let t = n; t >= 1; t--) tours[0].push(t);
  coups = 0;
  victoireAffichee = false;
  afficherMessage("");
  rendre();
}

function demarrer() {
  const brut = inputNb.value.trim();
  const n = Number(brut);
  if (brut === "" || !Number.isInteger(n) || n < 1 || n > 8) {
    afficherMessage("Entrez un nombre entier d'anneaux entre 1 et 8.", "erreur");
    return;
  }
  nouvellePartie(n);
}

function reset() {
  nouvellePartie(nbAnneaux);
}

async function demoAutomatique() {
  if (occupe) return;
  nouvellePartie(nbAnneaux);
  const id = idPartie;
  enDemo = true;
  occupe = false;
  const deplacements = resoudre(nbAnneaux, 0, 2, 1);

  for (const [de, vers] of deplacements) {
    if (id !== idPartie) return;
    await jouer(de, vers);
    if (id !== idPartie) return;
    await pause(DELAI_DEMO);
  }
  if (id === idPartie) enDemo = false;
}

// ---------- Interactions manuelles ----------
async function cliquerTour(i) {
  if (occupe || enDemo) return;

  if (selection === null) {
    if (tours[i].length === 0) {
      afficherMessage("Cette tour est vide.", "erreur");
      return;
    }
    selection = i;
    afficherMessage("");
    rendre();
    return;
  }

  if (selection === i) { // annulation
    selection = null;
    afficherMessage("");
    rendre();
    return;
  }

  if (!deplacementValide(selection, i)) {
    afficherMessage("Déplacement interdit : un grand anneau ne peut pas être sur un plus petit.", "erreur");
    return;
  }
  afficherMessage("");
  await jouer(selection, i);
}

elTours.forEach((el) => {
  const i = Number(el.dataset.index);
  el.addEventListener("click", () => cliquerTour(i));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cliquerTour(i);
    }
  });
});

// ---------- Thème ----------
function basculerTheme() {
  const racine = document.documentElement;
  const sombre = racine.dataset.theme === "dark";
  racine.dataset.theme = sombre ? "light" : "dark";
  btnTheme.textContent = sombre ? "🌙 Mode sombre" : "☀️ Mode clair";
}

// ---------- Initialisation ----------
btnDemarrer.addEventListener("click", demarrer);
document.getElementById("btn-reset").addEventListener("click", reset);
btnDemo.addEventListener("click", demoAutomatique);
btnTheme.addEventListener("click", basculerTheme);

nouvellePartie(3);
