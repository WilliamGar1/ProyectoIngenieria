import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  io = io("http://localhost:3000",{
    withCredentials:true,
    autoConnect: true
  });

  chat=[];
  constructor() {
    this.onReciveMessage();
  }

  resetChat(newChat){
    this.chat = newChat;
  }

  privateMessage(messageInfo){
    this.io.emit("privateMessage",messageInfo);
  }

  sendMessage(messageInfo){
    this.chat.push(messageInfo);
    this.io.emit("sendMessage",messageInfo);
  
  }

  onReciveMessage(){
    this.io.on("reciveMessage",(messageInfo)=>{
      this.chat.push(messageInfo);
    });
  }

}
