

const token = localStorage.getItem('token');
const userString = localStorage.getItem('user');
  
    // Seleccionamos la lista <ul> dentro del nav.navbar
    const navList = document.querySelector('nav.navbar ul');


  export function actualizarNavbar() {
    
    if (!navList) return;
  
    // Limpiamos dinámicamente opciones de auth previas para evitar duplicados
    const authElements = navList.querySelectorAll('.auth-nav-item');
    authElements.forEach((el) => el.remove());
  
    if (token && userString) {
      // USUARIO LOGUEADO
      let nombreUsuario = 'Usuario';
      try {
        const user = JSON.parse(userString);
        nombreUsuario = user || 'Usuario';
      } catch (e) {
        console.error('Error al obtener el usuario:', e);
      }
  
      // Saludo al usuario
      const userLi = document.createElement('li');
      userLi.classList.add('auth-nav-item', 'user-greeting');
      userLi.innerHTML = `<span style="color: var(--color-texto, #333); font-weight: 500; padding: 0.5rem;">Hola, <strong>${nombreUsuario}</strong></span>`;
  
      // Botón de cerrar sesión
      const logoutLi = document.createElement('li');
      logoutLi.classList.add('auth-nav-item');
      logoutLi.innerHTML = `<a href="#" id="logout-btn" style="color: var(--coral-rojo, #E76F51); font-weight: 600;">Cerrar Sesión</a>`;
      
      //Boton para administrar productos
      const registerLi = document.createElement('li');
      registerLi.classList.add('auth-nav-item');
      registerLi.innerHTML = `<a href="Backoficce.html">Administrar</a>`;

      navList.appendChild(userLi);
      navList.appendChild(logoutLi);
      navList.appendChild(registerLi);
      const CerrarButton = document.getElementById('logout-btn'); 
      // Evento para cerrar sesión
      CerrarButton.addEventListener('click', (e) => {
        e.preventDefault();
        cerrarSesion();
      });
    } else {
      // USUARIO NO LOGUEADO
      const loginLi = document.createElement('li');
      loginLi.classList.add('auth-nav-item');
      loginLi.innerHTML = `<a href="login.html">Iniciar Sesión</a>`;
  
      const registerLi = document.createElement('li');
      registerLi.classList.add('auth-nav-item');
      registerLi.innerHTML = `<a href="registro.html">Registrarse</a>`;
  
      navList.appendChild(loginLi);
      navList.appendChild(registerLi);
    }
  }
  
  function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Has cerrado sesión correctamente.');
    window.location.href = 'index.html';
  }


  document.addEventListener('DOMContentLoaded', () => {
    actualizarNavbar();
  });
  