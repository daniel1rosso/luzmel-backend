const mongoose = require('mongoose');

const ClasificacionSchema = mongoose.Schema({
    nombre: String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('clasificaciones', ClasificacionSchema);