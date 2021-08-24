const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombreUsuario: { type: String, required: true },
    contra: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('usuarios', UsuarioSchema);