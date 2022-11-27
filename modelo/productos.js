const mongoose = require('mongoose');
const esquema= mongoose.Schema;

const producEsquema = new esquema({
    id: String,
    nombreProducto: String,
    precio: String,
    cantidad: esquema.Types.Number,
    proveedor: {type:esquema.ObjectId, ref:"proveedores"}
});

module.exports = mongoose.model('productos',producEsquema);