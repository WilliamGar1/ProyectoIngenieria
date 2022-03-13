const mysql = require('mysql');


function conectar() { 
    conexion =  mysql.createConnection({
      host:"bavvsia83xxkjbvtnugt-mysql.services.clever-cloud.com",
      user:"umobi57mt7ynmn2t" ,
      password: "tYpFy9XU62D8Mam2PC9p",
      database: "bavvsia83xxkjbvtnugt"
});

conexion.connect((err)=>{
    if(err) throw err;
    console.log("Connected to databse");
});

return conexion;
}


module.exports = {
  conectar
}
