const MySQLBD = require("../config/mysql.config");

const getAll_categorias = async (req, res) => {
    
    const conectBD = MySQLBD.conectar();
    //BUSCAR CATEGORIAS
    conectBD.query(`SELECT * FROM Categorias`, (err, CategoriasRes) => {
        
        if(err){
            res.send({mensaje:'Error al optener categorias',exito:0});
            console.log("Close Connection");
            conectBD.end();
        }else{
         

                res.send({mensaje:'Categorias optenidas',categorias:CategoriasRes,exito:1});

            console.log("Close Connection");
            conectBD.end();
     
        }
    });
        
};

module.exports = {
    getAll_categorias
};
