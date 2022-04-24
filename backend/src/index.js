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


//Socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
    /*socket.on("test", ()=> {
        console.log("evento TEST");
    })*/
});

//SETTINGS

const port = process.env.PORT || 3000;
http.listen(port,()=>{
    console.log("Servidor iniciado");
});

