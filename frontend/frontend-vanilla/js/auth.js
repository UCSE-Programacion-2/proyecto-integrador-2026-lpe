
//import { apiFetch } from './api.js';

//const HISTORIAL_KEY ='usuarioYtoken';
//const HISTORIAL_KEY_USER = 'usuario';
const API_URL = 'http://localhost:3000/api';

const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message'); // Elemento opcional para alertas/mensajes
  const loginForm = document.getElementById('login-form');
  


async function handleLogin(event) {
  event.preventDefault();

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
    
     guardarUsuarioYToken(data.token, data.nombre)
    // 2. Guardar Token y datos de usuario en localStorage
    /*if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.nombre) {
        localStorage.setItem('user', JSON.stringify(data.nombre));
      }

      // 3. Redireccionar a la página principal
      window.location.href = 'index.html';
    }*/
      window.location.href = 'index.html';
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

async function apiFetch(endpoint, options = {}) {
  const token = obtenerToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Extrae el mensaje enviado desde el backend (message, msg, o error)
      const serverMessage = data.message || data.msg || data.error || 'Credenciales incorrectas o error en la solicitud';
      throw new Error(serverMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}

function obtenerToken() {
    const cotizacionGuardado = localStorage.getItem('token');
    return cotizacionGuardado ? JSON.parse(cotizacionGuardado) : [];
  }

  function guardarUsuarioYToken(token,nombre) {
    if (token) {
        localStorage.setItem('token', token);
        if (nombre) {
          localStorage.setItem('user', JSON.stringify(nombre));
        }
  
    }
  }
  



loginForm.addEventListener('submit', handleLogin);

document.addEventListener('DOMContentLoaded', () => {
  
  });