const jwt = require('jsonwebtoken');

exports.proteger = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded; // Guardamos id y rol en req.usuario
      next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
  } else {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};

// Middleware opcional para verificar si es Admin
exports.esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado: Se requieren permisos de administrador' });
  }
};

