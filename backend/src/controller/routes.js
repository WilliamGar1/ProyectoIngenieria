const express= require('express');
const path =require('path');
const fs = require('fs');

const router = express.Router();

const users = require('./users');
const direcciones = require('./direcciones');
const categorias = require('./categorias');
const productos = require('./productos');
const multer = require("../config/multer.config");

//SERVIDOR
router.get('/',(req,res)=>{nodeS = { server :"Node server online" }; res.render('index.html',{nodeS });});

//USERS
router.post('/insertNewUser',users.insertNewUser);

router.post('/loginUsuario', users.LoginUser);

router.post('/confirmarCuenta',users.verifyUser);

//RESET PASSWORD
router.post('/resetPasswordSolicitud',users.resetPasswordSolicitud);

router.post('/resetPasswordForm/token',users.resetPasswordForm);

router.post('/resetPasswordForm/guardar',users.resetPasswordGuardar);

//IMAGEN DE PERFIL
router.post('/insertImagenPerfil',multer.cargarImagen.single('imagenPerfil'),users.insertImagenPerfil);

//DIRECCIONES
router.get('/datosregistro',direcciones.getAll_departamentos_municipios);

//CATEGORTIAS
router.get('/datosregistroProducto',categorias.getAll_categorias);

//PRODUCTO
router.post('/insertNewProducto/:id',multer.cargarImagen.array('imagenesProducto',4),productos.insertNewProducto);

router.get('/getProductoMuestra',productos.getProductoMuestra);

//array('imagenes',12)
//testeo de base de datos
router.get('/test',users.test);
router.get('/testImagen',productos.testImg);


module.exports = router;