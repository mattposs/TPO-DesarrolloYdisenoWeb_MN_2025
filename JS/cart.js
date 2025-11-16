/* Inti Fotografía – Carrito simple con localStorage (versión optimizada y estable) */
(() => {

  const STORAGE_KEY = 'inti_cart_v1';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const money = n => '$' + Number(n).toLocaleString('es-AR');

  // ---------- Estado ----------
  let cart = load();

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateBadge();
  }

  function updateBadge() {
    const total = cart.reduce((a, it) => a + it.qty, 0);
    $$('#cart-count').forEach(el => el.textContent = total);
  }

  // ---------- API ----------
  function addItem({ id, name, price, img }) {
    price = Number(price);

    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, name, price, img, qty: 1 });

    save();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    save();
    renderCart();
  }

  function setQty(id, qty) {
    qty = Number(qty);
    const it = cart.find(i => i.id === id);

    if (!it) return;
    if (qty <= 0) return removeItem(id);

    it.qty = qty;
    save();
    renderCartTotals();
  }

  // ---------- Render en carrito.html ----------
  function renderCart() {
    const tableBody = $('#cart-items');
    const empty = $('#cart-empty');
    const wrap = $('#cart-wrapper');

    if (!tableBody) return; // No estamos en carrito.html

    tableBody.innerHTML = '';

    if (cart.length === 0) {
      empty.style.display = 'block';
      wrap.style.display = 'none';
      renderCartTotals();
      return;
    }

    empty.style.display = 'none';
    wrap.style.display = 'grid';

    for (const item of cart) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="prod">
          <img src="${item.img || ''}" alt="${item.name}">
          <div>
            <strong>${item.name}</strong>
            <div class="muted">${item.id}</div>
          </div>
        </td>
        <td class="right">${money(item.price)}</td>
        <td class="center">
          <button class="qty-btn dec" data-id="${item.id}">–</button>
          <input class="qty-input" data-id="${item.id}" type="number" min="1" value="${item.qty}">
          <button class="qty-btn inc" data-id="${item.id}">+</button>
        </td>
        <td class="right">${money(item.price * item.qty)}</td>
        <td class="center"><button class="remove-btn" data-id="${item.id}">✕</button></td>
      `;
      tableBody.appendChild(tr);
    }

    renderCartTotals();
  }

  function renderCartTotals() {
    const subtotal = cart.reduce(
      (a, it) => a + (it.discountedTotal || (it.price * it.qty)), 0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    const set = (sel, val) => {
      const el = $(sel);
      if (el) el.textContent = money(val);
    };

    set('#cart-subtotal', subtotal);
    set('#cart-shipping', shipping);
    set('#cart-total', total);
  }

  // ---------- Listeners globales ----------
  document.addEventListener('click', (e) => {
    const btnAdd = e.target.closest('.add-to-cart');

    if (btnAdd) {
      addItem({
        id: btnAdd.dataset.id,
        name: btnAdd.dataset.name,
        price: btnAdd.dataset.price,
        img: btnAdd.dataset.img
      });

      btnAdd.textContent = '✓ Agregado';
      setTimeout(() => btnAdd.textContent = 'Agregar al carrito', 1200);
    }
  });

  // Sumar / restar / eliminar
  document.addEventListener('click', (e) => {
    const inc = e.target.closest('.qty-btn.inc');
    const dec = e.target.closest('.qty-btn.dec');
    const rm  = e.target.closest('.remove-btn');

    if (inc) {
      const id = inc.dataset.id;
      const it = cart.find(i => i.id === id);
      if (it) setQty(id, it.qty + 1);
    }

    if (dec) {
      const id = dec.dataset.id;
      const it = cart.find(i => i.id === id);
      if (it) setQty(id, it.qty - 1);
    }

    if (rm) removeItem(rm.dataset.id);
  });

  // Input manual de cantidad
  document.addEventListener('input', (e) => {
    const input = e.target.closest('.qty-input');
    if (input) setQty(input.dataset.id, input.value);
  });

  // Acciones: vaciar / checkout
  document.addEventListener('click', (e) => {
    if (e.target.id === 'cart-clear') {
      cart = [];
      save();
      renderCart();
    }

    if (e.target.id === 'cart-checkout') {
      alert('¡Gracias! Esto es un demo de checkout.');
      cart = [];
      save();
      renderCart();
    }
  });

  // ---------- Inicialización ----------
  updateBadge();
  renderCart();

})();

