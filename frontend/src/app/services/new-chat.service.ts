import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewChatService {

  newChat = {
    chatPersona: '', 
    chatPersonaId: 0
  }

  constructor() { }

  addNewChat(chatPersona: string, chatPersonaId: number){
    this.newChat = {
      chatPersona : chatPersona, 
      chatPersonaId : chatPersonaId
    }
  }

  deleteNewChat(){
    this.newChat = {
      chatPersona: '', 
      chatPersonaId: 0
    }
  }

  getNewChat(){
    return this.newChat
  }
}
