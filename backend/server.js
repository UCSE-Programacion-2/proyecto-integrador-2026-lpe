const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const conectarDB = require('./config/database');

dotenv.config();

const app = express();
app.use(express.json());


conectarDB();

//app.use('/clases', clasesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

