// Inti Fotografía – Calculadora de promociones
document.addEventListener("DOMContentLoaded", () => {

  const $ = sel => document.querySelector(sel);

  // --- Catálogo de productos y promos ---
  const productos = {
    celular:   { name: "Curso Fotografía con Celular",  price: 15000, promo: "2x1" },
    digital:   { name: "Curso Fotografía Digital",      price: 30000, promo: "2x1" },
    analogica: { name: "Curso Fotografía Analógica",    price: 35000, promo: "2x1" },
    social:    { name: "Curso Fotografía Social",       price: 40000, promo: "2x1" },
    reflex:    { name: "Cámara Reflex Pro",             price: 250000, promo: "10%" },
    mirrorless:{ name: "Cámara Mirrorless",             price: 220000, promo: "10%" },
    lente50:   { name: "Lente 50mm",                    price: 70000, promo: "10%" },
    zoom70:    { name: "Lente Zoom 70-200",             price: 150000, promo: "10%" },
    sd128:     { name: "Tarjeta SD 128GB",              price: 8000,  promo: "50%" }
  };

  const form            = $("#promoForm");
  const selectProducto  = $("#producto");
  const cantidadInput   = $("#cantidad");

  const resultadoEl      = $("#resultado");
  const promoNombreEl    = $("#promoNombre");
  const precioOriginalEl = $("#precioOriginal");
  const descuentoAplicadoEl = $("#descuentoAplicado");
  const totalFinalEl     = $("#totalFinal");
  const mensajeExtraEl   = $("#mensajeExtra");

  form.addEventListener("submit", e => {
    e.preventDefault(); // evita recargar

    const key  = selectProducto.value;
    const prod = productos[key];
    const cant = Number(cantidadInput.value);

    if (!prod || !key) {
      alert("Seleccioná una promoción válida.");
      return;
    }

    if (!cant || cant <= 0) {
      alert("Ingresá una cantidad válida.");
      return;
    }

    let totalOriginal = prod.price * cant;
    let descuento     = 0;
    let totalFinal    = totalOriginal;
    let mensaje       = "";

    if (prod.promo === "2x1") {
      descuento = prod.price * Math.floor(cant / 2);
      totalFinal = totalOriginal - descuento;
      mensaje = "¡Aprovechaste un 2x1!";
    }
    else if (prod.promo === "10%") {
      descuento = totalOriginal * 0.10;
      totalFinal = totalOriginal - descuento;
      mensaje = "Descuento del 10% aplicado.";
    }
    else if (prod.promo === "50%") {
      descuento = totalOriginal * 0.50;
      totalFinal = totalOriginal - descuento;
      mensaje = "Descuento del 50% aplicado.";
    }

    // Mostrar resultados
    resultadoEl.style.display = "block";

    promoNombreEl.textContent = prod.name;
    precioOriginalEl.textContent =
      `Precio original: $${totalOriginal.toLocaleString("es-AR")}`;
    descuentoAplicadoEl.textContent =
      `Descuento aplicado: $${descuento.toLocaleString("es-AR")}`;
    totalFinalEl.textContent =
      `Total final: $${totalFinal.toLocaleString("es-AR")}`;
    mensajeExtraEl.textContent = mensaje;
  });

});
