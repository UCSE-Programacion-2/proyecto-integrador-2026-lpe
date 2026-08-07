const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, 
    required: true },
  email: { type: String, 
    required: true, 
    unique: true },
  password: { type: String, 
    required: true },
  rol: { type: String, 
    enum: ['user', 'admin'], // Definimos los roles posibles
    default: 'user' } // Por defecto, todos los usuarios son 'user'
}, { timestamps: true });

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas en el Login
usuarioSchema.methods.matchPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);