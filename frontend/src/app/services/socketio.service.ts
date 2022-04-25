import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  
  constructor() {
  }

  listenPrivateMessage(){
    return new Observable((Subscriber)=>{
      this.io.on("newPrivateMessage",(messageInfo)=>{
        Subscriber.next(messageInfo);
      });
    });
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
    this.io.emit("privateMessage",messageInfo);
  }

}
