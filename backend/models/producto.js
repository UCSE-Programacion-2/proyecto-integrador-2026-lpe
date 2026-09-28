const mongoose = require('mongoose');

// 1. Creamos el esquema (la estructura de los datos)
const productoSchema = new mongoose.Schema({
   
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
    //precio_venta podria usarse para distingir entre el precio de costo y el precio de venta al publico
    precio_venta: { 
        type: Number,
        required: false
    },
    precio: {
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
