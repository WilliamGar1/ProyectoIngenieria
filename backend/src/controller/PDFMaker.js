const pdfprinter = require('pdfmake');
const fs = require('fs');
const path =require('path');
const {styles,contenido,fonts} = require('../config/pdf.config');

const a =["lagarto","esponja"];
const content = contenido("Hola mundo",a);

const PDFMaker = async (req,res)=>{
  
    let docDefinition = {
      content,
      styles
    };
    
    const printer = new pdfprinter(fonts );
    const name = 'pdfTest'+Date.now()+'.pdf';
  
    let pdfdoc = printer.createPdfKitDocument(docDefinition);
    pdfdoc.pipe(fs.createWriteStream(path.join( __dirname,'..','public','docs',name)));
    pdfdoc.end();
  
    setTimeout( () => {
    console.log("wait for save")
  
    const pd = fs.readFileSync(path.join( __dirname,'..','public','docs',name));
   
    res.contentType('application/pdf');
   
    res.send(pd);

    fs.unlinkSync(path.join( __dirname,'..','public','docs',name));
  }, 100)
   

  };

  module.exports = {
      PDFMaker
  }

