import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  seleccionado: boolean= false;
  mensaje = new FormGroup({
    contenido: new FormControl('', Validators.required),
  });
  constructor() { }

  ngOnInit(): void {
  }

mostrar(){
  this.seleccionado=true
}
}
