//conexion base de datos
const MySQLBD = require("../config/mysql.config");
//encripter
const bcrypt = require('bcrypt');
//get token_Config
const {getToken,getTokenData} = require('../config/jwt.config');
//mailconfig_Config
const {getVerifyTemplate,sendEmailVerify,sendEmailSolicitudCambioPass,getCambioPassTemplate} = require('../config/email.config');


const insertNewUser = async (req, res) => {

//CAPTURA DE DATOS,saque municipio
const {nombre,apellido,email,passw,municipio,telefono,direccion} = req.body;

 // INICIAR CONEXION
const conectBD = MySQLBD.conectar();
    //CONSULTA

conectBD.query(`SELECT * FROM Usuarios WHERE email = '${email}'`, (err, oldUser) => {

        //COMPROBAR SI EXISTE USUSARIO
        if (!oldUser.length) {

                //INSERTAR USUSARIO Y RECUPERAR ID
                conectBD.query(`INSERT INTO Usuarios (nombre,apellido,email,municipioId,direccion) VALUES ('${nombre}','${apellido}','${email}',${municipio},'${direccion}')`, (err, UsuarioRes) => {
                    if (err) {
                        res.send({mensaje:'Error al insertar el usuario',guardado:0});
                        console.log("Close Connection");
                        conectBD.end();
                    }else{

                   
                        //INSERTAR TELEFONO
                        conectBD.query(`INSERT INTO Telefonos(personaId,telefono) VALUES (${UsuarioRes.insertId},'${telefono}')`, (err, TelefonoRes) => {
                            
                            if (err) {
                                res.send({mensaje:'Error al insertar el telefono',guardado:0});
                                insercionFallida({paso:1,id:UsuarioRes.insertId});
                                console.log("Close Connection");
                                conectBD.end();
                            }else{
                            //ENCRIPTAR CONTRASEÑA
                            bcrypt.hash(passw, 10, (err, hashedPassword) => {

                                if (err) {
                                    res.send({mensaje:'Error al encriptar contraseña',guardado:0});
                                    insercionFallida({paso:2,id:UsuarioRes.insertId});
                                    console.log("Close Connection");
                                    conectBD.end();
                                }
                                else {
                                //INSERTAR CONTRASEÑA
                                conectBD.query(`INSERT INTO DatosInicioSesion(personaId,contrasenia) VALUES (${UsuarioRes.insertId},'${hashedPassword}')`, (err, ContraseniaRes) => {

                                    if (err) {
                                        res.send({mensaje:'Error al guardar datos de session',guardado:0});
                                        insercionFallida({paso:3,id:UsuarioRes.insertId});
                                    }
                                    else {
                                    //GENERAR TOKEN DE IDENTIFICACION
                                    const token = getToken(email);

                                    //TEMPLATE -> ESTRUCUTRA DEL CORREO DE CONFIRMACION
                                     const template = getVerifyTemplate(nombre+' '+apellido,token);
  
                                    //ENVIAR EMAIL
                                    sendEmailVerify(email,'Confirmar Cuenta',template);
                                    res.send({mensaje:'Usuario insertado',guardado:1});

                                    }
                                    
                                    console.log("Close Connection");
                                    conectBD.end();
                                });
                                }
                            });
                            }
                        });
                        
                    
                    }
                });
                
            


        } else {
            res.send({mensaje:'El usuario con el correo <' + oldUser[0].email+'> ya existe',guardado:0});
            console.log("Close Connection");
            conectBD.end();

        }


    });
};


const verifyUser = async (req, res) => {

     //OPTENER TOKEN
     const {token} = req.body;
     //VERIFICAR DATA
     const data = getTokenData(token);

     if(!data){
        res.send({mensaje:'Error en data token'});
        console.log("Error en data token");
      };

      //OPTENER CORREO DEL USUARIO
      const email = data.data;

      //CONECTAR CON BD
      const conectBD = MySQLBD.conectar();
      //CONSULTA DE BUSQUEDA
      conectBD.query(`SELECT * FROM Usuarios WHERE email = '${email}'`, (err, User) => {

     
        //COMPROBAR SI EXISTE EL USUARIO
        if (!User.length) {
  
            res.send({mensaje:'Usuario no existe'});
            console.log("Close Connection");
            conectBD.end();

        }else{
            //CONSULTA DE VERIFICACION
            conectBD.query(`UPDATE Usuarios SET estadoHabilitacion = 1 WHERE email = '${User[0].email}'`, (err, result) => {

                if(err){
            
                    res.send({mensaje:'Error al habilitar usuario'});

                }
                else{
                    console.log({"Usuario":User[0],"Ahora":"HABILITADO"});
                    res.send({mensaje:'Usuario habilitado'});
                };

                console.log("Close Connection");
                conectBD.end();

            });
        }

      });
    
      
};


const LoginUser = async (req, res) => {

    const {email,contrasenia} = req.body;

    const conectBD = MySQLBD.conectar();
    //BUSCAR USUARIO
    conectBD.query(`SELECT * FROM Usuarios WHERE email = '${email}'`, (err, UsuarioRes) => {
      
        //REVISAR SI SE ENCONTRO EL USUARIO
        if (!UsuarioRes.length) {

            res.send({"mensaje":"Usuario No existe",acceso:0});
            console.log("Close Connection");
            conectBD.end();

        } else {
        //BUSCAR CONTRASEÑA DEL USUARIO
        conectBD.query(`SELECT * FROM DatosInicioSesion WHERE personaId = ${UsuarioRes[0].Id } AND estado = TRUE`, (err, ContraseniaRes) => {
         
            //COMPARAR LA CONTRASEÑA
            bcrypt.compare(contrasenia, ContraseniaRes[0].contrasenia, (err, result) => {

                if (result) {

                    if(UsuarioRes[0].estadoHabilitacion){
                    res.send({"mensaje":"contraseña correcta","usuario":UsuarioRes[0],acceso:1},);
                        }else{

                     res.send({"mensaje":"El usuario no ha confirmado su cuenta",acceso:0},); 
                        }

                }else {
                 
                    res.send({"mensaje":"contraseña incorrecta",acceso:0});
                };

                console.log("Close Connection");
                conectBD.end();
            });
       
        });
        }
    });



};

