const express = require('express');
const router = express.Router();
const PresupuestoDetalleModel = require('../models/PresupuestoDetalleModel');
const ProductoModel = require('../models/ProductoModel');
const checkAuth = require('../middleware/checkAuth');

//--- Todos los detalle de un presupuesto ---//
router.get('/:presupuesto_id', async(req, res) => {
    try {
        const presupuesto_detalle = await PresupuestoDetalleModel.find({ idPresupuesto: req.params.presupuesto_id });
        res.status(201).json(presupuesto_detalle);
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Nuevo detalle de presupuesto ---//
router.post('/new_presupuesto_detalle/:presupuesto_id', async(req, res) => {
    try {
        const producto = req.body.producto
        const cantidad_detalle = req.body.cantidad
        //-- Producto de la coleccion --//
        producto_collection = await ProductoModel.find({ _id: producto._id })
        //-- Nuevo sotck --//
        const cantidad_stock = producto_collection[0].cantidad - cantidad_detalle
        //-- Asignacion del nuevo stock del producto --//
        producto.cantidad = cantidad_stock
        
        ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
        .then(() => {
            const presupuesto_detalle = new PresupuestoDetalleModel({
                producto: req.body.producto,
                cantidad: req.body.cantidad,
                precioFinal: req.body.precioFinal,
                idPresupuesto: req.params.presupuesto_id
            });
            const createdPresupuestoDetalle = presupuesto_detalle.save();
            res.status(201).json(createdPresupuestoDetalle);
        }).catch(err => {
            res.json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

//--- Actualizacion de un detalle de presupuesto ---//
router.put('/:presupuesto_detalle_id', async (req, res) => {
    const producto = req.body.producto
    const cantidad_detalle = req.body.cantidad
    
    //-- Producto de la coleccion --//
    producto_collection = await ProductoModel.find({ _id: producto._id })
    presupuesto_detalle = await PresupuestoDetalleModel.find({ _id: req.params.presupuesto_detalle_id });
    
    //-- Nuevo sotck --//
    if (cantidad_detalle > presupuesto_detalle.cantidad){
        cantidad_stock = producto_collection[0].cantidad - cantidad_detalle
    } else if (cantidad_detalle < presupuesto_detalle.cantidad) {
        cantidad_stock = producto_collection[0].cantidad + cantidad_detalle
    } else {
        cantidad_stock = cantidad_detalle
    }
    
    //-- Asignacion del nuevo stock del producto --//
    (cantidad_detalle != presupuesto_detalle.cantidad) ? producto.cantidad = cantidad_stock : "";

    ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
    .then( async () => {
        await PresupuestoDetalleModel.updateMany({ _id: req.params.presupuesto_detalle_id }, { $set: req.body }).exec()
            .then(() => {
                res.status(201).json(req.body)
            }).catch(err => {
                res.status(500).json({ message: err })
            })
    }).catch(err => {
        res.status(500).json({ message: err })
    })
});

//--- Borrado de una presupuesto ---//
router.delete('/:detallePresupuestoID', async(req, res) => {
    try {
        const producto = req.body.producto
        const cantidad_detalle = req.body.cantidad
        //-- Producto de la coleccion --//
        producto_collection = await ProductoModel.find({ _id: producto._id })
        //-- Nuevo sotck --//
        const cantidad_stock = producto_collection[0].cantidad + cantidad_detalle
        //-- Asignacion del nuevo stock del producto --//
        producto.cantidad = cantidad_stock

        ProductoModel.updateMany({ _id:  producto._id }, { $set: producto }).exec()
        .then( async () => {
            const deletedDetallePrespuesto = await PresupuestoDetalleModel.deleteOne({ _id: req.params.detallePresupuestoID })
            res.status(200).json({
                message: 'Detalle de presupuesto been deleted ...',
                data: deletedDetallePrespuesto,
            })
        }).catch(err => {
            res.status(500).json({ message: err })
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
});

module.exports = router;