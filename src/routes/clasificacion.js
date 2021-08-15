const express = require('express');
const router = express.Router();
const ClasificacionModel = require('../models/ClasificacionModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos las clasificaciones ---//
router.get('/', async(req, res) => {
    try {
        const clasificaciones = await ClasificacionModel.find();
        res.status(201).json(clasificaciones);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de una clasificacion ---//
router.get('/:clasificacion_id', checkAuth, async(req, res) => {
    try {
        const clasificacion = await ClasificacionModel.find({ _id: req.params.clasificacion_id });
        res.status(201).json(clasificacion);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nueva clasificacion ---//
router.post('/new_clasificacion', checkAuth, async(req, res) => {
    try {
        const existingClasificacion = await ClasificacionModel.find({ nombre: req.body.nombre })
        if (existingRol.length !== 0) {
            return res.status(409).json({ message: "The clasification does exist ..." })
        }
        const clasificacion = new ClasificacionModel({
            nombre: req.body.nombre,
        });
        const createdClasificacion = await clasificacion.save();
        res.status(201).json(createdClasificacion);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de la clasificacion ---//
router.put('/:clasificacion_id', checkAuth, (req, res) => {
    ClasificacionModel.updateMany({ _id: req.params.clasificacion_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de la clasificacion ---//
router.delete('/:clasificacionID', checkAuth, async(req, res) => {
    try {
        const deleteClasificacion = await ClasificacionModel.deleteOne({ _id: req.params.clasificacionID })
        res.status(200).json({
            message: 'Rol been deleted ...',
            data: deleteClasificacion,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;