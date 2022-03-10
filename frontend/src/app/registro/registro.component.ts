import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre = new FormControl('David');
  apellido = new FormControl('Chavez');
  correo = new FormControl('david.chavez@unah.hn');
  password = new FormControl('1234');
  municipio = new FormControl('Santa Lucia');
  departamento = new FormControl('Francisco Morazan');
  telefono = new FormControl('2258-1585');
  direccion = new FormControl('Colonia nueva Santa Lucia');
  
  

  constructor() { }

  guardar(){
    console.log(this.nombre.value);
    console.log(this.apellido.value);
  }

  ngOnInit(): void {
  }

}
