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

const publicidadHTML = async (req,res) =>{

   // const {email,subject} = req.body;

   const conectBD = MySQLBD.conectar();

   conectBD.query(`SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo,CONCAT(u.nombre,' ',u.apellido) Usuario , c.nombre Categoria, c.Id CategoriaId FROM Productos p 
   INNER JOIN ImagenesProducto i ON p.Id = i.productoId
   INNER JOIN Categorias c ON c.Id = p.categoriaId
   INNER JOIN Usuarios u ON u.Id = p.personaId  
   AND p.estadoHabilitacion = TRUE
   GROUP BY p.Id  LIMIT 3`, (err, ProductoRes) => {
   

   if(err){ 
       console.log(err);
       console.log("Close Connection");
       conectBD.end(); 
   }

   else{

     const template = getPublicidadTemplate(ProductoRes);
   sendEmailPublicidadHTML('gitaneh104@eosbuzz.com','Mesa',template);
   console.log("Close Connection");
   conectBD.end(); 
      
   }
   
  
   res.send("Hola");
 
  
     
   });  
  
 



};


module.exports = {
    publicidadPDF,
    publicidadHTML
};