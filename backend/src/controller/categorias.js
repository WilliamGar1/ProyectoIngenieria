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

const insertNewCategoria = async (req, res) => {
    
    const {categoria} = req.body;

    const conectBD = MySQLBD.conectar();
    //BUSCAR CATEGORIAS
    conectBD.query(`INSERT INTO Categorias(Id,nombre)
                    SELECT MAX(Id)+1,'${categoria}' FROM Categorias `, (err, CategoriasRes) => {
        
        if(err){
            res.send({mensaje:'Error al insertar categoria',exito:0});
         
        }else{
                res.send({mensaje:'Nueva categoria agregada',exito:1});


     
        }

        console.log("Close Connection");
        conectBD.end();
    });
        
};

const actualizarCategoria = async (req, res) => {
    
    const {categoriaId,categoria} = req.body;

    const conectBD = MySQLBD.conectar();
    //BUSCAR CATEGORIAS
    conectBD.query(`UPDATE Categorias SET nombre= '${categoria}' WHERE Id = ${categoriaId}`, (err, CategoriasRes) => {
        
        if(err){
            res.send({mensaje:'Error al actualizar categoria',exito:0});
         
        }else{
                res.send({mensaje:'Categoria actualizada',exito:1});


     
        }

        console.log("Close Connection");
        conectBD.end();
    });
        
};

const eliminarCategoria = async (req, res) => {
    
    const categoriaId = req.params.id;

    const conectBD = MySQLBD.conectar();
    //BUSCAR CATEGORIAS
    conectBD.query(`DELETE FROM Categorias WHERE Id = ${categoriaId}`, (err, CategoriasRes) => {
        
        if(err){
            res.send({mensaje:'Error al borrar categoria',exito:0});
         
        }else{
                res.send({mensaje:'Categoria borrada',exito:1});


     
        }

        console.log("Close Connection");
        conectBD.end();
    });
        
};


module.exports = {
    getAll_categorias,
    insertNewCategoria,
    actualizarCategoria,
    eliminarCategoria
};
