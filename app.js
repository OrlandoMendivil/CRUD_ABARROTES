const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

//Conexion a la base de datos. 
const dataBase = require('mongoose');
dataBase.connect("mongodb://127.0.0.1/abarrotes").
then(dataBase => console.log("Conectado")).
catch(err=>console.log(err));

app.set('views',__dirname + '/vistas');
app.set('view engine', 'ejs');
app.disable('view cache');

const rutasProve = require('./rutas/proveedorRutas');
const rutas = require('./rutas/index');

app.use('/',rutasProve);
app.use('/',rutas);




app.listen(8000, ()=>{
    console.log("Servidor Activo"); 
})