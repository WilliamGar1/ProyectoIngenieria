const MySQLBD = require("../config/mysql.config");


const enviarMensaje = async (req,res) => {
    
    const {emisor,receptor,mensaje} = req.body; 
    const conectBD = MySQLBD.conectar();

    conectBD.query(`INSERT INTO Chats(emisor,receptor,mensaje) VALUES (${emisor},${receptor},'${mensaje}')`, (err, ChatRes) => {

        if(err){
        res.send({mensaje:'Error al enviar mensaje',exito:0});
        }else{
            res.send({mensaje:'Mensaje enviado',exito:1});
        }

        console.log("Close Connection");
        conectBD.end();
    });
};

const chatPersonas = async (req,res) => {

    const usuarioId = req.params; 
    const conectBD = MySQLBD.conectar();
    conectBD.query(` 
    SELECT CONCAT(u.nombre,' ',u.apellido) chatPersona, u.Id chatPersonaId FROM Usuarios u
    INNER JOIN Chats c ON (c.emisor = ${usuarioId} AND c.receptor = u.Id  AND c.estado_Emisor = TRUE) OR (c.receptor = ${usuarioId}  AND c.emisor = u.Id  AND c.estado_Receptor = TRUE)
    GROUP BY u.Id `, (err, ChatPersonasRes) => {

        if(err){
        res.send({mensaje:'Error al buscar chats',exito:0});
        }else{
            if(ChatPersonasRes.length){
                res.send({mensaje:'Chats encontrados',chatPersonas:ChatPersonasRes,exito:1});
                }
                else{
                    res.send({mensaje:'No existen chats',exito:0});
                }
        }

        console.log("Close Connection");
        conectBD.end();
    });


};

const mensajesPersona = async (req,res) => {

    const {usuarioId,chatPersonaId} = req.body; 
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Chats 
    WHERE (emisor = ${usuarioId} AND receptor = ${chatPersonaId}  AND estado_Emisor = TRUE) 
    OR    (receptor = ${usuarioId} AND emisor = ${chatPersonaId}  AND estado_Receptor = TRUE)
    ORDER BY creacion ASC `, (err, MensajesPersonaRes) => {

        if(err){
        res.send({mensaje:'Error al buscar chats',exito:0});
        }else{
            if(MensajesPersonaRes.length){
                res.send({mensaje:'Mensajes Encontrados',mensajesPersona:MensajesPersonaRes,exito:1});
                }
                else{
                    res.send({mensaje:'No existen mensajes',exito:0});
                }
        }

        console.log("Close Connection");
        conectBD.end();
    });


}; //por fecha

const borrarChat = async (req,res) => {

    const {usuarioId,chatPersonaId} = req.body; 
    const conectBD = MySQLBD.conectar();
    conectBD.query(`UPDATE Chats SET estado_Emisor = FALSE  WHERE emisor = ${usuarioId} AND receptor = ${chatPersonaId}`, (err, BorrarChatRes) => {

        
        if(err){
        res.send({mensaje:'Error al Borrar Chat',exito:0});
        console.log("Close Connection");
        conectBD.end();
        }else{
            conectBD.query(`UPDATE Chats SET estado_Receptor = FALSE WHERE receptor = ${usuarioId} AND emisor = ${chatPersonaId}`, (err, BorrarChatRes) => {
                
                if(err){
                    res.send({mensaje:'Error al Borrar Chat',exito:0});
                   
                    }else{
                res.send({mensaje:'Chat Borrado',exito:1});
                    }

                    console.log("Close Connection");
                    conectBD.end();
            }); 
        }

       
      
    });


};

module.exports = {
    enviarMensaje,
    chatPersonas,
    mensajesPersona,
    borrarChat
};