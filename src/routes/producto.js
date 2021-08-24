const express = require('express');
const router = express.Router();
const ProductoModel = require('../models/ProductoModel');
//--- Todos los productos ---//
router.get('/', async(req, res) => {
    try {
        const productos = await ProductoModel.find();
        res.status(201).json(productos);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Datos de un producto ---//
router.get('/:producto_id', async(req, res) => {
    try {
        const producto = await ProductoModel.find({ _id: req.params.producto_id });
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo Producto ---//
router.post('/new_producto', async(req, res) => {
    try {
        const existingProducto = await ProductoModel.find({ nombre: req.body.nombre})
        if (existingProducto.length !== 0) {
            return res.status(409).json({ message: "The Producto does exist ..." })
        }
        const producto = new ProductoModel({
            nombre: req.body.nombre,
            cantidadProducto: req.body.cantidadProducto,
            descripcion: req.body.descripcion,
            precioUnitario: req.body.precioUnitario,
            disponibles: req.body.disponibles,
            clasificacion: req.body.clasificacion,
        });

        if(req.file){
            const {filename} = req.file
            producto.setImgUrl(filename)
        }
        
        //--- New Producto ---//
        const createdProducto = await producto.save()
        res.status(201).json(createdProducto);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de producto ---//
router.put('/:producto_id', (req, res) => {
    //--- Update Producto ---//
    ProductoModel.updateMany({ _id: req.params.producto_id }, { $set: req.body }).exec()
    .then(async () => {
        res.status(201).json(req.body)
    }).catch(err => {
        res.json({ message: err })
    })
});

//--- Borrado de producto ---//
router.delete('/:productoID', async(req, res) => {
    try {
        //--- Delete Producto ---//
        const deleteProducto = await ProductoModel.deleteOne({ _id: req.params.productoID }).exec()
        res.status(200).json({
            message: 'Producto been deleted ...',
            data: deleteProducto,
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;