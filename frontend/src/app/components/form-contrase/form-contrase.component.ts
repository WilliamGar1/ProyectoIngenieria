import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { esContraseñaValida } from './passw.helper';
import { NodeServerService } from 'src/app/services/node-server.service';

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


  constructor(private _nodeServer: NodeServerService,
              private router:Router,
              private _activateRoute: ActivatedRoute) { }

    usuario={
      id:0,
      email:''
    }; 
    
    data={};

  ngOnInit(): void {
    this.postCambiarContraseniaToken();
  }

  postCambiarContraseniaToken(){

    this._activateRoute.params.subscribe( token =>{

      this._nodeServer.postCambiarContraseniaToken(token).subscribe(result=>{

        
  
        this.usuario={
          id:result.id,
          email:result.email
        };
     
        console.log(this.usuario);
  
       },err =>console.log(err));

    });
  };
  postvalidar(){
    if (this.formulario.get('contraseña').value!=this.formulario.get('contraseña2').value){
       Swal.fire(
         'Error!',
         'Contraseñas no coinciden, porfavor ingresarlas de Nuevo',
         'warning',
       );
    }else if(this.formulario.valid){
      
    

console.log(this.usuario.id);

this.data={nuevaContrasenia:'prueba'
      , usuarioId:this.usuario.id};

      this._nodeServer.postCambiarContraseniaGuardar(this.data).subscribe(result=>{

        console.log(result);
  
       },err =>console.log(err));

      
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
