//conexion base de datos
const MySQLBD = require("../config/mysql.config");

const getAll_departamentos_municipios = async (req, res) => {
    
    const conectBD = MySQLBD.conectar();
    //BUSCAR DEPARTAMENTOS
    conectBD.query(`SELECT * FROM Departamentos`, (err, DepartamentosRes) => {
        
        if(err){
            res.send('Error al optener departamentos');
            console.log("Close Connection");
            conectBD.end();
        }else{
        //BUSCAR MUNICIPIOS
        conectBD.query(`SELECT * FROM Municipios`, (err, MunicipiosRes) => {

            if(err){
                res.send('Error al optener municipios');
                
            }else{

                res.send({departamentos:DepartamentosRes,municipios:MunicipiosRes});

            }

            console.log("Close Connection");
            conectBD.end();
        });
        }
    });
        
};

module.exports = {
    getAll_departamentos_municipios
};
