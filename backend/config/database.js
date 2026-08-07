const mongoose = require('mongoose');

// Para versiones de Node 24.14.0 o superior
const dns = require('dns');
dns.setServers(['8.8.8.8']);




const conectarDB = async () => {
    try {
      
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado correctamente a MongoDB Atlas");
        
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}



module.exports = conectarDB;