// ---------- Catalogue ----------
const PRODUCTS = [
  { id: 1, name: "Ambre Nocturne", cat: "mixte", price: 89, rating: 5, pop: 98, badge: "Best-seller", c1: "#e9b872", c2: "#a8642a",
    desc: "Un ambre chaud et enveloppant, réveillé par une touche de safran.", top: "Safran, bergamote", heart: "Ambre, rose de Damas", base: "Vanille, bois de santal" },
  { id: 2, name: "Rose Poudrée", cat: "femme", price: 79, rating: 5, pop: 92, badge: "Nouveau", c1: "#f6d0cc", c2: "#d17f86",
    desc: "Une rose délicate et veloutée, adoucie d'iris poudré.", top: "Litchi, poivre rose", heart: "Rose centifolia, iris", base: "Musc blanc, cèdre" },
  { id: 3, name: "Cèdre Sauvage", cat: "homme", price: 85, rating: 4, pop: 88, c1: "#9fb3a3", c2: "#3f5a4c",
    desc: "Un boisé aromatique, vert et minéral, inspiré des forêts de l'Atlas.", top: "Pamplemousse, genièvre", heart: "Cèdre, lavande", base: "Vétiver, ambroxan" },
  { id: 4, name: "Néroli Solaire", cat: "mixte", price: 72, rating: 4, pop: 80, c1: "#fbe7a1", c2: "#e2a93c",
    desc: "L'éclat lumineux de la fleur d'oranger sous le soleil méditerranéen.", top: "Néroli, citron de Sicile", heart: "Fleur d'oranger, petit-grain", base: "Musc, ambrette" },
  { id: 5, name: "Oud Impérial", cat: "homme", price: 129, rating: 5, pop: 95, badge: "Exclusif", c1: "#6b4a3a", c2: "#2a1a14",
    desc: "Un oud profond et fumé, sublimé par le cuir et l'encens.", top: "Cardamome, encens", heart: "Oud, cuir", base: "Patchouli, labdanum" },
  { id: 6, name: "Jasmin Minuit", cat: "femme", price: 92, rating: 5, pop: 90, c1: "#e8e1f2", c2: "#7d6aa8",
    desc: "Un floral blanc, sensuel et nocturne, aux facettes solaires.", top: "Mandarine, poire", heart: "Jasmin sambac, tubéreuse", base: "Vanille bourbon, benjoin" },
  { id: 7, name: "Vétiver Gris", cat: "homme", price: 76, rating: 4, pop: 74, c1: "#c9ced2", c2: "#5d666d",
    desc: "Un vétiver élégant et sec, d'une fraîcheur poivrée.", top: "Poivre noir, bergamote", heart: "Vétiver d'Haïti, géranium", base: "Fève tonka, mousse" },
  { id: 8, name: "Figue Blanche", cat: "mixte", price: 68, rating: 4, pop: 70, c1: "#dfe8cf", c2: "#8aa36a",
    desc: "La fraîcheur lactée de la figue verte et de son feuillage.", top: "Feuille de figuier, cassis", heart: "Figue, lait de coco", base: "Bois blonds, musc" },
  { id: 9, name: "Vanille Cachemire", cat: "femme", price: 84, rating: 5, pop: 93, badge: "Best-seller", c1: "#f3e3cc", c2: "#c49a6c",
    desc: "Une vanille gourmande et douce comme une étoffe précieuse.", top: "Amande, cardamome", heart: "Héliotrope, praline", base: "Vanille, cachemeran" },
  { id: 10, name: "Bleu Marine", cat: "homme", price: 69, rating: 4, pop: 84, c1: "#b8d4ea", c2: "#2e5f8a",
    desc: "Un sillage aquatique et frais, comme une brise d'océan.", top: "Notes marines, citron vert", heart: "Sauge, romarin", base: "Bois flotté, ambre gris" },
  { id: 11, name: "Iris Velours", cat: "femme", price: 98, rating: 5, pop: 78, c1: "#ddd3e6", c2: "#9b88b3",
    desc: "Un iris racé et poudré, d'une élégance intemporelle.", top: "Aldéhydes, violette", heart: "Iris pallida, mimosa", base: "Musc, santal" },
  { id: 12, name: "Thé Fumé", cat: "mixte", price: 81, rating: 4, pop: 76, c1: "#cfc0a3", c2: "#6e5b3f",
    desc: "Un thé noir lapsang fumé, adouci de bois et de miel.", top: "Thé noir, bergamote", heart: "Bouleau, miel", base: "Cuir, ciste" },
];

