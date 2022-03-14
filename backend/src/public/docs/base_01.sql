use bavvsia83xxkjbvtnugt;


DROP TABLE IF EXISTS  Telefonos;
DROP TABLE IF EXISTS  ImagenPerfilUsuario;
DROP TABLE IF EXISTS DireccionesUsuarios;
DROP TABLE IF EXISTS DatosInicioSesion;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Direcciones;
DROP TABLE IF EXISTS Municipios;
DROP TABLE IF EXISTS Departamentos;



CREATE TABLE Departamentos(
Id INTEGER PRIMARY KEY,
numero VARCHAR(2) NOT NULL,
nombre VARCHAR(30) NOT NULL
);

INSERT INTO Departamentos VALUES (1,'01','PRUEBA 1');

CREATE TABLE Municipios(
Id INTEGER PRIMARY KEY,
numero VARCHAR(4) NOT NULL,
nombre VARCHAR(30) NOT NULL,
departamentoId INTEGER NOT NULL REFERENCES Departamentos(Id)
);

INSERT INTO Municipios VALUES (1,'01','MUNICIPIO 1',1);

CREATE TABLE Direcciones(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
calle VARCHAR(30) NULL,
avenida VARCHAR(30) NULL,
referencia VARCHAR(50) NOT NULL,
municipiosId INTEGER NOT NULL REFERENCES Municipios(Id)
);

CREATE TABLE Usuarios(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(30) NOT NULL,
apellido VARCHAR(30) NOT NULL,
email VARCHAR(30) UNIQUE ,
estadoHabilitacion BOOLEAN DEFAULT FALSE,
contrato  BOOLEAN NOT NULL,
creacion TIMESTAMP DEFAULT NOW(),
actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE DatosInicioSesion(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
contrasenia VARCHAR(200) NOT NULL,
estado  BOOLEAN DEFAULT TRUE
);

CREATE TABLE DireccionesUsuarios(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
direccionId INTEGER NOT NULL REFERENCES Direcciones(Id),
estado BOOL DEFAULT TRUE
);

CREATE TABLE Telefonos(
Id INTEGER  AUTO_INCREMENT  PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Persona(Id),
telefono VARCHAR(16) NOT NULL
);

CREATE TABLE ImagenPerfilUsuario(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
perfilImagen LONGBLOB,
contentType VARCHAR(30),
personaId INTEGER NOT NULL REFERENCES Usuarios(Id)
);


--reserva

CREATE TABLE IF NOT EXISTS users(
 id  int auto_increment PRIMARY KEY,
 nombre         varchar(30)   ,
 apellido      varchar(30)   ,
 email         varchar(30)  UNIQUE  ,
 passw         varchar(300)  ,
 municipio     varchar(30)   ,
 departamento  varchar(30)   ,
 telefono      varchar(30)   ,
 direccion     varchar(200)  ,
 estado  enum('SINVERIFICAR','VERIFICADO','BANEADO')  DEFAULT 'SINVERIFICAR'

);


CREATE TABLE  IF NOT EXISTS test(
     id  int auto_increment PRIMARY KEY,
     n varchar(10)
);


SELECT * FROM Telefonos;
SELECT * FROM ImagenPerfilUsuario;
SELECT * FROM DireccionesUsuarios;
SELECT * FROM DatosInicioSesion;
SELECT * FROM Usuarios;
SELECT * FROM Direcciones;
SELECT * FROM Municipios;
SELECT * FROM Departamentos;