// frontend/frontend-vanilla/js/admin.js
import { apiFetch } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  cargarTablaProductos();

  const productForm = document.getElementById('product-form');
  const btnCancelar = document.getElementById('btn-cancelar');

  if (productForm) {
    productForm.addEventListener('submit', guardarProducto);
  }

  if (btnCancelar) {
    btnCancelar.addEventListener('click', limpiarFormulario);
  }
});

// 1. OBTENER Y MOSTRAR PRODUCTOS EN LA TABLA (GET)
async function cargarTablaProductos() {
  const tbody = document.getElementById('admin-products-table');
  if (!tbody) return;

  try {
    const productos = await apiFetch('/productos');

    if (!productos || productos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay productos registrados.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    productos.forEach(prod => {
      const id = prod._id || prod.id;
      const nombre = prod.nombre || 'Sin nombre';
      const categoria = prod.categoria || 'Sin categoría';
      const precio = prod.precio ? `$${prod.precio.toLocaleString('es-AR')}` : '$0';
      const imagen = prod.imagen || './img-index/sinFoto.png';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td data-label="Imagen">
          <img src="${imagen}" alt="${nombre}" class="admin-thumb">
        </td>
        <td data-label="Producto" class="font-bold">${nombre}</td>
        <td data-label="Categoría"><span>${categoria}</span></td>
        <td data-label="Precio" class="font-bold text-verde">${precio}</td>
        <td data-label="Acciones">
          <div>
            <button class="btn-accion btn-edit" title="Editar">Editar</button>
            <button class="btn-accion btn-delete" title="Eliminar">Eliminar</button>
          </div>
        </td>
      `;

      // Eventos para los botones
      const btnEdit = tr.querySelector('.btn-edit');
      const btnDelete = tr.querySelector('.btn-delete');

      btnEdit.addEventListener('click', () => cargarFormularioParaEditar(prod));
      btnDelete.addEventListener('click', () => eliminarProducto(id));

      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error('Error al cargar productos en el Backoffice:', error);
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Error: ${error.message}</td></tr>`;
  }
}

// 2. CREAR (POST) O ACTUALIZAR (PUT) PRODUCTO
async function guardarProducto(e) {
  e.preventDefault();

  const idInput = document.getElementById('prod-id');
  const nameInput = document.getElementById('prod-name');
  const categoriaSelect = document.getElementById('prod-categoria');
  const precioInput = document.getElementById('prod-precio');
  const desInput = document.getElementById('prod-descripcion');
  const cantInput = document.getElementById('prod-cantidad');
  const imgInput = document.getElementById('prod-img');

  const id = idInput.value;
  const productoData = {
    nombre: nameInput.value.trim(),
    categoria: categoriaSelect.value,
    descripcion: desInput.value.trim(),   
    precio: Number(precioInput.value),
    cantidad: Number(cantInput.value)


    //imagen: imgInput.value.trim()
  };

  try {
    let respuesta;
    if (id) {
      // Si hay un ID presente, enviamos una petición PUT para actualizar
      respuesta = await apiFetch(`/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productoData)
      });
      mostrarMensaje('Producto actualizado con éxito', 'success');
    } else {
      // Si no hay ID, enviamos una petición POST para crear
      respuesta = await apiFetch('/productos', {
        method: 'POST',
        body: JSON.stringify(productoData)
      });
      mostrarMensaje('Producto creado con éxito', 'success');
    }

    limpiarFormulario();
    cargarTablaProductos();

  } catch (error) {
    mostrarMensaje(error.message || 'Error al guardar el producto', 'error');
  }
}

// 3. CARGAR DATOS EN EL FORMULARIO PARA EDITAR
function cargarFormularioParaEditar(prod) {
  document.getElementById('prod-id').value = prod._id || prod.id;
  document.getElementById('prod-name').value = prod.nombre || '';
  document.getElementById('prod-categoria').value = prod.categoria || '';
  document.getElementById('prod-precio').value = prod.precio || '';
  document.getElementById('prod-img').value = prod.imagen || '';

  document.getElementById('form-title').textContent = 'Editar Producto';
  document.getElementById('btn-guardar').textContent = 'Actualizar Producto';
  document.getElementById('btn-cancelar').style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. ELIMINAR PRODUCTO (DELETE)
async function eliminarProducto(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

  try {
    await apiFetch(`/productos/${id}`, {
      method: 'DELETE'
    });
    mostrarMensaje('Producto eliminado correctamente', 'success');
    cargarTablaProductos();
  } catch (error) {
    mostrarMensaje(error.message || 'Error al eliminar producto', 'error');
  }
}

// LIMPIAR Y RESETEAR FORMULARIO
function limpiarFormulario() {
  document.getElementById('product-form').reset();
  document.getElementById('prod-id').value = '';

  document.getElementById('form-title').textContent = 'Agregar Nuevo Producto';
  document.getElementById('btn-guardar').textContent = 'Guardar Producto';
  document.getElementById('btn-cancelar').style.display = 'none';
}

// FEEDBACK VISUAL
function mostrarMensaje(texto, tipo) {
  const msgBox = document.getElementById('admin-message');
  if (!msgBox) return;

  msgBox.textContent = texto;
  msgBox.style.display = 'block';

  if (tipo === 'success') {
    msgBox.style.backgroundColor = '#d4edda';
    msgBox.style.color = '#155724';
  } else {
    msgBox.style.backgroundColor = '#f8d7da';
    msgBox.style.color = '#721c24';
  }

  setTimeout(() => {
    msgBox.style.display = 'none';
  }, 3000);
}