const SIZES = [
  { ml: 30, factor: 0.5 },
  { ml: 50, factor: 0.75 },
  { ml: 100, factor: 1 },
];
const FREE_SHIPPING = 80;
const SHIPPING_COST = 5.9;

// ---------- Helpers ----------
const $ = (s) => document.querySelector(s);
const euro = (n) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
const catLabel = { femme: "Pour elle", homme: "Pour lui", mixte: "Mixte" };
const sizePrice = (p, ml) => Math.round(p.price * SIZES.find((s) => s.ml === ml).factor);
const bottle = (p, label = true) =>
  `<div class="bottle" style="--c1:${p.c1};--c2:${p.c2}"><div class="cap"></div><div class="glass">${label ? `<span>${p.name.toUpperCase().replace(" ", "<br>")}</span>` : ""}</div></div>`;

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2400);
}

// ---------- Boutique ----------
const state = { filter: "tous", query: "", sort: "pop" };

function renderGrid() {
  const q = state.query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) =>
    (state.filter === "tous" || p.cat === state.filter) &&
    (!q || [p.name, p.desc, p.top, p.heart, p.base].join(" ").toLowerCase().includes(q))
  );
  const sorters = {
    pop: (a, b) => b.pop - a.pop,
    asc: (a, b) => a.price - b.price,
    desc: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name, "fr"),
  };
  list.sort(sorters[state.sort]);

  $("#grid").innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 40}ms">
      <div class="card-visual" data-open="${p.id}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        ${bottle(p)}
      </div>
      <div class="card-body">
        <span class="card-cat">${catLabel[p.cat]}</span>
        <h3 class="card-name" data-open="${p.id}">${p.name}</h3>
        <span class="stars" aria-label="${p.rating} sur 5">${stars(p.rating)}</span>
        <p class="card-notes">${p.heart}</p>
        <div class="card-foot">
          <span class="price">${euro(p.price)} <small>/ 100 ml</small></span>
          <button class="add" data-add="${p.id}">Ajouter</button>
        </div>
      </div>
    </article>`).join("");
  $("#empty").hidden = list.length > 0;
}

function setFilter(f) {
  state.filter = f;
  document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === f));
  renderGrid();
}

$("#filters").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (chip) setFilter(chip.dataset.filter);
});
document.querySelectorAll(".collection").forEach((c) =>
  c.addEventListener("click", () => {
    setFilter(c.dataset.filter);
    $("#boutique").scrollIntoView({ behavior: "smooth" });
  })
);
$("#search").addEventListener("input", (e) => { state.query = e.target.value; renderGrid(); });
$("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });

$("#grid").addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) return addToCart(+add.dataset.add, 100);
  const open = e.target.closest("[data-open]");
  if (open) openProduct(+open.dataset.open);
});

// ---------- Fiche produit ----------
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  let ml = 100;
  const content = $("#modalContent");
  const draw = () => {
    content.innerHTML = `
      <div class="product">
        <div class="product-visual">${bottle(p).replace('class="bottle"', 'class="bottle big"')}</div>
        <div class="product-info">
          <span class="card-cat">${catLabel[p.cat]} · Eau de Parfum</span>
          <h3>${p.name}</h3>
          <span class="stars">${stars(p.rating)}</span>
          <p>${p.desc}</p>
          <div class="pyramid">
            <div><b>Tête :</b> ${p.top}</div>
            <div><b>Cœur :</b> ${p.heart}</div>
            <div><b>Fond :</b> ${p.base}</div>
          </div>
          <div class="sizes">
            ${SIZES.map((s) => `<button class="size ${s.ml === ml ? "active" : ""}" data-ml="${s.ml}">${s.ml} ml</button>`).join("")}
          </div>
          <span class="price" style="font-size:1.4rem">${euro(sizePrice(p, ml))}</span>
          <button class="btn btn-dark" id="modalAdd">Ajouter au panier</button>
        </div>
      </div>`;
    content.querySelectorAll(".size").forEach((b) => b.addEventListener("click", () => { ml = +b.dataset.ml; draw(); }));
    $("#modalAdd").addEventListener("click", () => { addToCart(p.id, ml); closeModal(); });
  };
  draw();
  $("#modal").classList.add("show");
  $("#modal").setAttribute("aria-hidden", "false");
}
function closeModal() {
  $("#modal").classList.remove("show");
  $("#modal").setAttribute("aria-hidden", "true");
}
$("#closeModal").addEventListener("click", closeModal);
$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

// ---------- Panier ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("ambre-cart")) || []; } catch { cart = []; }
const save = () => { try { localStorage.setItem("ambre-cart", JSON.stringify(cart)); } catch {} };

function addToCart(id, ml) {
  const item = cart.find((i) => i.id === id && i.ml === ml);
  item ? item.qty++ : cart.push({ id, ml, qty: 1 });
  save();
  renderCart();
  const p = PRODUCTS.find((x) => x.id === id);
  toast(`${p.name} (${ml} ml) ajouté au panier`);
  const count = $("#cartCount");
  count.classList.remove("bump"); void count.offsetWidth; count.classList.add("bump");
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + sizePrice(PRODUCTS.find((p) => p.id === i.id), i.ml) * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  $("#cartCount").textContent = count;
  $("#subtotal").textContent = euro(subtotal);
  $("#shipping").textContent = subtotal === 0 ? "—" : shipping === 0 ? "Offerte" : euro(shipping);
  $("#total").textContent = euro(subtotal + shipping);
  $("#checkout").disabled = count === 0;

  $("#cartItems").innerHTML = cart.length === 0
    ? `<p class="cart-empty">Votre panier est vide.</p>`
    : cart.map((i, idx) => {
        const p = PRODUCTS.find((x) => x.id === i.id);
        return `
        <div class="cart-item">
          <div class="mini" style="--c1:${p.c1};--c2:${p.c2}"></div>
          <div>
            <h4>${p.name}</h4>
            <p>${i.ml} ml · ${euro(sizePrice(p, i.ml))}</p>
            <div class="qty">
              <button data-dec="${idx}" aria-label="Moins">−</button><span>${i.qty}</span><button data-inc="${idx}" aria-label="Plus">+</button>
            </div>
            <button class="remove" data-rm="${idx}">Retirer</button>
          </div>
          <strong>${euro(sizePrice(p, i.ml) * i.qty)}</strong>
        </div>`;
      }).join("") +
      (subtotal < FREE_SHIPPING ? `<p class="card-notes" style="margin-top:1rem">Plus que ${euro(FREE_SHIPPING - subtotal)} pour la livraison offerte.</p>` : "");
}

$("#cartItems").addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.inc) cart[+t.dataset.inc].qty++;
  else if (t.dataset.dec) { const i = +t.dataset.dec; cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
  else if (t.dataset.rm) cart.splice(+t.dataset.rm, 1);
  else return;
  save();
  renderCart();
});

const openCart = () => { $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); };
const closeCart = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); };
$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);

$("#checkout").addEventListener("click", () => {
  if (!cart.length) return;
  cart = [];
  save();
  renderCart();
  closeCart();
  toast("Merci ! Votre commande a bien été enregistrée (démo).");
});

// ---------- Divers ----------
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeCart(); } });
$("#burger").addEventListener("click", () => $("#nav").classList.toggle("open"));
$("#nav").addEventListener("click", (e) => { if (e.target.tagName === "A") $("#nav").classList.remove("open"); });
$("#newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  toast("Bienvenue dans le cercle Ambre ! Votre code : AMBRE10");
});
$("#year").textContent = new Date().getFullYear();

renderGrid();
renderCart();
