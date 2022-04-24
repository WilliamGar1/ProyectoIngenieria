import { Injectable } from '@angular/core';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:SocketioService) { }
}
