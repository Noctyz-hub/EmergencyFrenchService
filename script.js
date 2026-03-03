/* FES – French Emergency Service | script.js */

const UPDATES = [
  { author: "FES Staff", date: "03/03/2026", version: "Version V.2", status: "actif", text: "Modification du chassis des vehicules avec l'ajout de mouvements de camera, on espere que ca va vous plaire !" },
  { author: "FES Staff", date: "18/02/2026", version: "Version V.1.9", status: "actif", text: "Ajout de nouveaux uniformes pour les Pompiers et le SAMU. Correction de bugs sur le systeme de radio." },
  { author: "FES Staff", date: "05/02/2026", version: "Version V.1.8", status: "inactif", text: "Refonte complete de la carte principale avec de nouveaux quartiers et points d'interet." },
  { author: "FES Staff", date: "20/01/2026", version: "Version V.1.7", status: "inactif", text: "Nouveau systeme de dispatch et amelioration des animations des personnages." }
];

const RESEAUX = [
  { name: "Serveur Discord", tag: "FES", desc: "Communaute, annonces, support & staff.", btn: "Rejoindre", href: "#" },
  { name: "Jeu Roblox", tag: "FES", desc: "Lien direct vers l'experience Roblox.", btn: "Jouer", href: "#" },
  { name: "Instagram", tag: "FES", desc: "Actus, teasers et posts officiels.", btn: "Voir", href: "#" },
  { name: "TikTok", tag: "FES", desc: "Clips, scenes et montages du serveur.", btn: "Voir", href: "#" },
  { name: "YouTube", tag: "FES", desc: "Videos officielles, news et teasers.", btn: "Voir", href: "#" },
  { name: "Twitter / X", tag: "FES", desc: "Annonces rapides et sondages.", btn: "Voir", href: "#" }
];

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProgressBar();
  initUpdates();
  initReseaux();
  initCounters();
  initShowMore();
});

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 40 ? "rgba(6,6,8,0.97)" : "rgba(10,10,12,0.92)";
    const sections = document.querySelectorAll("section[id]");
    let currentId = "";
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 100) currentId = sec.id; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + currentId));
  });
}

function initProgressBar() {
  const bar = document.querySelector(".progress-bar");
  const label = document.getElementById("progress-val");
  if (!bar || !label) return;
  const target = parseInt(bar.dataset.target, 10);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { bar.style.width = target + "%"; }, 200);
        animateNumber(label, 0, target, 1800, v => v + "%");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(bar.parentElement);
}

let showingAll = false;

function initUpdates() { renderUpdates(false); }

function renderUpdates(all) {
  const list = document.getElementById("updates-list");
  list.innerHTML = "";
  const data = all ? UPDATES : UPDATES.slice(0, 1);
  data.forEach(u => {
    const card = document.createElement("div");
    card.className = "update-card";
    card.innerHTML =
      '<div class="update-meta">' +
        '<span class="update-author">' + u.author + '</span>' +
        '<span class="update-date">• ' + u.date + '</span>' +
        '<span class="update-version">' + u.version + '</span>' +
        '<span class="update-status ' + u.status + '">' + (u.status === "actif" ? "Actif" : "Inactif") + '</span>' +
      '</div>' +
      '<div class="update-text">' + u.text + '</div>';
    list.appendChild(card);
  });
}

function initShowMore() {
  const btn = document.getElementById("show-more-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    showingAll = !showingAll;
    renderUpdates(showingAll);
    btn.textContent = showingAll ? "Voir moins" : "Voir toutes les updates";
  });
}

function initReseaux() {
  const grid = document.getElementById("reseaux-grid");
  if (!grid) return;
  RESEAUX.forEach(r => {
    const card = document.createElement("div");
    card.className = "reseau-card";
    card.innerHTML =
      '<div class="reseau-header">' +
        '<span class="reseau-name">' + r.name + '</span>' +
        '<span class="reseau-tag">' + r.tag + '</span>' +
      '</div>' +
      '<p class="reseau-desc">' + r.desc + '</p>' +
      '<a href="' + r.href + '" class="reseau-btn">' + r.btn + '</a>';
    grid.appendChild(card);
  });
}

function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateNumber(el, 0, target, 1600, v => v.toLocaleString("fr-FR"));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}

function animateNumber(el, from, to, duration, formatter) {
  formatter = formatter || function(v) { return v; };
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatter(Math.round(from + (to - from) * eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
