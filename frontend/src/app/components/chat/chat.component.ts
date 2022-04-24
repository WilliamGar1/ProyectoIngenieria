import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChatService } from "src/app/services/chat.service";
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
  constructor(private socket:SocketioService) {}

  ngOnInit(): void {}

  mostrar() {
    this.seleccionado = true;
  }

  agregar() {
    console.log('Se presiono el boton');
    
  }
}
