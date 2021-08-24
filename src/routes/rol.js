const express = require('express');
const router = express.Router();
const RolModel = require('../models/RolModel');

//--- Todos los roles ---//
router.get('/', async(req, res) => {
    try {
        const roles = await RolModel.find();
        res.status(201).json(roles);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un rol ---//
router.get('/:rol_id', async(req, res) => {
    try {
        const rol = await RolModel.find({ _id: req.params.rol_id });
        res.status(201).json(rol);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo rol ---//
router.post('/new_rol', async(req, res) => {
    try {
        const existingRol = await RolModel.find({ nombre: req.body.nombre })
        if (existingRol.length !== 0) {
            return res.status(409).json({ message: "The Rol does exist ..." })
        }
        const rol = new RolModel({
            nombre: req.body.nombre,
        });
        const createdRol = await rol.save();
        res.status(201).json(createdRol);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de rol ---//
router.put('/:rol_id', (req, res) => {
    RolModel.updateMany({ _id: req.params.activo_id }, { $set: req.body }).exec()
        .then(() => {
            res.json(req.body)
        }).catch(err => {
            res.json({ message: err })
        })
});

//--- Borrado de rol ---//
router.delete('/:rolID', async(req, res) => {
    try {
        const deleteRol = await RolModel.deleteOne({ _id: req.params.rolID })
        res.status(200).json({
            message: 'Rol been deleted ...',
            data: deleteRol,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;