//RESET PASSWORD
const  resetPasswordSolicitud = async (req, res) => {
    const {email} = req.body;

    const conectBD = MySQLBD.conectar();
    //CONSULTA SI EL USUSARIO EXISTE
    conectBD.query(`SELECT * FROM Usuarios WHERE email = '${email}'`, (err, User) => {
        if (!User.length) {
  
            res.send({mensaje:'Usuario no existe'});
            console.log("Close Connection");
            conectBD.end();

        }else{

            //GENERAR TOKEN DE IDENTIFICACION
            const token = getToken(email);

            //TEMPLATE -> ESTRUCUTRA DEL CORREO DE CONFIRMACION
             const template = getCambioPassTemplate(User[0].nombre+' '+User[0].apellido,token);

            //ENVIAR EMAIL
            sendEmailSolicitudCambioPass(email,'CAMBIO DE CONTRASEÑA',template);

            res.send({mensaje:'Solicitud de cambio de contraseña enviada'});


        }
    }); 

    
    console.log("Close Connection");
     conectBD.end();

};

const  resetPasswordForm = async (req, res) => {

    const {token} = req.body;
    //VERIFICAR DATA
    const data = getTokenData(token);

    if(!data){
       res.send({mensaje:'Error en data token'});
       console.log("Error en data token");
     };

     //OPTENER CORREO DEL USUARIO
     const email = data.data;

     //CONECTAR CON BD
     const conectBD = MySQLBD.conectar();
     conectBD.query(`SELECT * FROM Usuarios WHERE email = '${email}'`, (err, User) => {

        if (!User.length) {
  
            res.send({mensaje:'Usuario no existe'});
         

        }else{
 
        res.send({mensaje:'Usuario encontrado',id:User[0].Id,email});
        
        }

        console.log("Close Connection");
        conectBD.end();
     });
   

   
 

};

const  resetPasswordGuardar = async (req, res) => {

    const { nuevaContrasenia, usuarioId} = req.body;
   
    const conectBD = MySQLBD.conectar();

     //DESHABILITAR CONTRASEÑA ANTERIOR
    conectBD.query(`UPDATE  DatosInicioSesion set estado= FALSE WHERE personaId = ${usuarioId}`, (err, ContraseniaRes) => {

        if (err) {
            res.send({mensaje:'Error al deshabilitar la contraseña anterior'});
            console.log("Close Connection");
            conectBD.end();
        }
        else{

             //ENCRIPTAR CONTRASEÑA
    bcrypt.hash(nuevaContrasenia, 10, (err, hashedPassword) => {

        if (err) {
            res.send({mensaje:'Error de encriptado'});
         
        }
        else {


        //INSERTAR CONTRASEÑA

        conectBD.query(`INSERT INTO DatosInicioSesion(personaId,contrasenia) VALUES (${usuarioId},'${hashedPassword}')`, (err, ContraseniaRes) => {

            if (err) {
                res.send({mensaje:'Error al actualizar contraseña'}); 
            }
            else{

                res.send({mensaje:'contraseña actualizada'}); 
            }
        });

    }

    console.log("Close Connection");
    conectBD.end();
    });
            
        }
    });


   

};




const test = async (req, res) => {

    console.log('realizando prueba');
    const conectBD = MySQLBD.conectar();

    conectBD.query(`select * from test `, (err, resultado) => {
        
    console.log('SELECT ');
        console.log(resultado);
    });

    conectBD.query(`UPDATE test set n='prueba 2' where id = 2`, (err, resultado) => {
        console.log('UPDATE id 2');
        console.log(resultado);
    });
    
    conectBD.query(`delete from test where n='prueba 2'`, (err, resultado) => {
        console.log('DELETE id 1');
        console.log(resultado);
    });

   
    conectBD.query(`insert into test(n) values ('prueba') `, (err, resultado) => {
        console.log('INSERT');
        console.log(resultado);
        res.send(resultado);
    });

    console.log("Close Connection");
    conectBD.end();
};


//funciones
 function insercionFallida(dato){

    console.log('Borrando datos');
    const conectBD = MySQLBD.conectar();

    if(dato.paso == 1){
    conectBD.query(`DELETE FROM Usuarios WHERE Id = ${dato.id}`, (err, resultado) => { 

        if(err){
            console.log({mensaje:'Error al eliminar usuario mal insertado'})
        }
    });
    
}
    if(dato.paso == 2 || dato.paso ==3){
        conectBD.query(`DELETE FROM Telefonos WHERE personaId = ${dato.id}`, (err, resultado) => { 

            if(err){
                console.log({mensaje:'Error al eliminar telefono mal insertado'})
            }
            else{
                conectBD.query(`DELETE FROM Usuarios WHERE Id= ${dato.id}`, (err, resultado) => { 

                    if(err){
                        console.log({mensaje:'Error al eliminar usuario mal insertado'})
                    }
                });
            }
        });
    
    }
    console.log("Close Connection");
    conectBD.end();

 };


module.exports = {
    insertNewUser,
    LoginUser,
    verifyUser,
    resetPasswordSolicitud,
    resetPasswordForm,
    resetPasswordGuardar,
    test
};


