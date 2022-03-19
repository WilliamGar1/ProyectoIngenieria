const nodemailer = require("nodemailer");

const mail ={
    user:'bncompras2020@gmail.com',
    pass:'20@s7rgjb42CgjRKR6'
};

var transporter = nodemailer.createTransport(({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: mail.user,
      pass: mail.pass
    }
  }));
  

  const sendEmailVerify = async (email,subject,html)=>{
      try {
        await transporter.sendMail({
            from: `NTT: <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Verificar", // plain text body
            html, // html body
          });
          
      } catch (error) {
          console.log('error en el email ',error);
      }
  };

  const sendEmailPdf = async (email,subject,path)=>{
    try {
      await transporter.sendMail({
          from: `NTT: <${mail.user}>`, // sender address
          to: email, // list of receivers
          subject, // Subject line
          text: "Verificar", // plain text body
          attachments: [
              {
                  path: path
              }
          ], // relative pdf directori
        });
        
    } catch (error) {
        console.log('error en el email ',error);
    }
};

  const getTemplate = (name,token)=>{
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Template</title>
      </head>
      <body>
          <div class="container" id="email_content">
          <img src=" https://cdn.pixabay.com/photo/2016/10/04/23/52/cow-1715829_960_720.jpg" width="180" height="200">
          <h2>Hola ${name}</h2>
      <p>Para confirmar tu cuenta , ingresa al siguiente enlace</p>
      <a href="http://localhost:3000/confirm/${token}"> confirmar cuenta </a>
      
          </div>
          

          </body>
          </html>
      `;
  }

  module.exports ={
      sendEmailVerify,
      sendEmailPdf,
      getTemplate
  };