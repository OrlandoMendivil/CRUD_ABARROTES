const {render} = require("ejs");
const {application} = require("express");
const express = require('express');
const rutas = express.Router();

const proveedores = require('../modelo/proveedor');

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

module.exports = rutas;