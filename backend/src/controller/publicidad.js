const {sendEmailPdf,sendEmailPublicidadHTML,getPublicidadTemplate} = require('../config/email.config')
const fs = require('fs');
const path =require('path');

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
    const template = getPublicidadTemplate();

    sendEmailPublicidadHTML('casidik898@carsik.com','Astas',template);
    res.send("Hola");

};

module.exports = {
    publicidadPDF,
    publicidadHTML
};