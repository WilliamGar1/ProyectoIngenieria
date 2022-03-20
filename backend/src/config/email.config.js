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

  const sendEmailSolicitudCambioPass = async (email,subject,html)=>{
    try {
      await transporter.sendMail({
          from: `NTT: <${mail.user}>`, // sender address
          to: email, // list of receivers
          subject, // Subject line
          text: "Solicitud de cambio de contraseña", // plain text body
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

  const getVerifyTemplate = (name,token)=>{
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verificar Cuenta</title>
      </head>
      <body>
          <div class="container" id="email_content">
          <h2>Hola ${name}</h2>
      <p>Para confirmar tu cuenta , ingresa al siguiente enlace</p>
      <a href="http://localhost:4200/confirmarCuenta/${token}"> confirmar cuenta </a>
      
          </div>
          

          </body>
          </html>
      `;
  };

  const getCambioPassTemplate = (name,token)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cambio De Contraseña</title>
    </head>
    <body>
        <div class="container" id="email_content">
        <h2>Buen Día ${name}</h2>
    <p>Para cambiar su contraseña, por favor ingrese al siguiente enlace</p>
    <a href="http://localhost:4200/resetPasswordForm/${token}"> cambiar contraseña </a>
    
        </div>
        

        </body>
        </html>
    `;
};

  module.exports ={
      sendEmailVerify,
      sendEmailPdf,
      getVerifyTemplate,
      sendEmailSolicitudCambioPass,
      getCambioPassTemplate
  };