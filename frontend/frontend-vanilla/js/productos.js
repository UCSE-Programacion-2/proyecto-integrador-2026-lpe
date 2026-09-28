
import { apiFetch } from './api.js';

const container = document.getElementById('products-grid');

async function cargarProductos() {
  
  if (!container) return;

  try {
    // Petición GET al endpoint de productos de tu Backend
    const productos = await apiFetch('/productos');

    if (!productos || productos.length === 0) {
      container.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
      return;
    }

    // Renderizado dinámico mediante forEach
    container.innerHTML = '';
    productos.forEach(producto => {
      
      const id = producto._id || producto.id;
      const nombre = producto.nombre || 'Producto';
      const categoria = producto.categoria || 'Accesorio';
      const precio = producto.precio ? `$${producto.precio.toLocaleString('es-AR')}` : '$0';
      const imagen = producto.imagen || './img-index/sinFoto.png';
      const descripcion = producto.descripcion;

      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${imagen}" alt="${nombre}" class="product-img">
        </div>
        <div class="product-info">
          <h3>${nombre}</h3>
          <p class="product-categoria">${categoria}</p>
          <span class="product-precio">${precio}</span>
          <button type="button" class="btn-primario">Agregar Carrito</button>
          <button type="button" class="btn-secundario btn-detalle">Ver Detalle</button>
        </div>
      `;
      

      // Evento para abrir el modal al presionar "Ver Detalle"
      const btnDetalle = card.querySelector('.btn-detalle');
      btnDetalle.addEventListener('click', () => {
        mostrarModalDetalle({ nombre, categoria, precio, descripcion, imagen });
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar catálogo:', error);
    container.innerHTML = `<p class="error-alert">Ocurrió un error al cargar los productos: ${error.message}</p>`;
  }
}


// Función para renderizar e inyectar la plantilla dentro del modal
function mostrarModalDetalle(producto) {
  const modal = document.getElementById('modalDetalle');
  const detalleContent = document.getElementById('detalleContent');

  if (!modal || !detalleContent) return;

  // Plantilla equivalente a la imagen del ejemplo adaptada para E-commerce
  detalleContent.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h2>${producto.nombre}</h2>
    <div class="detail-meta">
      <span class="badge badge-categoria">${producto.categoria}</span>
      <span class="badge badge-precio">${producto.precio}</span>
    </div>
    <p>${producto.descripcion}</p>
  `;

  // Mostrar modal quitando la clase hidden
  modal.classList.remove('hidden');
}


// Configurar los botones y eventos para cerrar el modal
function configurarEventosModal() {
  const modal = document.getElementById('modalDetalle');
  if (!modal) return;

  // Cerrar haciendo clic en los botones con la clase .cerrar-modal
  const botonesCerrar = modal.querySelectorAll('.cerrar-modal');
  botonesCerrar.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });

  // Cerrar al hacer clic en el fondo oscuro
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  configurarEventosModal();
});