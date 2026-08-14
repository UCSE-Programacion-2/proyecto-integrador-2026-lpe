const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, unique: true },
    productos: [{
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
            cantidad: {type: Number, required: true, default: 1, min: 1}}
    ]}, { timestamps: true });

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;