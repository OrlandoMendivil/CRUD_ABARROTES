const mongoose = require('mongoose');
const esquema= mongoose.Schema;

const producEsquema = new esquema({
    id: String,
    nombreProducto: String,
    precio: String,
    cantidad: esquema.Types.Number
});

module.exports = mongoose.model('productos',producEsquema);