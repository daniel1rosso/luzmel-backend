const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: String,
    disponibles: Number,
    descripcion: String,
    cantidadProducto: Number,
    cantidadStock: Number,
    precioUnitario: Number,
    clasificacion: Array,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('productos', ProductoSchema);