const {sendEmailPdf,sendEmailPublicidadHTML,getPublicidadTemplate} = require('../config/email.config')
const fs = require('fs');
const path =require('path');
const MySQLBD = require("../config/mysql.config");

const publicidadPDF = async (req,res) =>{

    const {email,subject} = req.body;
   
   const dir = path.join( __dirname,'..','public','docs','Prueba.pdf');
   sendEmailPdf(email,subject,dir);

   /*const pdfSend = fs.readFileSync(path.join( __dirname,'..','public','docs','Prueba.pdf'));
    res.contentType("application/pdf");
    res.send(pdfSend);*/
};

const publicidadHTML =  () =>{
var i=0;
    const conectBD = MySQLBD.conectar();
   conectBD.query(`SELECT * FROM Categorias`, (err, CategoriasRes) => {
 
        if(!err){
     
   

        CategoriasRes.forEach(categoria => {
            i++;
           usuariosPublicidadHTML(categoria,conectBD,{i,c:CategoriasRes.length});
   
      
        });

     
        }



    });
 
   

 };

 
 const usuariosPublicidadHTML =   (categoria,con,i) =>{

    con.query(`SELECT u.email 
    FROM Suscripciones s
    INNER JOIN Usuarios u ON u.Id = s.clienteId
    AND u.estadoHabilitacion = TRUE
    AND s.categoriaId = ${categoria.Id}
    ORDER BY u.email `, (err, EmailRes) => { 

        if(!err){
            var listEmail='';

            EmailRes.forEach(emailText => {
                
                listEmail+=emailText.email+";";
            });

        if(listEmail != ''){
    
            enviarPublicidadHTML(listEmail,con,categoria,i);
    }
        }


    });
    
 }
 
 const enviarPublicidadHTML =   (lista,con,categoria,i) =>{

    

    con.query(`SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo,CONCAT(u.nombre,' ',u.apellido) Usuario , c.nombre Categoria, c.Id CategoriaId FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
    INNER JOIN Usuarios u ON u.Id = p.personaId  
    AND p.estadoHabilitacion = TRUE
    AND u.estadoHabilitacion = TRUE
    AND c.Id = ${categoria.Id}
    GROUP BY p.Id  LIMIT 3`, (err, ProductoRes) => {

        
            if(ProductoRes.length) {
                console.log("enviando");
                const template = getPublicidadTemplate(ProductoRes);
                 sendEmailPublicidadHTML(lista,`${categoria.nombre}: Productos recientes`,template);
                 
             }

             if(i.i==i.c){
                console.log("Close Connection");
                con.end(); 
    
              }
        
    });


 }


module.exports = {
    publicidadPDF,
    publicidadHTML
};