const express= require('express');
const path =require('path');
const fs = require('fs');

const router = express.Router();

const users = require('./users');

router.get('/',(req,res)=>{

  nodeS = { server :"Node server online" };

 // res.send(node);
  
    res.render('index.html',{
      nodeS
    });


});

router.get('/angular',(req,res)=>{

  nodeS = { server :"Node_Angular -> GET " };
  console.log(nodeS);
   res.send(nodeS);
  

});

router.post('/angular',(req,res)=>{

  nodeS = { respuesta :"Node_Angular -> POST " };
  console.log(req.body);
  console.log(nodeS);
  res.send(nodeS);

});

//
router.post('/insertNewUser',users.insertNewUser);

router.post('/log', users.LoginUser);

router.get('/confirm/:token',users.verifyUser);



module.exports = router;