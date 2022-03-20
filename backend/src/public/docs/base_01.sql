use bavvsia83xxkjbvtnugt;


DROP TABLE IF EXISTS  Telefonos;
DROP TABLE IF EXISTS  ImagenPerfilUsuario;
DROP TABLE IF EXISTS DireccionesUsuarios;
DROP TABLE IF EXISTS DatosInicioSesion;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Direcciones;
DROP TABLE IF EXISTS Municipios;
DROP TABLE IF EXISTS Departamentos;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS test;



CREATE TABLE Departamentos(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);



CREATE TABLE Municipios(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
departamentoId INTEGER NOT NULL REFERENCES Departamentos(Id)
);


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
contrato  BOOLEAN  DEFAULT TRUE,
creacion TIMESTAMP DEFAULT NOW(),
actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);


CREATE TABLE IF NOT EXISTS users(
 Id INTEGER AUTO_INCREMENT PRIMARY KEY,
 nombre        VARCHAR(30)   ,
 apellido      VARCHAR(30)   ,
 email         VARCHAR(30)  UNIQUE  ,
 municipio     VARCHAR(30)   ,
 direccion     VARCHAR(200) ,
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



INSERT INTO Departamentos VALUES(1, 'Atlantida');
INSERT INTO Departamentos VALUES(2, 'Colon');
INSERT INTO Departamentos VALUES(3, 'Comayagua');
INSERT INTO Departamentos VALUES(4, 'Copan');
INSERT INTO Departamentos VALUES(5, 'Cortés');
INSERT INTO Departamentos VALUES(6, 'Choluteca');
INSERT INTO Departamentos VALUES(7, 'El Paraiso');
INSERT INTO Departamentos VALUES(8, 'Francisco Morazán');
INSERT INTO Departamentos VALUES(9, 'Gracias a Dios');
INSERT INTO Departamentos VALUES(10, 'Intibuca');
INSERT INTO Departamentos VALUES(11, 'Islas de La Bahia');
INSERT INTO Departamentos VALUES(12, 'La Paz');
INSERT INTO Departamentos VALUES(13, 'Lempira');
INSERT INTO Departamentos VALUES(14, 'Ocotepeque');
INSERT INTO Departamentos VALUES(15, 'Olancho');
INSERT INTO Departamentos VALUES(16, 'Santa Barbara');
INSERT INTO Departamentos VALUES(17, 'Valle');
INSERT INTO Departamentos VALUES(18, 'Yoro');

INSERT INTO Municipios VALUES(1, 'La Ceiba', 1);
INSERT INTO Municipios VALUES(2, 'El Porvenir', 1);
INSERT INTO Municipios VALUES(3, 'Esparta', 1);
INSERT INTO Municipios VALUES(4, 'Jutiapa', 1);
INSERT INTO Municipios VALUES(5, 'La Masica', 1);
INSERT INTO Municipios VALUES(6, 'San Francisco', 1);
INSERT INTO Municipios VALUES(7, 'Tela', 1);
INSERT INTO Municipios VALUES(8, 'Arizona', 1);


INSERT INTO Municipios VALUES(9, 'Trujillo', 2);
INSERT INTO Municipios VALUES(10, 'Balfate', 2);
INSERT INTO Municipios VALUES(11, 'Iriona', 2);
INSERT INTO Municipios VALUES(12, 'Limón', 2);
INSERT INTO Municipios VALUES(13, 'Sabá', 2);
INSERT INTO Municipios VALUES(14, 'Santa Fe', 2);
INSERT INTO Municipios VALUES(15, 'Santa Rosa de Aguán', 2);
INSERT INTO Municipios VALUES(16, 'Sonaguera', 2);
INSERT INTO Municipios VALUES(17, 'Tocoa', 2);
INSERT INTO Municipios VALUES(18, 'Bonito Oriental', 2);



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