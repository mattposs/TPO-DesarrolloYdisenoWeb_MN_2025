/* Inti Fotografía – Promociones seguras */
document.addEventListener("DOMContentLoaded", () => {

  const $ = sel => document.querySelector(sel);

  // --- Catálogo ---
  const productos = {
    celular:   { name:"Curso Fotografía con Celular",  price:15000, promo:"2x1" },
    digital:   { name:"Curso Fotografía Digital",       price:30000, promo:"2x1" },
    analogica: { name:"Curso Fotografía Analógica",     price:35000, promo:"2x1" },
    social:    { name:"Curso Fotografía Social",        price:40000, promo:"2x1" },
    reflex:    { name:"Cámara Reflex Pro",              price:250000, promo:"10%" },
    mirrorless:{ name:"Cámara Mirrorless",              price:220000, promo:"10%" },
    lente50:   { name:"Lente 50mm",                     price:70000, promo:"10%" },
    zoom70:    { name:"Lente Zoom 70-200",              price:150000, promo:"10%" },
    sd128:     { name:"Tarjeta SD 128GB",               price:8000, promo:"50%" }
  };

  /* ============================
     SELECT → ACTUALIZAR PRECIO
  ============================ */
  const selectProducto = $("#producto");
  const precioInput = $("#precio");

  if (selectProducto && precioInput) {
    selectProducto.addEventListener("change", e => {
      const prod = productos[e.target.value];
      precioInput.value = prod ? prod.price : "";
    });
  }

  /* ============================
       CALCULAR PROMOCIÓN
  ============================ */
  const form = $("#promoForm");

  if (form) {
    form.addEventListener("submit", e => {

      // 🚨 ESTE ES EL FIX: evita el reload SIEMPRE
      e.preventDefault();

      const key = $("#producto").value;
      const cant = Number($("#cantidad").value);

      if (!key || cant <= 0) {
        alert("Seleccioná un producto y una cantidad válida.");
        return;
      }

      const prod = productos[key];
      let subtotal = prod.price * cant;
      let descuento = 0;
      let mensaje = "";

      // lógica de promo
      if (prod.promo === "2x1") {
        descuento = Math.floor(cant / 2) * prod.price;
        mensaje = "Promoción 2x1 aplicada.";
      }

      if (prod.promo === "10%") {
        descuento = subtotal * 0.10;
        mensaje = "10% de descuento aplicado.";
      }

      if (prod.promo === "50%") {
        if (cant >= 2) {
          descuento = Math.floor(cant / 2) * (prod.price * 0.5);
          mensaje = "50% OFF en la segunda unidad.";
        } else {
          mensaje = "Agregá 2 unidades para activar la promo.";
        }
      }

      const totalFinal = subtotal - descuento;

      // mostrar
      $("#resultado").style.display = "block";
      $("#totalSinDescuento").textContent = `Total sin descuento: $${subtotal.toLocaleString("es-AR")}`;
      $("#descuentoAplicado").textContent = `Descuento aplicado: $${descuento.toLocaleString("es-AR")}`;
      $("#totalFinal").textContent = `Total final: $${totalFinal.toLocaleString("es-AR")}`;
      $("#mensajeExtra").textContent = mensaje;
    });
  }

});
