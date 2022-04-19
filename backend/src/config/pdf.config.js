const fonts ={
    Roboto:{
        normal: Buffer.from(
        require("../../node_modules/pdfmake/build/vfs_fonts").pdfMake.vfs["Roboto-Regular.ttf"],
        'base64'),
        bold:Buffer.from(
            require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Medium.ttf'],
            'base64')
        }
};

const styles ={
    header:{
        bold:true,
        fontSize:14,
        alignment:'center',
        color: '#000000'
    },
    label:{
        bold:false,
        fontSize:12,
        alignment:'center',
        color:'#000000'
    }
}

var content =[];

function contenido(titulo,contenido)
{
  content =[
        {text: titulo, style:'header'}, 
    ];

    contenido.forEach(element => {
        content.push({text:element, style:'label'})
     
    });

    return content;
   
}

module.exports = {
    fonts,
    styles,
    contenido
}