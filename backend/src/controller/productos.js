const multer = require("../config/multer.config");
const fs = require('fs');
const path =require('path');
const MySQLBD = require("../config/mysql.config");
const { Console } = require("console");


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

const getProductoMuestra = async (req,res) =>{
    const conectBD = MySQLBD.conectar();

    conectBD.query(`SELECT p.*,i.productoImagen,i.contentType, c.nombre cat FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
    AND estadoHabilitacion = TRUE
    GROUP BY p.Id`, (err, ProductoRes) => {


        res.render('img.html',{  pds: ProductoRes,
            items: [] });
 
        console.log("Close Connection");
        conectBD.end(); 
    });

}

 
const testImg = async  (req, res) => {

    const conectBD = MySQLBD.conectar();
    //BUSCAR CATEGORIAS
    conectBD.query(`SELECT * FROM ImagenesProducto`, (err, ImagenRes) => {

        res.render('img.html',{ 
            
            pds:[],
            items: ImagenRes });

        console.log("Close Connection");
        conectBD.end(); 
    });

   
   };
  


module.exports = {
 insertNewProducto,
 getProductoMuestra,
 testImg
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
