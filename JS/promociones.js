/* Inti Fotografía – Promociones conectadas con carrito */
document.addEventListener("DOMContentLoaded", () => {

  const STORAGE_KEY = 'inti_cart_v1';
  const $ = sel => document.querySelector(sel);

  // --- Catálogo con promociones ---
  const productos = {
    celular:   { name:"Curso Fotografía con Celular",  price:15000, img:"./img/curso-fotografia-movil.jpg", promo:"2x1" },
    digital:   { name:"Curso Fotografía Digital",       price:30000, img:"./img/cursofotografíadigital.jpg", promo:"2x1" },
    analogica: { name:"Curso Fotografía Analógica",     price:35000, img:"./img/cursofotografíaanalogica.jpg", promo:"2x1" },
    social:    { name:"Curso Fotografía Social",        price:40000, img:"./img/cursofotografíadeportiva.jpg", promo:"2x1" },
    reflex:    { name:"Cámara Reflex Pro",              price:250000, img:"./img/Cámara Reflex Pro.png", promo:"10%" },
    mirrorless:{ name:"Cámara Mirrorless",              price:220000, img:"./img/camaramirrorless.png", promo:"10%" },
    lente50:   { name:"Lente 50mm",                     price:70000, img:"./img/lente50mm.jpg", promo:"10%" },
    zoom70:    { name:"Lente Zoom 70-200",              price:150000, img:"./img/lentezoom70-200.png", promo:"10%" },
    sd128:     { name:"Tarjeta SD 128GB",               price:8000, img:"./img/memoria sd128.png", promo:"50%" }
  };

  // =====================================================
  // 1) GENERAR TARJETAS DE PROMOCIONES EN LA PÁGINA
  // =====================================================

  const cont = document.querySelector("#promoCards");

  Object.entries(productos).forEach(([id, p]) => {
    cont.innerHTML += `
      <div class="promo-card">
        <img src="${p.img}" alt="${p.name}">
        <span class="promo-tag">Promo: ${p.promo}</span>
        <h3>${p.name}</h3>
        <p><strong>Precio:</strong> $${p.price.toLocaleString('es-AR')}</p>
      </div>
    `;
  });

  // =====================================================
  // 2) CALCULADORA (Tu lógica original pero adaptada)
  // =====================================================

  const form = $("#promoForm");
  if (!form) return; // si no existe, no rompe

  form.addEventListener("submit", e => {
    e.preventDefault();

    // Valores ingresados
    const precio = Number($("#precio").value);
    const descuento = Number($("#descuento").value);

    if (precio <= 0 || descuento < 0) {
      $("#resultadoTexto").innerText = "Ingresá valores válidos.";
      $("#resultado").style.display = "block";
      return;
    }

    const precioFinal = precio - (precio * descuento / 100);

    $("#resultadoTexto").innerHTML = `
      Precio original: $${precio}<br>
      Descuento aplicado: ${descuento}%<br><br>
      <strong>Precio final: $${precioFinal.toFixed(2)}</strong>
    `;

    $("#resultado").style.display = "block";
    $("#resultado").scrollIntoView({ behavior: "smooth" });
  });

});
