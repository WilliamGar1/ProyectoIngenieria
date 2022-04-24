import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  io = io("http://localhost:3000",{
    autoConnect: true
  });

  constructor() {
    this.io.emit("test");
   }
}
