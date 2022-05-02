use bavvsia83xxkjbvtnugt;

DROP TABLE IF EXISTS TipoUsuario;

DROP TABLE IF EXISTS Municipios;
DROP TABLE IF EXISTS Departamentos;

DROP TABLE IF EXISTS  Telefonos;
DROP TABLE IF EXISTS  ImagenPerfilUsuario;
DROP TABLE IF EXISTS DatosInicioSesion;
DROP TABLE IF EXISTS Usuarios;

DROP TABLE IF EXISTS ImagenesProducto;
DROP TABLE IF EXISTS Productos;

DROP TABLE IF EXISTS Categorias;

DROP TABLE IF EXISTS Calificaciones;
DROP TABLE IF EXISTS Denuncias;
DROP TABLE IF EXISTS Suscripciones;
DROP TABLE IF EXISTS Chats;

DROP TABLE IF EXISTS ListaDeseos;

DROP TABLE IF EXISTS test;

/*--tipo de usuario */
CREATE TABLE IF NOT EXISTS TipoUsuario(
Id INTEGER PRIMARY KEY,
nombre VARCHAR(100) NOT NULL
);

INSERT INTO TipoUsuario VALUES (1,"Normal");
INSERT INTO TipoUsuario VALUES (2,"Administrador");

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
 TipoUsuario  INTEGER   DEFAULT 1 ,
 actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
 FOREIGN KEY (TipoUsuario)REFERENCES TipoUsuario(Id)
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
creacion TIMESTAMP DEFAULT NOW(),
actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
estado BOOLEAN DEFAULT TRUE
);

/*SUSCRIPCIONES*/
CREATE TABLE IF NOT EXISTS Suscripciones(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
categoriaId INTEGER NOT NULL REFERENCES Categorias(Id),
creacion TIMESTAMP DEFAULT NOW(),
actualizacion TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
estado BOOLEAN DEFAULT TRUE
);

/*CHATS*/
CREATE TABLE IF NOT EXISTS Chats(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
emisor INTEGER NOT NULL REFERENCES Usuarios(Id),
receptor INTEGER NOT NULL REFERENCES Usuarios(Id),
mensaje VARCHAR(300),
creacion TIMESTAMP DEFAULT NOW(),
estado_Receptor BOOLEAN DEFAULT TRUE,
estado_Emisor BOOLEAN DEFAULT TRUE
);

