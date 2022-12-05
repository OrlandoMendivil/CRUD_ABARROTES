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
    if(req.query._method=='PUT'){
        req.method='PUT';
        req.url= req.path;
    }
    next();
})

rutas.get('/consultarProveedores', async(req, res)=>{
    const listaProveedores = await proveedores.find();
    res.render("consultarProveedores", {listaProveedores});

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
    //if(list.length == 0){
       //res.redirect('/consultar');
    //}else{
        res.render('registrar', {list});
    //}
});

rutas.get('/editarProveedor', async(req, res)=>{
    const listaProve = await proveedores.find();
    res.render('editarProveedor', {listaProve});
});

rutas.delete('/editarProveedor/:id', async(req,res, next)=>{
    const id = req.params.id;
    await proveedores.deleteOne({id:id});
    res.redirect('/editarProveedor')
});

rutas.get('/actualizarProducto/:id', async(req, res)=>{
    const list = await proveedores.find();
    const id = req.params.id;
    const productodb = await producto.findOne({id:id}).exec();
    res.render('actualizarProducto', {list, productodb});
    
});

rutas.put('/actualizarProducto/:id', async(req,res, next)=>{
    const id = req.params.id;
    var p = new producto(req.body);

    await producto.updateOne({id:id}, { $set:{nombreProducto: p.nombreProducto} });
    await producto.updateOne({id:id}, { $set:{precio: p.precio} });
    await producto.updateOne({id:id}, { $set:{cantidad: p.cantidad} });
    await producto.updateOne({id:id}, { $set:{proveedor: p.proveedor} });

    res.redirect('/editarProductos');

});

rutas.get('/actualizarProveedor/:id', async(req, res)=>{
    const id = req.params.id;
    const proveedordb = await proveedores.findOne({id:id}).exec();
    res.render('actualizarProveedor', {proveedordb});
    
});

rutas.put('/actualizarProveedor/:id', async(req,res, next)=>{
    const id = req.params.id;
    var p = new proveedores(req.body);

    await proveedores.updateOne({id:id}, { $set:{nombreProveedor: p.nombreProveedor} });
    await proveedores.updateOne({id:id}, { $set:{direc: p.direc} });
    await proveedores.updateOne({id:id}, { $set:{telefono: p.telefono} });

    res.redirect('/editarProveedor');

});

module.exports = rutas;