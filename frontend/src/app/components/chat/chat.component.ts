import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NewChatService } from "src/app/services/new-chat.service";
import { NodeServerService } from "src/app/services/node-server.service";
import { SocketioService } from "src/app/services/socketio.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  
  seleccionado: boolean = false;
  mensaje = new FormGroup({
    contenido: new FormControl("", Validators.required),
  });
  chat = [];
  personaId = 0;
  nameActualChat = '';
  userId = 0;
  chatList: [
    {
      chatPersona: string, 
      chatPersonaId: number, 
      ultimo: {
        emisor: number
        receptor: number,
        mensaje: string
      }
    }
  ];
  message: {
    user: number,
    person: number,
    message: string,
    date: Date
  }
  
  constructor(
    private socket: SocketioService,
    private newC: NewChatService,
    private _nodeServer: NodeServerService,
    private _router : Router) {}

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getChatsPersona();
    this.socket.listenPrivateMessage().subscribe((messageInfo:{user: number,person: number,message: string,date: Date})=>{
      if(messageInfo.person == this.userId){ 
        if(messageInfo.user == this.personaId){
          this.chat.push(messageInfo);
        }else{
          this.actualizarMensajes(messageInfo);
        }
      }
    });
  }

  mostrar(id: number, name: string) {
    this.resetChat([]);
    this.personaId = id;
    this.nameActualChat = name;
    this.getMensajesPersona();
    this.socket.joinRoom(id);
    this.seleccionado = true;
  }

  agregar() {
    console.log('Se presiono el boton');
    
  }

  newChat(data){
    var chat = {
      chatPersona: data.chatPersona,
      chatPersonaId: data.chatPersonaId,
      ultimo: data.ultimo
    }
    this.chatList.push(chat);
    console.log(this.chatList);
  }

  resetChat(newChat){
    this.chat = newChat;
  }

  getChatsPersona(){
    var nChat = this.newC.getNewChat();
    this._nodeServer.getChatsPersona(this.userId).subscribe(data => {
      if(data.exito){
        console.log(data.mensaje);
        this.chatList = data.chatPersonas;
        //console.log(this.chatList);
        this.getUltimo();
        var isNew = false;
        if(nChat.chatPersonaId!=0){
          this.chatList.forEach(chat =>{
            if(chat.chatPersonaId == nChat.chatPersonaId){
              isNew = true;
            }
          });
          if(!isNew){
            console.log("nuevo chat");
            this.newChat(nChat);
          }
          this.mostrar(nChat.chatPersonaId, nChat.chatPersona);
        }
      }
      else{
        console.log(data.mensaje);
        if(nChat.chatPersonaId!=0){
          this.chatList = [nChat];
          this.mostrar(nChat.chatPersonaId, nChat.chatPersona);
        }
      }
    }, err => console.log(err));
    this.newC.deleteNewChat();
  }

  getUltimo(){
    this.chatList.forEach(chat =>{
      this._nodeServer.getMensajesPersona(this.userId, chat.chatPersonaId).subscribe(data =>{
        if(data.exito){
          chat.ultimo = data.mensajesPersona[data.mensajesPersona.length-1];
          if(chat.ultimo.emisor==this.userId){
            chat.ultimo.mensaje = `Tu: ${chat.ultimo.mensaje}`;
          }
        }else{
          console.log(data.mensaje);
        }
      }, err => console.log(err));
    });
  }

  actualizarMensajes(messageInfo){
    var nuevo = true;
    this.chatList.forEach(chat =>{
      if(chat.chatPersonaId == messageInfo.user){
        nuevo = false;
        chat.ultimo.mensaje = messageInfo.message;
      }
    });
    if(nuevo){
      this._nodeServer.getVendedorDetalle(messageInfo.user).subscribe(
        (data) => {
          if (data.exito) {
            var chatNuevo = {
              chatPersona: data.usuario.nombre, 
              chatPersonaId: messageInfo.user, 
              ultimo: {
                emisor: messageInfo.user,
                receptor: this.userId,
                mensaje: messageInfo.message
              }
            }
            this.chatList.push(chatNuevo);
          } else {
            console.log(data.mensaje);
          }
        },
        (err) => console.log(err)
      );
    }
  }

  comprobarUsuario(){
    if(!localStorage.getItem('usuario')){
      console.log("Usuario no encontrado");
      Swal.fire(
        'ERROR!',
        'No ha iniciado sesión',
        'warning',
      );
      this._router.navigate(['login']);
    }else{
      this.userId = parseInt(localStorage.getItem('usuario'));
      this.socket.connection(this.userId);
    }
  }

  getMensajesPersona(){
    this._nodeServer.getMensajesPersona(this.userId, this.personaId).subscribe(data =>{
      if(data.exito){
        console.log(data.mensaje);
        //console.log(data);
        var newChat = [];
        data.mensajesPersona.forEach(mensaje => {
          var message = {
            message: mensaje.mensaje,
            user: mensaje.emisor,
            date: mensaje.creacion
          }
          newChat.push(message);
        });
        this.resetChat(newChat);
      }
      else{
        console.log(data.mensaje);
        this.resetChat([]);
      }
    }, err => console.log(err));
  }

  sendMessage(){
    let dateTime = new Date().toLocaleString("en-US", {timeZone: "Africa/Casablanca"});
    //console.log(this.mensaje.value.contenido);
    let messageInfo = {
      message: this.mensaje.value.contenido,
      user: parseInt(localStorage.getItem('usuario')),
      person: this.personaId,
      date: dateTime
    }
    //console.log(messageInfo);
    //this.socket.sendMessage(messageInfo);
    this.chatList.forEach(chat =>{
      if(chat.chatPersonaId == this.personaId){
        chat.ultimo.mensaje = `Tu: ${messageInfo.message}`;
      }
    });

    this.chat.push(messageInfo);
    this.socket.privateMessage(messageInfo);
    this.guardarMensaje();
    //limpiar texto de mensaje
    this.mensaje.reset();
  }

  guardarMensaje(){
    let data = {
      emisor: parseInt(localStorage.getItem('usuario')),
      receptor: this.personaId,
      mensaje: this.mensaje.value.contenido
    }
    this._nodeServer.postEnviarMensaje(data).subscribe(data =>{
      if(data.exito){
        console.log(data.mensaje);
      }else{
        console.log(data.mensaje);
      }
    }, err =>console.log(err));
  }

  borrarMensajes(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara todos los mensajes de esta conversación",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("borrar mensajes de usuario: "+this.personaId);
        var datos = {
          usuarioId: this.userId,
          chatPersonaId: this.personaId
        }
        this._nodeServer.postBorrarMensajes(datos).subscribe(data=>{
          if(data.exito){
            console.log(data.mensaje);
            this.resetChat([]);
            this._router.navigateByUrl('perfil', { skipLocationChange: true }).then(() => {
              this._router.navigate(['chat']);
          }); 
          }else{
            console.log(data.mensaje);
          }
        }, err => console.log(err));
      }
    })
    
  }
}
