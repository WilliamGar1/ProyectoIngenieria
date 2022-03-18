'use strict'

import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import { passwordMatchValidator } from './passw.helper';
import { esEmailValido } from './email.helper';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;

  user = {};
  nodeRES = '[vacio]';

  constructor(private _nodeServer: NodeServerService) {  }

  postPrueba(): void {

    /*this.user = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      email: this.email.value,
      passw: this.passw.value,
      municipio: this.municipio.value,
      departamento: this.departamento.value,
      telefono: this.telefono.value,
      direccion: this.direccion.value

    };*/

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

    //console.log(this.user);

    if (this.registroForm.valid && this.emailValido) {

      this._nodeServer.postNodeServer(this.user).subscribe(result => {
  
        console.log(result);
        this.nodeRES = '\n ' + result.respuesta;
  
      }, err => console.log(err));
    }else{
      alert('Ingrese todos los datos necesarios');
    }


  };

  getPrueba() {

    this._nodeServer.getNodeServer().subscribe(data => {
      console.log(data);
      this.nodeRES = data.server;
    }, err => console.log(err));
  }


  ngOnInit(): void {

    this.crearRegistroForm();

    //this.getPrueba();
  }


  crearRegistroForm(): void{
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      passw: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      departamento: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      passw2: new FormControl('', Validators.required)
    }, passwordMatchValidator)
  }


  get passw2ConfirmIsValid() {
    return this.registroForm.get('passw2').valid;
  }

  get PasswIsValid() {
    return this.registroForm.get('passw').valid;
  }

  get emailValido(){
    return esEmailValido(this.registroForm.get('email').value)
  }
}
