const MySQLBD = require("../config/mysql.config");

const calificarVendedor = async (req,res)=>{

    const {clienteId,vendedorId,calificacion} = req.body;   
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Calificaciones WHERE clienteId = ${clienteId} AND vendedorId = ${vendedorId} `, (err, CalificarRes) => {
        if(err){  res.send({mensaje:'Error al calificar vendedor',exito:0});
                console.log("Close Connection");
                    conectBD.end();}
        else{
           
            let query =`INSERT INTO Calificaciones(clienteId,vendedorId,calificacion) VALUES (${clienteId},${vendedorId},${calificacion})`;
            if(CalificarRes.length){
                
                query=`UPDATE Calificaciones SET calificacion = ${calificacion} WHERE clienteId = ${clienteId} AND vendedorId = ${vendedorId}`;
            }
      
            conectBD.query(query, (err, CalificarRes) => {

                if(err){
                res.send({mensaje:'Error al calificar vendedor',exito:0});
                }else{
                    res.send({mensaje:'Vendedor Calificado',CalificarRes,exito:1});
                }
        
                console.log("Close Connection");
                conectBD.end();
            });

        }

    });

 

};

const calificacionMedia = async (req,res)=>{

    const {vendedorId}= req.body;   
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT SUM(calificacion)/COUNT(*) CalificacionMedia FROM Calificaciones WHERE vendedorId = ${vendedorId}`, (err, CalificacionRes) => {


        if(err){
        res.send({mensaje:'Error al optener calificacion',exito:0});
        }else{
            res.send({mensaje:'Calificacion Encontrada',CalificacionMedia:CalificacionRes[0].CalificacionMedia,exito:1});
        }
        
        console.log("Close Connection");
        conectBD.end();
    });

};


module.exports = {
    calificarVendedor,
    calificacionMedia
}