const MySQLBD = require("../config/mysql.config");

const suscribirCategoria = async (req,res)=>{

    const {clienteId,categoriaId} = req.body; 

    const conectBD = MySQLBD.conectar();

    conectBD.query(`SELECT * FROM Suscripciones WHERE clienteId = ${clienteId} AND categoriaId = ${categoriaId}`, (err, SuscritoRes) => {
       
        if(err){  res.send({mensaje:'Error al suscribirse a la categoria',exito:0});
                console.log("Close Connection");
                conectBD.end();}
        else{
           
            if(SuscritoRes.length && SuscritoRes[0].estado)
            {
                
                res.send({mensaje:'Ya se encuentra suscrito a esta categoria',exito:0});
                console.log("Close Connection");
                conectBD.end();
            }
            
            else{
            let query =`INSERT INTO Suscripciones(clienteId,categoriaId) VALUES (${clienteId},${categoriaId});`;

            if(SuscritoRes.length){
                
                query=`UPDATE Suscripciones SET estado = TRUE  WHERE clienteId =${clienteId} AND categoriaId = ${categoriaId}`;
            }
      
            conectBD.query(query, (err, SuscripcionRes) => {

                if(err){
                res.send({mensaje:'Error al suscribirse a la categoria',exito:0});
                }else{
                    res.send({mensaje:'Se ha suscrito a la categoria',exito:1});
                }
        
                console.log("Close Connection");
                conectBD.end();
            });

        }}

    });

    
};

const cancelarSuscripcion = async (req,res)=>{

    const conectBD = MySQLBD.conectar();
    const {clienteId,categoriaId} = req.body; 

     conectBD.query(`SELECT * FROM Suscripciones WHERE clienteId = ${clienteId} AND categoriaId = ${categoriaId} AND estado = TRUE `, (err, SuscritoRes) => {
       
        if(err){  res.send({mensaje:'Error al cancelar suscripcion',exito:0});
                console.log("Close Connection");
                conectBD.end();}
        else{

            if(SuscritoRes.length){
                
                conectBD.query(`UPDATE Suscripciones SET estado = FALSE  WHERE clienteId =${clienteId} AND categoriaId = ${categoriaId} `, (err, SuscripcionRes) => {

                    if(err){
                    res.send({mensaje:'Error al cancelar suscripcion ',exito:0});
                    }else{
                        res.send({mensaje:'Suscripcion cancelada',exito:1});
                    }
            
                    console.log("Close Connection");
                    conectBD.end();
                });
               
            }else
            {
                res.send({mensaje:'No existe la suscripcion',exito:0});
                console.log("Close Connection");
                conectBD.end();  
            }

        }

    });
};


const suscripcionesCliente = async (req,res)=>{

    const {clienteId} = req.body; 

    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT c.nombre,s.* FROM Suscripciones s
                    INNER JOIN Categorias c ON c.Id = s.categoriaId 
                    AND s.clienteId = ${clienteId}
                    AND s.estado = TRUE`, (err, SuscripcionRes) => {

        if(err){
            res.send({mensaje:'Error al buscar suscripciones',exito:0});
            }else{

                if(SuscripcionRes.length){
                res.send({mensaje:'Suscripciones Encontradas',suscripciones:SuscripcionRes,exito:1});
                }
                else{
                    res.send({mensaje:'No existen suscripciones',exito:0});
                }
            }
    
            console.log("Close Connection");
            conectBD.end();
    });
};

module.exports = {
suscribirCategoria,
cancelarSuscripcion,
suscripcionesCliente
};
