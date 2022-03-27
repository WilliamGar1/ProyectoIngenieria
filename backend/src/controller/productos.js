const multer = require("../config/multer.config");
const fs = require('fs');
const path =require('path');
const MySQLBD = require("../config/mysql.config");


const insertNewProducto = async  (req, res,next) => {

    const ProductoEnviado= req.params.id;
    const conectBD = MySQLBD.conectar();

    if(ProductoEnviado==0){
    
    const {producto} = req.body;   

    conectBD.query(`INSERT INTO Productos(nombre,precio,descripcion,categoriaId) VALUES
    ('${producto.nombre}',${producto.precio},'${producto.descripcion}',${producto.categoria})  `, (err, ProductoRes) => {
        
            if(err){
                res.send({mensaje:'Error al insertar producto',exito:0});
                
            }else{

                res.send({mensaje:'Su producto se ha registrado',productoId:ProductoRes.insertId,exito:1});
               
            }
            console.log("Close Connection");
            conectBD.end(); 
      });
   }else{
 
    const imagenes = req.files;
    var mensaje ='Su producto se ha registrado ';
    var imerr = 1;
  
   
   imagenes.forEach(imagen => {
    
        const img=  fs.readFileSync(path.join( __dirname,'..','public','uploads',imagen.filename));

    
    
    let imgQuery ="INSERT INTO ImagenesProducto(productoId,productoImagen,contentType) VALUES (?,?,?)";
     let query = MySQLBD.mysql.format(imgQuery,[ProductoEnviado,img,imagen.mimetype]);
     setTimeout( () => {
    
     conectBD.query(query,(err, ImagenRes)=>{
        if(err) {
        
        mensaje=mensaje +', Error al guardar imagen '+ imerr;
    }
        console.log('save');
        
        
        if(imagenes.length == imerr){

            res.send({mensaje,exito:1});
            console.log("Close Connection");
            conectBD.end(); 
        }
        imerr+=1;
    });
    
    fs.unlinkSync((path.join( __dirname,'..','public','uploads',imagen.filename)));
    }, 20)



    });
    
 
  
    
   }

 
  
  
};


module.exports = {
 insertNewProducto
};





               /* imagenes.forEach(imagen => {
               
                    conectBD.query(`INSERT INTO ImagenesProducto(productoId,productoImagen) VALUES
                                    (${ProductoRes.insertId},${imagen})`, (err, ImagenRes) => {
                           if(err){

                            mensaje=mensaje +', Pero Error al guardar imagen '+ imerr;
                            imerr+=1;
    
                           }
                          
                    });

                });
*/

//var imagen=  fs.readFileSync(path.join( __dirname,'..','public','uploads',req.file.filename));
   //console.log(imagen);
  // imagen.content
    //fs.unlinkSync((path.join( __dirname,'..','public','uploads',req.file.filename)));


    /*const {producto,imagenes} = req.body;
 
    */
