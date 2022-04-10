use bavvsia83xxkjbvtnugt;


/*DROP TABLE IF EXISTS Municipios;
DROP TABLE IF EXISTS Departamentos;

DROP TABLE IF EXISTS  Telefonos;
DROP TABLE IF EXISTS  ImagenPerfilUsuario;
DROP TABLE IF EXISTS DatosInicioSesion;
DROP TABLE IF EXISTS Usuarios;

DROP TABLE IF EXISTS ImagenesProducto;
DROP TABLE IF EXISTS Productos;

DROP TABLE IF EXISTS Categorias;*/

DROP TABLE IF EXISTS Calificaciones;
DROP TABLE IF EXISTS Denuncias;
DROP TABLE IF EXISTS Suscripciones;
DROP TABLE IF EXISTS Chats;

DROP TABLE IF EXISTS test;


/*--direcciones*/
CREATE TABLE IF NOT EXISTS Departamentos(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS Municipios(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
departamentoId INTEGER NOT NULL REFERENCES Departamentos(Id)
);



/*--usuario*/
CREATE TABLE IF NOT EXISTS Usuarios(
 Id INTEGER AUTO_INCREMENT PRIMARY KEY,
 nombre        VARCHAR(30)   ,
 apellido      VARCHAR(30)   ,
 email         VARCHAR(30)  UNIQUE  ,
 contrato  BOOLEAN  DEFAULT TRUE,
 municipioId INTEGER NOT NULL REFERENCES Municipios(Id) ,
 direccion     VARCHAR(200) ,
 estadoHabilitacion BOOLEAN DEFAULT FALSE,
 creacion TIMESTAMP DEFAULT NOW(),
 actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);


CREATE TABLE IF NOT EXISTS DatosInicioSesion(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
contrasenia VARCHAR(200) NOT NULL,
estado  BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Telefonos(
Id INTEGER  AUTO_INCREMENT  PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
telefono VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS ImagenPerfilUsuario(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
perfilImagen LONGBLOB,
contentType VARCHAR(30),
personaId INTEGER NOT NULL REFERENCES Usuarios(Id)
);


/*--CATEGORIAS*/
CREATE TABLE IF NOT EXISTS Categorias(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);


/*--PRODUCTO*/
CREATE TABLE IF NOT EXISTS  Productos(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
precio DOUBLE NOT NULL,
descripcion VARCHAR(100) NOT NULL,
estadoHabilitacion BOOLEAN DEFAULT TRUE,
categoriaId INTEGER NOT NULL REFERENCES Categorias(Id),
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
creacion TIMESTAMP DEFAULT NOW(),
actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE  IF NOT EXISTS ImagenesProducto(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
productoId INTEGER NOT NULL REFERENCES Productos(Id),
productoImagen LONGBLOB ,
contentType VARCHAR(30)
);

/*CALIFICACIONES*/
CREATE TABLE IF NOT EXISTS Calificaciones(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
vendedorId INTEGER NOT NULL REFERENCES Usuarios(Id),
calificacion INTEGER NOT NULL
);

/*DENUNCIAS*/
CREATE TABLE  IF NOT EXISTS Denuncias(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
vendedorId INTEGER NOT NULL REFERENCES Usuarios(Id),
detalle VARCHAR(200) NOT NULL,
estado BOOLEAN DEFAULT TRUE
);

/*SUSCRIPCIONES*/
CREATE TABLE IF NOT EXISTS Suscripciones(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
categoriaId INTEGER NOT NULL REFERENCES Categorias(Id),
estado BOOLEAN DEFAULT TRUE
);

/*CHATS*/
CREATE TABLE IF NOT EXISTS Chats(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
vendedorId INTEGER NOT NULL REFERENCES Usuarios(Id),
mensaje VARCHAR(300)
);


/*DENUNCIAS*/


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


INSERT INTO Categorias VALUES (1,'Electrónicos');
INSERT INTO Categorias VALUES (2,'Muebles');
INSERT INTO Categorias VALUES (3,'Ropa');
INSERT INTO Categorias VALUES (4,'Calzado');
INSERT INTO Categorias VALUES (5,'Cosméticos');
INSERT INTO Categorias VALUES (6,'Comestibles');


CREATE TABLE  IF NOT EXISTS test(
     id  int auto_increment PRIMARY KEY,
     n varchar(10)
);


    
    
    /*querys*/
   SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo, c.nombre Categoria, c.Id CategoriaId FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
    AND estadoHabilitacion = TRUE
    GROUP BY p.Id;
    
    /* getProductosCategoria*/
    SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo, c.nombre Categoria, c.Id CategoriaId FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
    AND p.categoriaId = 3 AND estadoHabilitacion = TRUE 
    GROUP BY p.Id
    ORDER BY p.creacion DESC;
    
    /*getProductosUsuario*/
    SELECT p.*,i.productoImagen Imagen ,i.contentType ImagenTipo ,CONCAT(u.nombre,' ',u.apellido) Usuario, u.Id UsuarioId, c.nombre Categoria, c.Id CategoriaId FROM Productos p 
    INNER JOIN ImagenesProducto i ON p.Id = i.productoId
    INNER JOIN Categorias c ON c.Id = p.categoriaId
	INNER JOIN Usuarios u ON u.Id = p.personaId  
	AND p.personaId = 4 AND p.estadoHabilitacion = TRUE 
    GROUP BY p.Id
    ORDER BY p.creacion DESC;
    
   