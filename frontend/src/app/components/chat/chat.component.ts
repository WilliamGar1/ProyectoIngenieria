import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NodeServerService } from "src/app/services/node-server.service";
import { SocketioService } from "src/app/services/socketio.service";

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
  personaId = 0;
  userId = 0;
  chatList: [
    {chatPersona: string, chatPersonaId: number}
  ];
  
  constructor(
    public socket:SocketioService, 
    private route: ActivatedRoute,
    private _nodeServer: NodeServerService) {}

  ngOnInit(): void {
    this.getUserId();
    this.getChatsPersona();
  }

  mostrar(id: number) {
    this.personaId = id;
    this.getMensajesPersona();
    this.socket.joinRoom(id);
    this.seleccionado = true;
  }

  agregar() {
    console.log('Se presiono el boton');
    
  }

  newChat(data){
    var chat = {
      chatPersona: "a",
      chatPersonaId: data
    }
    this.chatList.push(chat);
    console.log(this.chatList);
  }

  getChatsPersona(){
    var id = parseInt(localStorage.getItem('usuario'));
    console.log(id);
    this._nodeServer.getChatsPersona(id).subscribe(data => {
      if(data.exito){
        console.log(data.mensaje);
        this.chatList = data.chatPersonas;
        console.log(this.chatList);
        var id = 0;
        var isNew = false;
        id =+this.route.snapshot.paramMap.get('id');
        console.log(id);
        if(id>0){
          this.chatList.forEach(chat =>{
            if(chat.chatPersonaId == id){
              isNew = true;
            }
          });
          if(!isNew){
            this.newChat(id);
          }
          this.mostrar(id);
        }
      }
      else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  getUserId(){
    this.userId = parseInt(localStorage.getItem('usuario'));
    this.socket.connection(this.userId);
    this.socket.joinRoom(this.userId);
  }

  getMensajesPersona(){
    this._nodeServer.getMensajesPersona(this.userId, this.personaId).subscribe(data =>{
      if(data.exito){
        console.log(data.mensaje);
        var newChat = [];
        data.mensajesPersona.forEach(mensaje => {
          var message = {
            message: mensaje.mensaje,
            user: mensaje.emisor
          }
          newChat.push(message);
        });
        this.socket.resetChat(newChat);
      }
      else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  sendMessage(){
   console.log(this.mensaje.value.contenido);
   let messageInfo = {
     message: this.mensaje.value.contenido,
     user: parseInt(localStorage.getItem('usuario')),
     person: this.personaId
   }
   console.log(messageInfo);
   //this.socket.sendMessage(messageInfo);
   this.socket.privateMessage(messageInfo);
   this.guardarMensaje();
   //limpiar texto de mensaje

  }

  guardarMensaje(){
    let data = {
      emisor: parseInt(localStorage.getItem('usuario')),
      receptor: this.personaId,
      mensaje: this.mensaje.value.contenido
    }
    this._nodeServer.postEnviarMensaje(data).subscribe(data =>{
      if(data.exito){
        console.log(data);
      }else{
        console.log(data.mensaje);
      }
    }, err =>console.log(err));
  }
}
