const multer = require('multer');
const path =require('path');
//Format Storage
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,path.join( __dirname,'..','public','uploads'));
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname+'-'+ Date.now());//+'-'+ Date.now() 
  }
});

const cargarArchivo = multer({
  storage : storage
}); //<--nombre del imput imagen


module.exports = {

    cargarArchivo
};