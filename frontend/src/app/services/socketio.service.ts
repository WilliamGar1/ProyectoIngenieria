import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {


  io = io("http://localhost:3000",{
    withCredentials:true,
    autoConnect: false
  });
  userId = 0;
  actualRoom = 0;
  chat=[];
  usersOnline=[];

  
  constructor() {
    this.onRecivePrivateMessage();
    this.onUsers();
  }

  resetChat(newChat){
    this.chat = newChat;
  }

  connection(id){
    this.userId = id;
    this.io.connect();
    this.io.emit("joinRoom",id);
  }

  joinRoom(id){
    if(this.actualRoom != id){
      if(this.actualRoom != 0){
        this.leaveRoom(this.actualRoom);
      }
      this.io.emit("joinRoom",id);
      this.actualRoom = id;
    }
    
  }

  leaveRoom(id){
    this.io.emit("leaveRoom",id);
    this.actualRoom = id;
  }

  privateMessage(messageInfo){
    this.chat.push(messageInfo);
    this.io.emit("privateMessage",messageInfo);
  }

  onUsers(){
    this.io.on("users", (users)=>{
      this.usersOnline = users;
    });
  }

  sendMessage(messageInfo){
    this.chat.push(messageInfo);
    this.io.emit("sendMessage",messageInfo);
  
  }

  onRecivePrivateMessage(){
    this.io.on("newPrivateMessage",(messageInfo)=>{
      if(messageInfo.user == this.actualRoom && messageInfo.person == this.userId){ 
        this.chat.push(messageInfo);
      }
    });
  }

  onReciveMessage(){
    this.io.on("reciveMessage",(messageInfo)=>{
      this.chat.push(messageInfo);
    });
  }

}
