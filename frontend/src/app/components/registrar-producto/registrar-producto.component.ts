import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {
  formulario= new FormGroup({
    nombre: new FormControl('',Validators.required),
    precio: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    categorias:new FormControl('',Validators.required),
});
  constructor(private router:Router ,private location:Location) { }

  ngOnInit(): void {
  }
  files: File[] = [];
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  validar(){
    if(!this.formulario.valid || !this.files.length){
      Swal.fire(
        'ERROR!',
        'Porfavor completar todos los campos',
        'warning',
      );
    }else{
      Swal.fire(
        'Buen Trabajo!',
        'Su producto fue registrado correctamente',
        'success',
      );
      console.log(this.files)
    }
    this.formulario.reset();
    this.files.pop();
  }
}
