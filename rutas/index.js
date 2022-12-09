const { render } = require('ejs');
const {application} = require('express');
const express = require('express');
const rutas = express.Router();
const {requiresAuth} = require('express-openid-connect');

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

rutas.get('/consultar', requiresAuth(), async(req, res)=>{
    const listaProductos = await producto.find().populate({path: 'proveedor', select:'nombreProveedor -_id'});
    res.render("consultar",{listaProductos,     
        isAuthenticated: req.oidc.isAuthenticated(),
    });
    res.status(200).json();
    
});


rutas.post('/registrar', async(req, res)=>{
   var id = req.body.id;
   var nombreProducto = req.body.nombreProducto;
   var precio = req.body.precio;
   var cantidad = req.body.cantidad;
    var provedor = await proveedores.findOne({nombreProveedor:req.body.proveedor});
    console.log(provedor)
   var p = new producto({'id':id, 'nombreProducto': nombreProducto, 'precio':precio, 'cantidad':cantidad, 'proveedor':provedor._id});
    
    await producto.insertMany(p);
    res.redirect('/registrar');
});

    

//rutas.get('/registrar', async(req,res)=>{
  //  res.render("registrar");
//})

rutas.delete('/editarProductos/:id', async(req,res, next)=>{
    const id = req.params.id;
    await producto.deleteOne({id:id});
    res.redirect('/editarProductos')
});

rutas.get('/editarProductos', requiresAuth(),async(req,res)=>{
    const listaProductos = await producto.find().populate({path: 'proveedor', select:'nombreProveedor -_id'});
    res.render("editarProductos",{listaProductos,
        isAuthenticated: req.oidc.isAuthenticated(),
    });

});

rutas.post('/eliminarProducto', async(req, res)=>{
    try{
        await producto.deleteOne({id:req.body.id});
        res.status(200).send({success:true,msg:'Se ha eliminado el producto'});
    }catch(error){
        res.status(400).send({success:false, msg:error.message});
    }
});

//rutas.get('/actualizar/:id',async(req,res)=>{
  //  const id = req.params.id;
    //console.log(id);
    //const productodb = await producto.findOne({id:id}).exec();
    //res.render("actualizarProducto",{productodb});
//});


rutas.get('/', requiresAuth(),async(req,res)=>{
    console.log(req.oidc.isAuthenticated());
    res.render("inicio", {
        isAuthenticated: req.oidc.isAuthenticated(),
    });
});
module.exports = rutas;