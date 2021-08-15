const express = require('express');
const router = express.Router();
const EstadoModel = require('../models/EstadoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los estados ---//
router.get('/', async(req, res) => {
    try {
        const estados = await EstadoModel.find();
        res.status(201).json(estados);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un estado ---//
router.get('/:estado_id', checkAuth, async(req, res) => {
    try {
        const estado = await EstadoModel.find({ _id: req.params.estado_id });
        res.status(201).json(estado);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo estado ---//
router.post('/new_estado', checkAuth, async(req, res) => {
    try {
        const existingEstado = await EstadoModel.find({ nombre: req.body.nombre })
        if (existingEstado.length !== 0) {
            return res.status(409).json({ message: "The estado does exist ..." })
        }
        const estado = new EstadoModel({
            nombre: req.body.nombre,
        });
        const createdEstado = await estado.save();
        res.status(201).json(createdEstado);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion del estado ---//
router.put('/:estado_id', checkAuth, (req, res) => {
    EstadoModel.updateMany({ _id: req.params.estado_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado del estado ---//
router.delete('/:estadoID', checkAuth, async(req, res) => {
    try {
        const deleteEstado = await EstadoModel.deleteOne({ _id: req.params.estadoID })
        res.status(200).json({
            message: 'Esado been deleted ...',
            data: deleteEstado,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;