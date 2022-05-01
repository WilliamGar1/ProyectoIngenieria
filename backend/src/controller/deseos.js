const MySQLBD = require("../config/mysql.config");

const agregarDeseo = async (req,res)=>{
    const {clienteId,productoId} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`INSERT INTO ListaDeseos(clienteId,productoId) VALUES (${clienteId},${productoId})`, (err, DeseoRes) => {
        if(err){
            res.send({mensaje:`Error al guardar deseo`,exito:0});
            console.log("Close Connection");
            conectBD.end();
        }
        else{

            res.send({mensaje:`Deseo guardado`,exito:1});
            console.log("Close Connection");
            conectBD.end();
        }

    });

}

const eliminarDeseo = async (req,res)=>{

    const {deseoId} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`UPDATE ListaDeseos SET  estadoHabilitacion = FALSE WHERE Id = ${deseoId}`, (err, DeseoRes) => {
        if(err){
            res.send({mensaje:`Error al eliminar deseo`,exito:0});
            console.log("Close Connection");
            conectBD.end();
        }
        else{

            res.send({mensaje:`Deseo eliminado`,exito:1});
            console.log("Close Connection");
            conectBD.end();
        }

    });

}

const eliminarDeseo_2 = async (req,res)=>{

    const {clienteId,productoId} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`DELETE FROM ListaDeseos WHERE clienteId = ${clienteId} AND productoId = ${productoId}`, (err, DeseoRes) => {
        if(err){
            res.send({mensaje:`Error al eliminar deseo`,exito:0});
            console.log("Close Connection");
            conectBD.end();
        }
        else{

            res.send({mensaje:`Deseo eliminado`,exito:1});
            console.log("Close Connection");
            conectBD.end();
        }

    });

}

const estadoDeseo = async (req,res)=>{

    const {clienteId,productoId} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM ListaDeseos WHERE clienteId = ${clienteId} AND productoId = ${productoId}`, (err, DeseoRes) => {
        if(err){
            res.send({mensaje:`Error al eliminar deseo`,exito:0});
        }
        else if(DeseoRes.length){
            res.send({mensaje:`Deseo encontrado`,deseo:DeseoRes,exito:1});
        }else{
            res.send({mensaje:`No hay deseos`,exito:0});
        }

        console.log("Close Connection");
        conectBD.end();
    });

}

const listaDeseoProductos = async (req,res)=>{

    const clienteId = req.params.id;
    const conectBD = MySQLBD.conectar();

    conectBD.query(`SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo,CONCAT(u.nombre,' ',u.apellido) Usuario , c.nombre Categoria, c.Id CategoriaId,ld.Id Deseo FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
    INNER JOIN Usuarios u ON u.Id = p.personaId
    INNER JOIN ListaDeseos ld ON ld.productoId = p.Id
    AND ld.clienteId= ${clienteId} 
    AND p.estadoHabilitacion = TRUE
    AND ld.estadoHabilitacion = TRUE
    GROUP BY p.Id`, (err, ProductoRes) => {
        
        if(err){
            res.send({mensaje:`Error al buscar productos `,exito:0});
            console.log("Close Connection");
            conectBD.end();
        }else{
            if(ProductoRes.length){
            res.send({mensaje:'Productos encontrados',productos:ProductoRes,exito:1});
            }else{
            res.send({mensaje:'No hay Productos',exito:0})  
            }
        }
       
        console.log("Close Connection");
        conectBD.end(); 
    });

}

module.exports = {
    agregarDeseo,
    eliminarDeseo,
    eliminarDeseo_2,
    estadoDeseo,
    listaDeseoProductos
}