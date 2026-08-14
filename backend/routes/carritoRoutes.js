const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const { proteger } = require('../middlewares/authMiddleware');

router.get('/', proteger, carritoController.obtenerCarrito);
router.post('/', proteger, carritoController.agregarProducto);
router.delete('/:productoId', proteger, carritoController.eliminarProducto);

module.exports = router;