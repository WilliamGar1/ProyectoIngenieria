
const MySQLBD = require("../config/mysql.config");
const bcrypt = require('bcrypt');

//get token
const {getToken,getTokenData} = require('../config/jwt.config');
//mailconfig
const {getTemplate,sendEmailVerify} = require('../config/email.config');


const insertNewUser = async (req, res) => {


const {id,user,pass} = req.body;

  
    const conectBD = MySQLBD.conectar();
    conectBD.query(`SELECT * FROM users WHERE id = ${id}`, (err, oldUser) => {

        if (!oldUser.length) {

            bcrypt.hash(pass, 10, (err, hashedPassword) => {

                if (err) {
                    res.send('Error de encriptado');
                  


                }
                else {
                    conectBD.query(`INSERT INTO users(username,passw) VALUES ("${user}","${hashedPassword}")`, (err, result) => {


                           //generar token
                             const token = getToken(user);

                           //template
                            const template = getTemplate(user,token);

                            //enviar email
                            sendEmailVerify(user,'PREUBA DE ENVIO',template);

                        res.send('save');
                   

                    });

                }

                console.log("Close Connection");
                conectBD.end();
            });




        } else {



            res.send('username: ' + oldUser[0].username);
            console.log("Close Connection");
            conectBD.end();

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

const verifyUser = async (req, res) => {

     //token
     const token = req.params.token;
     //verficar data
     const data = getTokenData(token);

     if(!data){
        res.status(500).send('Error en data');
        console.log("Error en data");
      };

      const email = data.data;

      const conectBD = MySQLBD.conectar();
      conectBD.query(`SELECT * FROM users WHERE username = '${email}'`, (err, User) => {

    
        if (!User.length) {
  
            res.send('Usuario no existe');
            console.log("Close Connection");
            conectBD.end();

        }else{
            conectBD.query(`UPDATE users SET estado = 'VERIFICADO' WHERE id = ${User[0].id}`, (err, result) => {

                if(err){
                    res.send('ERRO AL VERIFICAR');

                }
                else{

                    res.send('verificado');
                };

                console.log("Close Connection");
                conectBD.end();

            });
        }

      });
    
      
};


module.exports = {
    insertNewUser,
    LoginUser,
    verifyUser
};


