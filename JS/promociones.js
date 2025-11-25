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

  const selectProducto = $("#producto");
  const precioInput    = $("#precio");
  const cantidadInput  = $("#cantidad");
  const form           = $("#promoForm");
  const resultadoBox   = $("#resultado");
  const totalSinDescuentoEl = $("#totalSinDescuento");
  const descuentoAplicadoEl = $("#descuentoAplicado");
  const totalFinalEl        = $("#totalFinal");
  const mensajeExtraEl      = $("#mensajeExtra");

  // Seguridad básica: si algo no está, no rompemos
  if (!selectProducto || !precioInput || !cantidadInput || !form) {
    console.warn("Faltan elementos del formulario de promociones.");
    return;
  }

  // Cuando cambio el producto, se carga el precio automáticamente
  selectProducto.addEventListener("change", e => {
    const key = e.target.value;
    const prod = productos[key];
    if (prod) {
      precioInput.value = prod.price;
    } else {
      precioInput.value = "";
    }
    // Ocultamos el resultado si se cambia la promo
    if (resultadoBox) {
      resultadoBox.style.display = "none";
    }
  });

  // Calcular promoción al enviar el formulario
  form.addEventListener("submit", e => {
    // FUNDAMENTAL: evitar recarga de la página
    e.preventDefault();

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

    const precioUnitario = prod.price;
    const subtotal = precioUnitario * cant;
    let descuento = 0;
    let mensaje   = "";

    switch (prod.promo) {
      case "2x1":
        // Por cada dos, uno gratis
        descuento = Math.floor(cant / 2) * precioUnitario;
        mensaje = "Promoción 2x1 aplicada. Pagás solo la mitad de las unidades en promo.";
        break;

      case "10%":
        descuento = subtotal * 0.10;
        mensaje = "10% de descuento aplicado sobre el total.";
        break;

      case "50%":
        if (cant >= 2) {
          // 50% en la segunda unidad
          descuento = Math.floor(cant / 2) * (precioUnitario * 0.5);
          mensaje = "50% OFF en la segunda unidad.";
        } else {
          mensaje = "Agregá 2 unidades para activar la promo del 50% en la segunda.";
        }
        break;
    }

    const totalFinal = subtotal - descuento;

    // Mostrar resultados en pantalla
    if (resultadoBox) {
      resultadoBox.style.display = "block";
    }
    if (totalSinDescuentoEl) {
      totalSinDescuentoEl.textContent =
        `Total sin descuento: $${subtotal.toLocaleString("es-AR")}`;
    }
    if (descuentoAplicadoEl) {
      descuentoAplicadoEl.textContent =
        `Descuento aplicado: $${descuento.toLocaleString("es-AR")}`;
    }
    if (totalFinalEl) {
      totalFinalEl.textContent =
        `Total final: $${totalFinal.toLocaleString("es-AR")}`;
    }
    if (mensajeExtraEl) {
      mensajeExtraEl.textContent = mensaje;
    }
  });

});
