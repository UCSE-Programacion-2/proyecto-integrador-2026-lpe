// frontend/frontend-vanilla/js/auth.js
import { apiFetch } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el formulario de Login (asegúrate de que el id en tu HTML coincida)
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

async function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message'); // Elemento opcional para alertas/mensajes

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  try {
    // 1. Enviar credenciales al backend mediante POST
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // 2. Guardar Token y datos de usuario en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.usuario) {
        localStorage.setItem('user', JSON.stringify(data.usuario));
      }

      // 3. Redireccionar a la página principal (Home) o Backoffice según tu necesidad
      window.location.href = 'index.html';
    }
  } catch (error) {
    // Manejo de errores
    if (errorMessage) {
      errorMessage.textContent = error.message || 'Credenciales inválidas.';
      errorMessage.style.display = 'block';
    } else {
      alert(error.message || 'Error al iniciar sesión. Revisa tus credenciales.');
    }
  }
}