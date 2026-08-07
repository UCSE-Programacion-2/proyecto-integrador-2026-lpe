const mongoose = require('mongoose');

// 1. Creamos el esquema (la estructura de los datos)
const productoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Esto cumple con que sea un "Número único"
    },
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    precio_venta: {
        type: Number,
        required: true
    },
    precio_costo: {
        type: Number,
        required: true  
    },
    cantidad: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }


});


const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
