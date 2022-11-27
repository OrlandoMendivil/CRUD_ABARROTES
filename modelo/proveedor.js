const mongo = require('mongoose');
const esquema = mongo.Schema;

const proveEsq = new esquema({
    id:String,
    nombreProveedor:String,
    direc:String,
    telefono: String
});

module.exports = mongo.model("proveedores",proveEsq);