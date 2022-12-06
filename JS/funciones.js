const proveedor = require('../modelo/proveedor');
exports.buscarNombre = ( nombreProveedor)=>{
    //console.log(nombreProveedor);
    const prove =  proveedor.findOne({'nombreProveedor':nombreProveedor});

    
    prove.exec(function(err, provedor){ 
        //var id = provedor._id;
        console.log(provedor._id);
        return provedor.id;

    })
}



