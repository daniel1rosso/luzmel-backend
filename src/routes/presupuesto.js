const express = require('express');
const router = express.Router();
const PresupuestoModel = require('../models/PresupuestoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los presupuestos ---//
router.get('/', checkAuth, async(req, res) => {
    try {
        const presupuestos = await PresupuestoModel.find();
        res.status(201).json(presupuestos);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de una presupuesto ---//
router.get('/:presupuesto_id', checkAuth, async(req, res) => {
    try {
        const presupuesto = await PresupuestoModel.find({ _id: req.params.presupuesto_id });
        res.status(201).json(presupuesto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo presupuesto ---//
router.post('/new_presupuesto', checkAuth, async(req, res) => {
    try {

        const presupuesto = new PresupuestoModel({
            cliente: req.body.cliente,
            estado: req.body.estado,
            descuentoEspecial: req.body.descuentoEspecial,
            flete: req.body.flete,
            descuento: req.body.descuento,
            precio: req.body.precio
        });

        //--- New presupuesto ---//
        const createdPrespuesto = await presupuesto.save()
        res.status(201).json(createdPrespuesto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un presupuesto ---//
router.put('/:presupuesto_id', checkAuth, (req, res) => {
    //--- Update presupuesto ---//
    PresupuestoModel.updateMany({ _id: req.params.presupuesto_id }, { $set: req.body }).exec()
    .then(async () => {
        res.status(201).json(req.body)
    }).catch(err => {
        res.status(500).json({ message: err })
    })
});

//--- Borrado de un presupuesto ---//
router.delete('/:presupuestoID', checkAuth, async(req, res) => {
    try {
        //--- Delete Presupuesto ---//
        const deletePresupuesto = await PresupuestoModel.deleteOne({ _id: req.params.presupuestoID })
        res.status(201).json(deletePresupuesto)
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;