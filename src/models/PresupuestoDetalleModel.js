const mongoose = require('mongoose');

const PresupuestoDetalleSchema = mongoose.Schema({
    producto: { type: Array, required: true },
    cantidad: { type: Number, required: true },
    precioFinal: { type: Number, required: true },
    idPresupuesto: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('presupuestos_detalle', PresupuestoDetalleSchema);