const express = require('express');
const cors = require('cors'); // para permitir solicitudes desde el frontend npm install cors
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes');
const conectarDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

conectarDB();

app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

