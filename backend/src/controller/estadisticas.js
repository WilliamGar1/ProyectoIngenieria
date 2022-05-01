//conexion base de datos
const MySQLBD = require("../config/mysql.config");

const getStatsByDepto = async (req, res) => {
    
    const conectBD = MySQLBD.conectar();
    //Obtiene la cantidad de usuarios por departamento
    conectBD.query(`SELECT  Departamentos.nombre AS 'name', COUNT(*) AS 'value' FROM Usuarios INNER JOIN Municipios ON Usuarios.municipioId = Municipios.Id INNER JOIN Departamentos ON Municipios.departamentoId = Departamentos.Id GROUP BY departamentoId;`, (err, data) => {
        
        if(err){
            res.send({"mensaje":"Error al obtener estadisticas por departamentos",exito:0});
            console.log("Close Connection");
            conectBD.end();
        }else{
            
            //console.log({data});
            res.send({"mensaje":"Estadisticas de departamento obtenidas","estadisticas":data,exito:1});
            conectBD.end();

        }
    });
        
};

const getStatsByCat = async (req, res) => {
    
    const conectBD = MySQLBD.conectar();
    //Obtiene la cantidad de usuarios por departamento
    conectBD.query(`SELECT Categorias.nombre AS 'name', COUNT(*) AS 'value' FROM Productos INNER JOIN Categorias ON Productos.categoriaId = Categorias.Id GROUP BY Categorias.Id;`, (err, data) => {
        
        if(err){
            res.send({"mensaje":"Error al obtener estadisticas por categoria",exito:0});
            console.log("Close Connection");
            conectBD.end();
        }else{
            
            //console.log({data});
            res.send({"mensaje":"Estadisticas de categoria obtenidas","estadisticas":data,exito:1});
            conectBD.end();

        }
    });
        
};

const getBestUsers = async (req, res) => {
    
    const cantidad = req.params.value;

    const conectBD = MySQLBD.conectar();
    //Obtiene la cantidad de usuarios por departamento
    conectBD.query(`SELECT Usuarios.nombre AS 'name', SUM(calificacion)/COUNT(*) AS 'value' FROM Calificaciones INNER JOIN Usuarios ON Calificaciones.vendedorId = Usuarios.Id GROUP BY Usuarios.Id ORDER BY SUM(calificacion)/COUNT(*) DESC LIMIT ${cantidad};`, (err, data) => {
        
        if(err){
            res.send({"mensaje":"Error al obtener estadisticas por usuario",exito:0});
            console.log("Close Connection");
            conectBD.end();
        }else{
            
            //console.log({data});
            res.send({"mensaje":"Estadisticas por usuario obtenidas","estadisticas":data,exito:1});
            conectBD.end();

        }
    });
        
};

module.exports = {
    getStatsByDepto,
    getStatsByCat,
    getBestUsers
};
