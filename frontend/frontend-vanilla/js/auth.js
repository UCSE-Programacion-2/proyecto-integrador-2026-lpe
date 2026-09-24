
import { apiFetch } from './api.js';

//const HISTORIAL_KEY ='usuarioYtoken';
//const HISTORIAL_KEY_USER = 'usuario';
const API_URL = 'http://localhost:3000/api';

const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message'); // Elemento opcional para alertas/mensajes
  const loginForm = document.getElementById('login-form');
  


async function Login(event) {
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
  



loginForm.addEventListener('submit', Login);

document.addEventListener('DOMContentLoaded', () => {
  
  });