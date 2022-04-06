use bavvsia83xxkjbvtnugt;


DROP TABLE IF EXISTS Municipios;
DROP TABLE IF EXISTS Departamentos;

DROP TABLE IF EXISTS  Telefonos;
DROP TABLE IF EXISTS  ImagenPerfilUsuario;
DROP TABLE IF EXISTS DatosInicioSesion;
DROP TABLE IF EXISTS Usuarios;

DROP TABLE IF EXISTS ImagenesProducto;
DROP TABLE IF EXISTS Productos;

DROP TABLE IF EXISTS Categorias;

DROP TABLE IF EXISTS test;


/*--direcciones*/
CREATE TABLE Departamentos(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);


CREATE TABLE Municipios(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
departamentoId INTEGER NOT NULL REFERENCES Departamentos(Id)
);



/*--usuario*/
CREATE TABLE Usuarios(
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


CREATE TABLE DatosInicioSesion(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
contrasenia VARCHAR(200) NOT NULL,
estado  BOOLEAN DEFAULT TRUE
);

CREATE TABLE Telefonos(
Id INTEGER  AUTO_INCREMENT  PRIMARY KEY,
personaId INTEGER NOT NULL REFERENCES Usuarios(Id),
telefono VARCHAR(16) NOT NULL
);

CREATE TABLE ImagenPerfilUsuario(
Id INTEGER  AUTO_INCREMENT PRIMARY KEY,
perfilImagen LONGBLOB,
contentType VARCHAR(30),
personaId INTEGER NOT NULL REFERENCES Usuarios(Id)
);


/*--CATEGORIAS*/
CREATE TABLE Categorias(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);
INSERT INTO Categorias VALUES (1,'Comestibles');
INSERT INTO Categorias VALUES (2,'Calzado');
INSERT INTO Categorias VALUES (3,'Muebles');

/*--PRODUCTO*/
CREATE TABLE Productos(
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

CREATE TABLE ImagenesProducto(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
productoId INTEGER NOT NULL REFERENCES Productos(Id),
productoImagen LONGBLOB ,
contentType VARCHAR(30)
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

SELECT 
    *
FROM
    Usuarios;
    
    SELECT 
    *
FROM
    ImagenesProducto;
    
    
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
    
    /*ImagenPerfil usuario*/
    SELECT *  FROM ImagenPerfilUsuario WHERE personaId = 3;
    
    /*getProductoDetalle*/
    SELECT * FROM Productos WHERE Id = 7;
    SELECT Id,productoImagen Imagen,contentType ImagenTipo FROM ImagenesProducto WHERE productoId =7;
    
     /*setInhabilitarProducto */
      UPDATE Productos SET estadoHabilitacion = true  WHERE Id =1;
    
    select * from Productos;
    select * from ImagenPerfilUsuario;
