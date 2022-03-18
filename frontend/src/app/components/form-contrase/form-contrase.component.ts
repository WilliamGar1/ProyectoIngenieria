import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-contrase',
  templateUrl: './form-contrase.component.html',
  styleUrls: ['./form-contrase.component.css']
})
export class FormContraseComponent implements OnInit {
    contra= new FormControl()
    contra2= new FormControl()
  constructor() { }

  ngOnInit(): void {
  }

  validar(){
    if (this.contra.value!=this.contra2.value){
       Swal.fire(
         'Error!',
         'Contraseñas no coinciden, porfavor ingresarlas de Nuevo',
         'warning',
       );
    }
    this.contra.reset();
    this.contra2.reset();
  }

}
