import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  roomId = 32;
  chatmessages = [];
  personaId = 0;
  userId = 0;
  chatList: [
    {chatPersona: string, chatPersonaId: number}
  ];
  
  constructor(public socket:SocketioService, private _nodeServer: NodeServerService) {}

  ngOnInit(): void {
    this.getUserId();
    this.getChatsPersona();
  }

  mostrar(id: number) {
    this.personaId = id;
    this.getMensajesPersona();
    this.seleccionado = true;
  }

  agregar() {
    console.log('Se presiono el boton');
    
  }

  getChatsPersona(){
    var id = parseInt(localStorage.getItem('usuario'));
    console.log(id);
    this._nodeServer.getChatsPersona(id).subscribe(data => {
      if(data.exito){
        console.log(data.mensaje);
        this.chatList = data.chatPersonas;
      }
      else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  getUserId(){
    this.userId = parseInt(localStorage.getItem('usuario'));
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
     user: parseInt(localStorage.getItem('usuario'))
   }
   console.log(messageInfo);
   this.socket.sendMessage(messageInfo);
   //limpiar texto de mensaje

  }
}
