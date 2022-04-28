const MySQLBD = require("../config/mysql.config");

const usuariosHabilitados = async (req,res)=>{

    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Usuarios WHERE estadoHabilitacion = TRUE`, (err, UsuariosRes) => {

        if(err){
            res.send({mensaje:'Error al buscar usuarios',exito:0});
        }
        else{
            res.send({mensaje:'Usuarios encontrados',usuarios:UsuariosRes,exito:1});

        }
        console.log("Close Connection");
        con.end(); 
    })
};

const usuariosInHabilitados = async (req,res)=>{

    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Usuarios WHERE estadoHabilitacion = FALSE`, (err, UsuariosRes) => {

        if(err){
            res.send({mensaje:'Error al buscar usuarios',exito:0});
        }
        else{
            res.send({mensaje:'Usuarios encontrados',usuarios:UsuariosRes,exito:1});

        }
        console.log("Close Connection");
        con.end(); 
    })
};

const desHabilitarUsuario = async (req,res)=>{

    const {usuarioId} = req.body;
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Usuarios WHERE Id = ${usuarioId} AND estadoHabilitacion = TRUE`, (err, User) => {

        if (!User.length) {
  
            res.send({mensaje:'Usuario no existe o se encuentra inhabil',exito:0});
            console.log("Close Connection");
            conectBD.end();

        }else{

            conectBD.query(`UPDATE Usuarios SET estadoHabilitacion = FALSE WHERE  Id = ${usuarioId}`, (err, result) => {

                if(err){
            
                    res.send({mensaje:'Error al deshabilitar usuario',exito:0});

                }
                else{
     
                    res.send({mensaje:'Usuario deshabilitado',exito:1});
                };

                console.log("Close Connection");
                conectBD.end();

            });
        }

      });
};

const habilitarUsuario = async (req,res)=>{

    const {usuarioId} = req.body;
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM Usuarios WHERE Id = ${usuarioId} AND estadoHabilitacion = FALSE`, (err, User) => {

        if (!User.length) {
  
            res.send({mensaje:'Usuario no existe o se encunetra habilitado',exito:0});
            console.log("Close Connection");
            conectBD.end();

        }else{

            conectBD.query(`UPDATE Usuarios SET estadoHabilitacion = TRUE WHERE  Id = ${usuarioId}`, (err, result) => {

                if(err){
            
                    res.send({mensaje:'Error al rehabilitar usuario',exito:0});

                }
                else{
     
                    res.send({mensaje:'Usuario rehabilitado',exito:1});
                };

                console.log("Close Connection");
                conectBD.end();

            });
        }

      });
};

module.exports = {
    usuariosHabilitados,
    usuariosInHabilitados,
    desHabilitarUsuario,
    habilitarUsuario

}