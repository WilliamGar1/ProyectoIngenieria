import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewChatService {

  newChat = {
    chatPersona: '', 
    chatPersonaId: 0,
    ultimo: {
      emisor: 0,
      receptor: 0,
      mensaje: ''
    }
  }

  constructor() { }

  addNewChat(chatPersona: string, chatPersonaId: number){
    this.newChat = {
      chatPersona : chatPersona, 
      chatPersonaId : chatPersonaId,
      ultimo: {
        emisor: 0,
        receptor: 0,
        mensaje: ''
      }
    }
  }

  deleteNewChat(){
    this.newChat = {
      chatPersona: '', 
      chatPersonaId: 0,
      ultimo: {
        emisor: 0,
        receptor: 0,
        mensaje: ''
      }
    }
  }

  getNewChat(){
    return this.newChat
  }
}