/*LISTA DE DESEOS*/
CREATE TABLE ListaDeseos(
Id INTEGER AUTO_INCREMENT PRIMARY KEY,
clienteId INTEGER NOT NULL REFERENCES Usuarios(Id),
productoId INTEGER NOT NULL REFERENCES Productos(Id),
estadoHabilitacion BOOLEAN DEFAULT TRUE
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
INSERT INTO Municipios VALUES(143, 'Tocoa', 2);
INSERT INTO Municipios VALUES(144, 'Bonito Oriental', 2);


INSERT INTO Municipios VALUES(17, 'Comayagua', 3);
INSERT INTO Municipios VALUES(18, 'Ajuterique', 3);
INSERT INTO Municipios VALUES(19, 'El Rosario', 3);
INSERT INTO Municipios VALUES(20, 'Esquías', 3);
INSERT INTO Municipios VALUES(21, 'Humuya', 3);
INSERT INTO Municipios VALUES(22, 'La Libertad', 3);
INSERT INTO Municipios VALUES(23, 'Lamaní', 3);
INSERT INTO Municipios VALUES(24, 'La Trinidad', 3);
INSERT INTO Municipios VALUES(25, 'Lejamaní', 3);
INSERT INTO Municipios VALUES(26, 'Meámbar', 3);
INSERT INTO Municipios VALUES(27, 'Minas de Oro', 3);
INSERT INTO Municipios VALUES(28, 'Ojo de Agua', 3);
INSERT INTO Municipios VALUES(29, 'San Jerónimo', 3);
INSERT INTO Municipios VALUES(30, 'San José de Comayagua', 3);
INSERT INTO Municipios VALUES(31, 'San José del Potrero', 3);
INSERT INTO Municipios VALUES(32, 'San Luis', 3);
INSERT INTO Municipios VALUES(33, 'San Sebastián', 3);
INSERT INTO Municipios VALUES(34, 'Siguatepeque', 3);
INSERT INTO Municipios VALUES(35, 'Villa de San Antonio', 3);
INSERT INTO Municipios VALUES(36, 'Lajass', 3);
INSERT INTO Municipios VALUES(37, 'Taulabe', 3);


INSERT INTO Municipios VALUES(38, 'Santa Rosa de Copán', 4);
INSERT INTO Municipios VALUES(39, 'Cabañas', 4);
INSERT INTO Municipios VALUES(40, 'Concepción', 4);
INSERT INTO Municipios VALUES(41, 'Copán Ruinas', 4);
INSERT INTO Municipios VALUES(42, 'Corquín', 4);
INSERT INTO Municipios VALUES(43, 'Cucuyagua', 4);
INSERT INTO Municipios VALUES(44, 'Dolores', 4);
INSERT INTO Municipios VALUES(45, 'Dulce Nombre', 4);
INSERT INTO Municipios VALUES(46, 'El Paraíso', 4);
INSERT INTO Municipios VALUES(47, 'Florida', 4);
INSERT INTO Municipios VALUES(48, 'La Jigua', 4);
INSERT INTO Municipios VALUES(49, 'La Unión', 4);
INSERT INTO Municipios VALUES(50, 'Nueva Arcadia', 4);
INSERT INTO Municipios VALUES(51, 'San Agustín', 4);
INSERT INTO Municipios VALUES(52, 'San Antonio', 4);
INSERT INTO Municipios VALUES(53, 'San Jerónimo', 4);
INSERT INTO Municipios VALUES(54, 'San José', 4);
INSERT INTO Municipios VALUES(55, 'San Juan de Opoa', 4);
INSERT INTO Municipios VALUES(56, 'San Nicolás', 4);
INSERT INTO Municipios VALUES(57, 'San Pedro', 4);
INSERT INTO Municipios VALUES(58, 'Santa Rita', 4);
INSERT INTO Municipios VALUES(59, 'Trinidad de Copán', 4);
INSERT INTO Municipios VALUES(60, 'Veracruz', 4);


INSERT INTO Municipios VALUES(61, 'San Pedro Sula', 5);
INSERT INTO Municipios VALUES(62, 'Choloma', 5);
INSERT INTO Municipios VALUES(63, 'Omoa', 5);
INSERT INTO Municipios VALUES(64, 'Pimienta', 5);
INSERT INTO Municipios VALUES(65, 'Potrerillos', 5);
INSERT INTO Municipios VALUES(66, 'Puerto Cortés', 5);
INSERT INTO Municipios VALUES(67, 'San Antonio de Cortés', 5);
INSERT INTO Municipios VALUES(68, 'San Francisco de Yojoa', 5);
INSERT INTO Municipios VALUES(69, 'San Manuel', 5);
INSERT INTO Municipios VALUES(70, 'Santa Cruz de Yojoa', 5);
INSERT INTO Municipios VALUES(71, 'Villanueva', 5);
INSERT INTO Municipios VALUES(72, 'La Lima', 5);


INSERT INTO Municipios VALUES(73, 'Choluteca', 6);
INSERT INTO Municipios VALUES(74, 'Apacilagua', 6);
INSERT INTO Municipios VALUES(75, 'Concepción de María', 6);
INSERT INTO Municipios VALUES(76, 'Duyure', 6);
INSERT INTO Municipios VALUES(77, 'El Corpus', 6);
INSERT INTO Municipios VALUES(78, 'El Triunfo', 6);
INSERT INTO Municipios VALUES(79, 'Marcovia', 6);
INSERT INTO Municipios VALUES(80, 'Morolica', 6);
INSERT INTO Municipios VALUES(81, 'Namasigüe', 6);
INSERT INTO Municipios VALUES(82, 'Orocuina', 6);
INSERT INTO Municipios VALUES(83, 'Pespire', 6);
INSERT INTO Municipios VALUES(84, 'San Antonio de Flores', 6);
INSERT INTO Municipios VALUES(85, 'San Isidro', 6);
INSERT INTO Municipios VALUES(86, 'San José', 6);
INSERT INTO Municipios VALUES(87, 'San Marcos de Colón', 6);
INSERT INTO Municipios VALUES(88, 'Santa Ana de Yusguare', 6);


INSERT INTO Municipios VALUES(89, 'Yuscaran', 7);
INSERT INTO Municipios VALUES(90, 'Aluca', 7);
INSERT INTO Municipios VALUES(91, 'Danli', 7);
INSERT INTO Municipios VALUES(92, 'El Paraiso', 7);
INSERT INTO Municipios VALUES(93, 'Guinope', 7);
INSERT INTO Municipios VALUES(94, 'Jacaleapa', 7);
INSERT INTO Municipios VALUES(95, 'Liure', 7);
INSERT INTO Municipios VALUES(96, 'Moroceli', 7);


INSERT INTO Municipios VALUES(97, 'Tegucigalpa D.C.', 8);
INSERT INTO Municipios VALUES(98, 'Cedros', 8);
INSERT INTO Municipios VALUES(99, 'Lepaterique', 8);
INSERT INTO Municipios VALUES(100, 'Ojojona', 8);
INSERT INTO Municipios VALUES(101, 'Sabanagrande', 8);
INSERT INTO Municipios VALUES(102, 'Santa Ana', 8);
INSERT INTO Municipios VALUES(103, 'Santa Lucia', 8);
INSERT INTO Municipios VALUES(104, 'Valle de Angeles', 8);


INSERT INTO Municipios VALUES(105, 'Puerto Lempira', 9);
INSERT INTO Municipios VALUES(106, 'Brus Laguna', 9);
INSERT INTO Municipios VALUES(107, 'Villeda Morales', 9);


INSERT INTO Municipios VALUES(108, 'La Esperanza', 10);
INSERT INTO Municipios VALUES(109, 'Concepcion', 10);
INSERT INTO Municipios VALUES(110, 'Intibuca', 10);


INSERT INTO Municipios VALUES(111, 'Roatan', 11);
INSERT INTO Municipios VALUES(112, 'Guanaja', 11);
INSERT INTO Municipios VALUES(113, 'Jose Santos Guardiola', 11);
INSERT INTO Municipios VALUES(114, 'Utila', 11);


INSERT INTO Municipios VALUES(115, 'La Paz', 12);
INSERT INTO Municipios VALUES(116, 'Marcala', 12);
INSERT INTO Municipios VALUES(117, 'San Juan', 12);
INSERT INTO Municipios VALUES(118, 'Yarula', 12);


INSERT INTO Municipios VALUES(119, 'Gracias', 13);
INSERT INTO Municipios VALUES(120, 'La union', 13);
INSERT INTO Municipios VALUES(121, 'Lepaera', 13);
INSERT INTO Municipios VALUES(122, 'Talgua', 13);

INSERT INTO Municipios VALUES(123, 'Nueva Ocotepeque', 14);
INSERT INTO Municipios VALUES(124, 'Concepcion', 14);
INSERT INTO Municipios VALUES(125, 'San Marcos', 14);
INSERT INTO Municipios VALUES(126, 'Sinuapa', 14);


INSERT INTO Municipios VALUES(127, 'Juticalpa', 15);
INSERT INTO Municipios VALUES(128, 'Campamento', 15);
INSERT INTO Municipios VALUES(129, 'Catacamas', 15);
INSERT INTO Municipios VALUES(130, 'Patuca', 15);


INSERT INTO Municipios VALUES(131, 'Santa Barbara', 16);
INSERT INTO Municipios VALUES(132, 'Gualala', 16);
INSERT INTO Municipios VALUES(133, 'Ilama', 16);
INSERT INTO Municipios VALUES(134, 'Quimistan', 16);


INSERT INTO Municipios VALUES(135, 'Nacaome', 17);
INSERT INTO Municipios VALUES(136, 'Amapala', 17);
INSERT INTO Municipios VALUES(137, 'Langue', 17);
INSERT INTO Municipios VALUES(138, 'San Lorenza', 17);


INSERT INTO Municipios VALUES(139, 'Yoro', 18);
INSERT INTO Municipios VALUES(140, 'Arenal', 18);
INSERT INTO Municipios VALUES(141, 'Olanchito', 18);
INSERT INTO Municipios VALUES(142, 'Yorito', 18);

INSERT INTO Categorias VALUES (1,'Electrónicos');
INSERT INTO Categorias VALUES (2,'Muebles');
INSERT INTO Categorias VALUES (3,'Ropa');
INSERT INTO Categorias VALUES (4,'Calzado');
INSERT INTO Categorias VALUES (5,'Cosméticos');
INSERT INTO Categorias VALUES (6,'Comestibles');
INSERT INTO Categorias VALUES (7,'Linea Blanca');
INSERT INTO Categorias VALUES (8,'Equipo Deportivo');


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
    
   
