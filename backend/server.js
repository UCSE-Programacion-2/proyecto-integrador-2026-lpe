const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const carritoRoutes = require('./routes/carritoRoutes');


dotenv.config();

const app = express();
app.use(express.json());


conectarDB();

app.use('/productos', productoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carrito', carritoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

