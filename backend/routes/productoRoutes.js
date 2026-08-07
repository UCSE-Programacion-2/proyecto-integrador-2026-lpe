const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { proteger, esAdmin } = require('../middlewares/authMiddleware');


router.get('/', productoController.obtenerProductos);
router.get('/buscar', productoController.buscarProductos);
router.post('/', proteger, esAdmin, productoController.crearProducto);
router.get('/categoria/:nombre',productoController.buscarxCategoria)
router.put('/:id' ,proteger, esAdmin, productoController.actualizarProducto);
router.delete('/:id', proteger, esAdmin, productoController.eliminarProducto);

module.exports = router;

