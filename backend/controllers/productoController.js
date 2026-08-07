const Producto = require("../models/producto");

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
};


//agregar un nuevo producto
const crearProducto = async (req, res) => {
    try {
        // Extraemos los datos que vienen en el cuerpo de la petición (Postman)
        const { id, nombre, categoria, descripcion, precio_costo,precio_venta, cantidad, imagen    } = req.body;

        if (!id || !nombre || !categoria || !descripcion || !precio_costo || precio_venta || !cantidad) {
            return res.status(400).json({ message: 'faltan campos o se ingresaron de manera incorrecta' });
        }
        // Creamos una nueva instancia del modelo con esos datos
        const nuevoProducto = new Producto({
            id,
            nombre,
            categoria,
            descripcion,
            precio_costo,
            precio_venta,
            cantidad,
            imagen
        });
        // Guardamos el producto en la base de datos de MongoDB
        await nuevoProducto.save();

      
        return res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: nuevoProducto
        });
    } catch (error) {
               if (error.code === 11000) {
             return res.status(400).json({
                mensaje: 'Error: El código del Producto ya existe en la base de datos'
            });
        }
    }
};

//buscar productos por coincidencia en nombre o categoria
const buscarProductos = async (req, res) =>  {
    try {
        const termino = req.query.q;
        if (!termino) return res.status(400).json({ message: 'Debe proveer un término de búsqueda ?q=' });

        // Busca coincidencias parciales (case-insensitive) tanto en nombre como en descripción
        const productos = await Producto.find({
            $or: [
                { categoria: { $regex: termino, $options: 'i' }},
                 {nombre: { $regex: termino, $options: 'i' } }
              
            ]
        });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//buscar productos por categoria
const buscarxCategoria = async (req, res) => {
    try {
        const categoriaNombre = req.params.nombre;
        // Búsqueda exacta ignorando mayúsculas/minúsculas usando regex
        const productos = await Producto.find({ categoria: { $regex: `^${categoriaNombre}$`, $options: 'i' } });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// actualizar producto existente
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Capturamos el código de la URL
        const datosAActualizar = req.body; // Capturamos los nuevos datos del body

        // Buscamos por código y actualizamos. 
        // { new: true } hace que MongoDB devuelva el producto ya modificado en lugar del viejo.
        const claseActualizado = await Producto.findOneAndUpdate(
            { id: Number(id) }, 
            datosAActualizar, 
            { returnDocument:'after', runValidators: true } 
        );

        // Si el producto con ese código no existe
        if (!claseActualizado) {
            return res.status(404).json({
                mensaje: `No se pudo actualizar. No existe el producto con el código ${id}`
            });
        }

        // Si todo sale bien, respondemos con el producto modificado
        return res.status(200).json({
            mensaje: 'producto actualizado exitosamente',
            clase: claseActualizado
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Hubo un error al actualizar el producto',
            error: error.message
        });
    }
};

//eliminar un producto existente
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Capturamos el código de la URL

        // Buscamos el producto por su código único y lo borramos de la base de datos
        const productoEliminado = await Producto.findOneAndDelete({ id: Number(id) });

        // Si el producto no existe en la base de datos
        if (!productoEliminado) {
            return res.status(404).json({
                mensaje: `No se pudo eliminar. No existe el producto con el código ${id}`
            });
        }

        // Si se eliminó correctamente, respondemos con un estado 200 (OK)
        return res.status(200).json({
            mensaje: 'Producto eliminado exitosamente',
            producto: productoEliminado
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Hubo un error al eliminar el producto',
            error: error.message
        });
    }
};




module.exports = {
    obtenerProductos,
    crearProducto,
    buscarProductos,
    buscarxCategoria,
    actualizarProducto,
    eliminarProducto
};
