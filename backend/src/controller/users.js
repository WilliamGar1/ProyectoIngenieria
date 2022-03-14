//conexion base de datos
const MySQLBD = require("../config/mysql.config");
//encripter
const bcrypt = require('bcrypt');
//get token_Config
const {getToken,getTokenData} = require('../config/jwt.config');
//mailconfig_Config
const {getTemplate,sendEmailVerify} = require('../config/email.config');


const insertNewUser = async (req, res) => {

//CAPTURA DE DATOS
const {nombre,apellido,email,passw,municipio,departamento,telefono,direccion} = req.body;

 // INICIAR CONEXION
const conectBD = MySQLBD.conectar();
    //CONSULTA
    conectBD.query(`SELECT * FROM users WHERE email = '${email}'`, (err, oldUser) => {

        //COMPROBAR SI EXISTE USUSARIO
        if (!oldUser.length) {

            //ENCRIPTAR CONTRASEÑA
            bcrypt.hash(passw, 10, (err, hashedPassword) => {

                if (err) {
                    res.send('Error de encriptado');
                }
                else {
                    //INSERCION EN LA BASE DE DATOS
                    conectBD.query(`INSERT INTO users(nombre,apellido,email,passw,municipio,departamento,telefono,direccion) VALUES 
                    ("${nombre}","${apellido}","${email}","${hashedPassword}","${municipio}","${departamento}","${telefono}","${direccion}")`, (err, result) => {

                           //GENERAR TOKEN DE IDENTIFICACION
                             const token = getToken(email);

                           //TEMPLATE -> ESTRUCUTRA DEL CORREO DE CONFIRMACION
                            const template = getTemplate(nombre+' '+apellido,token);

                            //ENVIAR EMAIL
                            sendEmailVerify(email,'PREUBA DE ENVIO',template);

                        res.send('save user');
                   

                    });

                }

                console.log("Close Connection");
                conectBD.end();
            });




        } else {
            console.log(oldUser[0]);
            res.send('El usuario con el correo <' + oldUser[0].email+'> ya existe');
            console.log("Close Connection");
            conectBD.end();

        }


    });
};


const verifyUser = async (req, res) => {

     //OPTENER TOKEN
     const token = req.params.token;
     //VERIFICAR DATA
     const data = getTokenData(token);

     if(!data){
        res.status(500).send('Error en data');
        console.log("Error en data");
      };

      //OPTENER CORREO DEL USUARIO
      const email = data.data;

      //CONECTAR CON BD
      const conectBD = MySQLBD.conectar();
      //CONSULTA DE BUSQUEDA
      conectBD.query(`SELECT * FROM users WHERE email = '${email}'`, (err, User) => {

     
        //COMPROBAR SI EXISTE EL USUARIO
        if (!User.length) {
  
            res.send('Usuario no existe');
            console.log("Close Connection");
            conectBD.end();

        }else{
            //CONSULTA DE VERIFICACION
            conectBD.query(`UPDATE users SET estado = 'VERIFICADO' WHERE email = '${User[0].email}'`, (err, result) => {

                if(err){
            
                    res.send('ERROR AL VERIFICAR');

                }
                else{
                    console.log({"Usuario":User[0],"Ahora":"VERIFICADO"});
                    res.send('VERIFICADO');
                };

                console.log("Close Connection");
                conectBD.end();

            });
        }

      });
    
      
};


const LoginUser = async (req, res) => {

    const {id,pass} = req.body;

    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM users WHERE id = ${id}`, (err, User) => {
      
        if (!User.length) {

            res.send('Usuario no existe');
            console.log("Close Connection");
            conectBD.end();

        } else {

            bcrypt.compare(pass, User[0].passw, (err, result) => {

                if (result) {
                    res.send('contraseña correcta');

                }else {
                    res.send('contraseña incorrecta');
                };

                console.log("Close Connection");
                conectBD.end();
            });

        };


    });



};

module.exports = {
    insertNewUser,
    LoginUser,
    verifyUser
};


