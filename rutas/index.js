const { render } = require('ejs');
const {application} = require('express');
const express = require('express');
const rutas = express.Router();

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

rutas.get('/consultar', async(req, res)=>{
    const listaProductos = await producto.find().populate({path: 'proveedor', select:'nombreProveedor -_id'});
    res.render("consultar",{listaProductos});
    
});

rutas.get('/prueba', async(req, res)=>{
 producto.find().populate({path: 'proveedor', select:'nombreProveedor -_id'}).exec(function(err, proveedor){
        if(err){}
        arr = proveedor;
        res.json(arr);
        console.log(arr);
    });
});

rutas.post('/registrar', async(req, res)=>{
    var p = new producto(req.body);
    await producto.insertMany(p);
    res.redirect('/registrar');
});

//rutas.get('/registrar', async(req,res)=>{
  //  res.render("registrar");
//})

rutas.delete('/eliminar/:id', async(req,res, next)=>{
    const id = req.params.id;
    await producto.deleteOne({id:id});
    res.redirect('/eliminar')
});

rutas.get('/eliminar',async(req,res)=>{
    const listaProductos = await producto.find();
    res.render("eliminar",{listaProductos});
});

//rutas.get('/actualizar/:id',async(req,res)=>{
  //  const id = req.params.id;
    //console.log(id);
    //const productodb = await producto.findOne({id:id}).exec();
    //res.render("actualizarProducto",{productodb});
//});

module.exports = rutas;