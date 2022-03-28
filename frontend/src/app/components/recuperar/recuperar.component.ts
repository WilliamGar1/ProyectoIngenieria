import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { esEmailValido } from './email.helper';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  correo = new FormControl('');
  datos = {};

  constructor(private _nodeServer: NodeServerService
    , private _router : Router) {
  }

  ngOnInit(): void {
    
  }

  recuperar(){
    var correo = this.correo.value;
    this.datos = {
      email:correo
    }
    console.log(this.datos);
    if(!this.correo.valid){
      Swal.fire(
        'Error!',
        'Por favor completar todos los datos',
        'warning',
      );
    }else if(!this.emailValido){
      Swal.fire(
        'Error!',
        'Ingrese un email valido',
        'warning',
      );
    }else{
      this._nodeServer.postRecuperar(this.datos).subscribe(data => {
      console.log(data.mensaje);
      if(data.enviado){

        Swal.fire({
          title: 'Petición recibida',
          text: data.mensaje,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['login'])
          }
        });

      }else{

        Swal.fire(
          'Error!',
          data.mensaje,
          'warning',
        );
      }
     
      }, err => console.log(err));
    }

  }

  get emailValido(){
    return esEmailValido(this.correo.value)
  }

}

