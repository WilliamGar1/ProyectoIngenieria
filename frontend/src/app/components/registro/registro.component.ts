'use strict'

import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import { passwordMatchValidator, esContraValida } from './passw.helper';
import { esEmailValido } from './email.helper';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;

  user = {};


  constructor(private _nodeServer: NodeServerService
    , private _router : Router) {  }

  postPrueba(): void {

    var usuario = this.registroForm.value;

    this.user = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      passw: usuario.passw,
      municipio: usuario.municipio,
      departamento: usuario.departamento,
      telefono: usuario.telefono,
      direccion: usuario.direccion

    };

    console.log(JSON.stringify(this.user));

    if (this.registroForm.valid && this.emailValido && this.contraValida) {

      this._nodeServer.postInsertNewUser(this.user).subscribe(result => {
  
        if(result.guardado){

          //console.log(result.mensaje);
          Swal.fire({
            title: 'Usuario registrado',
            text: "Puede activar su usuario desde el enlace enviado a su correo electronico",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this._router.navigate(['login'])
            }
          });

        }else{
          console.log(result.mensaje);
          this._router.navigate(['registro']);
          Swal.fire(
            'Error!',
            result.mensaje,
            'warning',
          );
        }
    
  
      }, err => console.log(err));
    }else{
      Swal.fire(
        'Error!',
        'Por favor completar el registro con todo los datos',
        'warning',
      );
    }


  };

  

//Datos registro
allDepartamentos=[];
allMunicipios=[];

  getDatosRegistro() {

    this._nodeServer.getDatosRegistro().subscribe(data => {
   
      this.allDepartamentos = data.departamentos;
      this.allMunicipios = data.municipios;

    }, err => console.log(err));
  }


  ngOnInit(): void {

    this.crearRegistroForm();
    this.getDatosRegistro();
  }


  crearRegistroForm(): void{
    this.registroForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      passw: new FormControl("", Validators.required),
      municipio: new FormControl("", Validators.required),
      departamento: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required),
      direccion: new FormControl("", Validators.required),
      passw2: new FormControl("", Validators.required),
      termino: new FormControl(false, Validators.requiredTrue)
    }, passwordMatchValidator)
  }

  marcar(){
    console.log('presionando');
    this.registroForm.get('termino').setValue(true);
  }


  get passw2ConfirmIsValid() {
    return this.registroForm.get('passw2').valid;
  }

  get PasswIsValid() {
    return this.registroForm.get('passw').valid;
  }

  get emailValido(){
    return esEmailValido(this.registroForm.get('email').value);
  }

  get filterMuni(){

    var muni = this.allMunicipios.filter(e => {
      return e.departamentoId == this.registroForm.get('departamento').value;
    });

    return muni;
  }

  get contraValida(){
    return esContraValida(this.registroForm.get('passw').value);
  }
}

//this.registroForm.get('departamento').value
