const express= require('express');
const path =require('path');
const fs = require('fs');

const router = express.Router();

const users = require('./users');
const direcciones = require('./direcciones');
const categorias = require('./categorias');
const productos = require('./productos');
const calificaDenuncia = require('./calificaciones.denuncias');
const suscripciones = require('./suscripciones');
const chats = require('./chats');
const publicidad = require('./publicidad');
const PDFMaker = require('./PDFMaker');

const multer = require("../config/multer.config");


//SERVIDOR
router.get('/',(req,res)=>{nodeS = { server :"Node server online" }; res.render('index.html',{nodeS });});

//USERS
router.post('/insertNewUser',users.insertNewUser);

router.post('/loginUsuario', users.LoginUser);

router.get('/infoUsuario/:id', users.infoUser);

router.get('/detallesVendedor/:id', users.detallesVendedor);

router.post('/confirmarCuenta',users.verifyUser);

//RESET PASSWORD
router.post('/resetPasswordSolicitud',users.resetPasswordSolicitud);

router.post('/resetPasswordForm/token',users.resetPasswordForm);

router.post('/resetPasswordForm/guardar',users.resetPasswordGuardar);

//IMAGEN DE PERFIL
router.post('/insertImagenPerfil/:id',multer.cargarArchivo.single('imagenPerfil'),users.insertImagenPerfil);

//DIRECCIONES
router.get('/datosregistro',direcciones.getAll_departamentos_municipios);

//CATEGORTIAS
router.get('/datosregistroProducto',categorias.getAll_categorias);

router.get('/insertNewCategoria',categorias.insertNewCategoria);

router.get('/actualizarCategoria',categorias.actualizarCategoria);

router.get('/eliminarCategoria',categorias.eliminarCategoria);

//PRODUCTO
router.post('/insertNewProducto/:id',multer.cargarArchivo.array('imagenesProducto',4),productos.insertNewProducto);

router.get('/getProductosMuestra',productos.getProductosMuestra);

router.get('/getProductosCategoria/:id',productos.getProductosCategoria);

router.get('/getProductosUsuario/:id',productos.getProductosUsuario);

router.get('/getProductoDetalle/:id',productos.getProductoDetalle);

router.get('/setInhabilitarProducto/:id',productos.setInhabilitarProducto);

//CALIFICACIONES_DENUNCIAS

router.post('/calificarVendedor',calificaDenuncia.calificarVendedor);

router.get('/getCalificacionMedia/:id',calificaDenuncia.calificacionMedia);

router.post('/recibirDenuncia',calificaDenuncia.recibirDenuncia);

router.get('/getDenuncias',calificaDenuncia.getAll_Denuncias);

router.get('/tacharDenuncia',calificaDenuncia.tacharDenuncia);

router.get('/getDenunciasResueltas',calificaDenuncia.getAll_DenunciasResueltas);

//SUSCRIPCIONES 
router.post('/suscribirCategoria',suscripciones.suscribirCategoria);

router.post('/cancelarSuscripcion',suscripciones.cancelarSuscripcion);

router.get('/suscripcionesCliente/:id',suscripciones.suscripcionesCliente);

//CHATS
router.post('/enviarMensaje',chats.enviarMensaje);

router.get('/chatPersonas/:id',chats.chatPersonas);

router.get('/mensajesPersona/:usuarioId/:personaId',chats.mensajesPersona);

router.post('/borrarChat',chats.borrarChat);


//Publicidad email,Prueba
router.get('/publicidadPDF',publicidad.publicidadPDF);
router.get('/publicidadHTML',publicidad.publicidadHTML);

router.get('/pdf',PDFMaker.PDFMaker)

router.get('/test',users.test);
router.get('/testImagen',productos.testImg);


module.exports = router;