const {render} = require("ejs");
const {application} = require("express");
const express = require('express');
const rutas = express.Router();

const proveedores = require('../modelo/proveedor');
const producto = require('../modelo/productos');

rutas.use(function(req, res, next){
    if(req.query._method=="DELETE"){
        req.method="DELETE";
        req.url = req.path;
    }
    next();
})

rutas.get('/consultarProveedores', async(req, res)=>{
    const listaProveedores = await proveedores.find();
    res.send(listaProveedores);
});

rutas.get('/registrarProveedor', async(req, res)=>{
    res.render('RegistrarProveedor');
});

rutas.post('/registrarProveedor', async(req, res)=>{
    var p = new proveedores(req.body);
    await proveedores.insertMany(p);
    res.redirect('/registrarProveedor');   
});

rutas.get('/registrar', async(req, res)=>{
    const list = await proveedores.find();
    res.render('registrar', {list});
});

rutas.get('/eliminarProveedor', async(req, res)=>{
    const listaProve = await proveedores.find();
    res.render('eliminarProveedor', {listaProve});
});

rutas.delete('/eliminarProveedor/:id', async(req,res, next)=>{
    const id = req.params.id;
    await proveedores.deleteOne({id:id});
    res.redirect('/eliminarProveedor')
});

rutas.get('/actualizarProducto/:id', async(req, res)=>{
    const list = await proveedores.find();
    const id = req.params.id;
    const productodb = await producto.findOne({id:id}).exec();
    res.render('actualizarProducto', {list, productodb});
    
});

module.exports = rutas;