

export const BASE_URL = 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Extrae el mensaje enviado desde el backend 
      //const serverMessage = data.mensaje || data.msg || data.error || 'Credenciales incorrectas o error en la solicitud';
      const serverMessage = data.mensaje || 'Credenciales incorrectas o error en la solicitud';
      throw new Error(serverMessage);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}