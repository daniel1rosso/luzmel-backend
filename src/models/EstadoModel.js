const mongoose = require('mongoose');

const EstadoSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('estados', EstadoSchema);