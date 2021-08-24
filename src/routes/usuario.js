const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UsuarioModel = require('../models/UsuarioModel');

//--- Todos los usuarios ---//
router.get('/', async(req, res) => {
    try {
        const users = await UsuarioModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un usuario ---//
router.get('/:user_id', async(req, res) => {
    try {
        const user = await UsuarioModel.find({ _id: req.params.user_id });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo usuario ---//
router.post('/signup', async(req, res) => {
    try {
        const existingUser = await UsuarioModel.find({ nombreUsuario: req.body.nombreUsuario })
        if (existingUser.length !== 0) {
            return res.status(409).json({ message: "The User does exist ..." })
        }
        const hashPassword = await bcrypt.hash(req.body.contra, 10);
        
        const user = new UsuarioModel({
            nombreUsuario: req.body.nombreUsuario,
            contra: hashPassword
        });
        //--- New User ---//
        const createdUser = await user.save()
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de usuario ---//
router.put('/:user_id', async (req, res) => {
    try {
        //--- Hash Password ---//
        req.body.password = await bcrypt.hash(req.body.password, 10)
        //--- Update User ---//
        await UsuarioModel.updateMany({ _id: req.params.user_id }, { $set: req.body }).exec()
        .then(async () => {
            res.status(201).json(req.body)
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Borrado de usuario ---//
router.delete('/:userID', async(req, res) => {
    try {
        //--- Delete User ---//
        const deleteUser = await UsuarioModel.deleteOne({ _id: req.params.userID })
        res.status(200).json({
            message: 'User been deleted ...',
            data: deleteUser,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;
