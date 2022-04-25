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
                    res.send({mensaje:'Vendedor Calificado',exito:1});
                }
        
                console.log("Close Connection");
                conectBD.end();
            });

        }

    });

 

};

const calificacionMedia = async (req,res)=>{

    const vendedorId= req.params.id;   
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT SUM(calificacion)/COUNT(*) CalificacionMedia, COUNT(*) cantidad FROM Calificaciones WHERE vendedorId = ${vendedorId}`, (err, CalificacionRes) => {


        if(err){
        res.send({mensaje:'Error al optener calificacion',exito:0});
        }else{
            res.send({mensaje:'Calificacion Encontrada',CalificacionMedia:CalificacionRes[0].CalificacionMedia,cantidad:CalificacionRes[0].cantidad,exito:1});
        }
        
        console.log("Close Connection");
        conectBD.end();
    });

};


const recibirDenuncia = async (req,res)=>{
    const {clienteId,vendedorId,detalle} = req.body; 
    const conectBD = MySQLBD.conectar();
    
    conectBD.query(`INSERT INTO Denuncias(clienteId,vendedorId,detalle) VALUES (${clienteId},${vendedorId},'${detalle}')`, (err, DenunciarRes) => {

        if(err){
        res.send({mensaje:'Error al enviar denuncia',exito:0});
        }else{
            res.send({mensaje:'Vendedor denunciado',exito:1});
        }

        console.log("Close Connection");
        conectBD.end();
    });
};

const getAll_Denuncias = async (req,res) => {
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Denuncias WHERE estado = TRUE`, (err, DenunciasRes) => {

        if(err){
        res.send({mensaje:'Error al buscar denuncias',exito:0});
        }else{
            res.send({mensaje:'Denuncias Encontradas',denuncias:DenunciasRes,exito:1});
        }

        console.log("Close Connection");
        conectBD.end();
    });
};

const getAll_DenunciasResueltas = async (req,res) => {
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Denuncias WHERE estado = FALSE`, (err, DenunciasRes) => {

        if(err){
        res.send({mensaje:'Error al buscar denuncias',exito:0});
        }else{
            res.send({mensaje:'Denuncias Encontradas',denuncias:DenunciasRes,exito:1});
        }

        console.log("Close Connection");
        conectBD.end();
    });
};


const tacharDenuncia = async (req,res) => {

    const {denunciaId} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`UPDATE Denuncias SET estado = FALSE WHERE Id = ${denunciaId}`, (err, DenunciasRes) => {

        if(err){
        res.send({mensaje:'Error al <Tachar>',exito:0});
        }else{
       
            res.send({mensaje:'Denuncia <Tachada>',exito:1});
        }

        console.log("Close Connection");
        conectBD.end();
    });
};


module.exports = {
    calificarVendedor,
    calificacionMedia,
    recibirDenuncia,
    getAll_Denuncias,
    getAll_DenunciasResueltas,
    tacharDenuncia
}