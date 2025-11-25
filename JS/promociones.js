/* Inti Fotografía – Promociones conectadas con carrito */
(() => {

  const STORAGE_KEY = 'inti_cart_v1';
  const $ = sel => document.querySelector(sel);

  // --- Catálogo ---
  const productos = {
    celular:   { name:"Curso Fotografía con Celular",  price:15000, img:"./img/curso-fotografia-movil.jpg",       promo:"2x1" },
    digital:   { name:"Curso Fotografía Digital",       price:30000, img:"./img/cursofotografíadigital.jpg",      promo:"2x1" },
    analogica: { name:"Curso Fotografía Analógica",     price:35000, img:"./img/cursofotografíaanalogica.jpg",    promo:"2x1" },
    social:    { name:"Curso Fotografía Social",        price:40000, img:"./img/cursofotografíadeportiva.jpg",    promo:"2x1" },
    reflex:    { name:"Cámara Reflex Pro",              price:250000, img:"./img/Cámara Reflex Pro.png",          promo:"10%" },
    mirrorless:{ name:"Cámara Mirrorless",              price:220000, img:"./img/camaramirrorless.png",           promo:"10%" },
    lente50:   { name:"Lente 50mm",                     price:70000, img:"./img/lente50mm.jpg",                   promo:"10%" },
    zoom70:    { name:"Lente Zoom 70-200",              price:150000, img:"./img/lentezoom70-200.png",            promo:"10%" },
    sd128:     { name:"Tarjeta SD 128GB",               price:8000, img:"./img/memoria sd128.png",                promo:"50%" }
  };

  // --- Cuando selecciono una promo, se pone el precio ---
  $('#producto').addEventListener('change', e => {
    const p = productos[e.target.value];
    $('#precio').value = p ? p.price : '';
    $('#resultado').style.display = 'none';
  });

  // --- Calcular promoción ---
  $('#promoForm').addEventListener('submit', e => {
    e.preventDefault();

    const key = $('#producto').value;
    const cant = Number($('#cantidad').value);

    if (!key || cant <= 0) {
      alert("Seleccioná un producto y cantidad válida.");
      return;
    }

    const prod = productos[key];
    let subtotal = prod.price * cant;
    let descuento = 0;
    let mensaje = "";

    switch (prod.promo) {
      case "2x1":
        descuento = Math.floor(cant / 2) * prod.price;
        mensaje = "Promoción 2x1 aplicada. Pagás solo la mitad.";
        break;

      case "10%":
        descuento = subtotal * 0.10;
        mensaje = "10% de descuento pagando en efectivo.";
        break;

      case "50%":
        if (cant >= 2) {
          descuento = Math.floor(cant / 2) * (prod.price * 0.5);
          mensaje = "50% OFF en la segunda unidad.";
        } else {
          mensaje = "Agregá 2 unidades para activar la promo.";
        }
        break;
    }

    const totalFinal = subtotal - descuento;

    // Mostrar resultados
    $('#resultado').style.display = 'block';
    $('#totalSinDescuento').textContent = `Total sin descuento: $${subtotal.toLocaleString('es-AR')}`;
    $('#descuentoAplicado').textContent = `Descuento aplicado: $${descuento.toLocaleString('es-AR')}`;
    $('#totalFinal').textContent = `Total final: $${totalFinal.toLocaleString('es-AR')}`;
    $('#mensajeExtra').textContent = mensaje;

  });

})();
