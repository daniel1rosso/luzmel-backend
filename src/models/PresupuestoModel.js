const mongoose = require('mongoose');

const PresupuestoSchema = mongoose.Schema({
    cliente: { type: Array, required: true },
    estado: { type: Array, required: true },
    total: { type: Number, required: true },
    descuentoEspecial: Number,
    flete: Number,
    descuento: Number,
    precio: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('presupuestos', PresupuestoSchema);