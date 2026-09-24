
import { apiFetch } from './api.js';

const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('register-error-message');
  const registerForm = document.getElementById('register-form');
  const selectRol = document.getElementById('rol');
async function registrarNewUser(event) {
  event.preventDefault();

  

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  
 
  // Limpiar mensaje de error previo
  if (errorMessage) {
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
  }

  // Validación básica del frontend
  if (!nombre || !email || !password) {
    showError('Por favor, completa todos los campos.');
    return;
  }

  if (password.length < 6) {
    showError('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  try {
    const rol = selectRol.value; 
    console.log(rol);

    // 1. Petición POST a la API para registrar el usuario
    const data = await apiFetch('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password, rol }),
    });

   

    // 3. Notificar al usuario y redirigir
    alert(data.message || data.msg || '¡Usuario creado con éxito!');
    window.location.href = 'login.html';

  } catch (error) {
    showError(error.message || 'Error al intentar registrar la cuenta.');
  }

  
}

function showError(message) {
  const errorMessage = document.getElementById('register-error-message');
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  } else {
    alert(message);
  }
}
registerForm.addEventListener('submit', registrarNewUser);

document.addEventListener('DOMContentLoaded', () => {
  

 
});