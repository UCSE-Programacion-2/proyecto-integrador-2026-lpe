const Carrito = require('../models/Carrito');
const Producto = require('../models/producto');

const obtenerCarrito = async (req,res) => {
    try {
    const carrito = await Carrito.findOne({ usuario: req.usuario.id}).populate('productos.producto');
    if (!carrito) {
        return res.status(200).json({ productos: [] });
    }
    res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const agregarProducto = async (req, res) => {
    try {
        const { productoId, cantidad } = req.body;
        const usuarioId = req.usuario.id;

        const productoDB = await Producto.findById(productoId);

        if (!productoDB) {

            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        let carrito = await Carrito.findOne({ usuario: usuarioId });

        if (!carrito) {

            carrito = new Carrito({usuario: usuarioId, productos: [{ producto: productoId, cantidad: cantidad || 1 }]});

        } else {
            const index = carrito.productos.findIndex(p => p.producto.toString() === productoId);

            if (index > -1) {
                carrito.productos[index].cantidad += (cantidad || 1);
            } else {
                carrito.productos.push({ producto: productoId, cantidad: cantidad || 1 });
            }
        }

        await carrito.save();
        res.status(200).json({ mensaje: 'Producto agregado al carrito exitosamente', carrito });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { productoId } = req.params;
        const usuarioId = req.usuario.id;

        const carrito = await Carrito.findOne({ usuario: usuarioId });
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }

        carrito.productos = carrito.productos.filter(p => p.producto.toString() !== productoId);

        await carrito.save();
        res.status(200).json({ mensaje: 'Producto eliminado del carrito', carrito });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {obtenerCarrito, agregarProducto, eliminarProducto};