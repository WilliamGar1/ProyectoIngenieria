import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { esContraseñaValida } from './contra.helper';

@Component({
  selector: 'app-form-contrase',
  templateUrl: './form-contrase.component.html',
  styleUrls: ['./form-contrase.component.css']
})
export class FormContraseComponent implements OnInit {
    formulario= new FormGroup({
        contraseña: new FormControl('',[Validators.required,Validators.minLength(8)]),
        contraseña2: new FormControl('',[Validators.required,Validators.minLength(8)])
    });


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  postvalidar(){
    if (this.formulario.get('contraseña').value!=this.formulario.get('contraseña2').value){
       Swal.fire(
         'Error!',
         'Contraseñas no coinciden, porfavor ingresarlas de Nuevo',
         'warning',
       );
    }else if(this.formulario.valid){
      this.router.navigate(['login'])
      
    }
    this.formulario.reset()

  }

  informacion(){
    Swal.fire(
      'Información',
      'Una contraseña correcta tiene como mínimo 8 caracteres, una letra mayúscula, un número y un caracter especial (/#$%!) ',
      'question',
    );
  }
  get contraValida(){
    return esContraseñaValida(this.formulario.get('contraseña').value);
  }
}
