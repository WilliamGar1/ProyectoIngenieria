const express= require('express');
const path =require('path');
const fs = require('fs');

const router = express.Router();

const users = require('./users');

router.get('/',(req,res)=>{nodeS = { server :"Node server online" }; res.render('index.html',{nodeS });});


router.post('/insertNewUser',users.insertNewUser);

router.post('/log', users.LoginUser);

router.get('/confirm/:token',users.verifyUser);

//testeo de base de datos

router.get('/test',users.test);

module.exports = router;