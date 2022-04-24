const express= require('express');

const bodyParser= require('body-parser');
const path = require('path');
const cors = require('cors');
const { isObject } = require('util');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors : {
        origin: true,
        credentials: true
    }
});


//MIDDLEWARE

//CORS-> INTEGRACION CON AGULAR
app.use(cors());

//INTERPRESTE DE JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//HTML-> TRATAR COMO PLANTILLA EJS
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//VIEWS FOLDER->
app.set('views',path.join(__dirname,'views'));

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')));

//ROUTES
app.use(require('./controller/routes'));
    //MODIFICADA
//app.use('/api',require('./controller/routes'));


//SOCKET.IO
io.on('connection', (socket) => {
    console.log("[Chat] User: "+socket.id+" connected");

    //METHODS
    socket.on("sendMessage", (messageInfo)=> {
        console.log("[Chat] enviando el mensaje: "+messageInfo.message+" user: "+messageInfo.user);
        socket.broadcast.emit("reciveMessage", messageInfo);
    })

    socket.on("joinRoom", (id)=>{
        socket.join(id);
        console.log("[Chat] User "+socket.id+" added to room: "+id);
        io.emit("res",{message:"added to room: "+id});
    });

    socket.on("leaveRoom", (id)=>{
        socket.join(id);
        console.log("[Chat] User "+socket.id+" leave room: "+id);
        io.emit("res",{message:"leave room: "+id});
    });

    socket.on("privateMessage", (messageInfo)=>{
        io.sockets.in(messageInfo.person).emit("newPrivateMessage",messageInfo);
    });
    
});


//SETTINGS

const port = process.env.PORT || 3000;
http.listen(port,()=>{
    console.log("Servidor iniciado");
});

