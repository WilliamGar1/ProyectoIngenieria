import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import { esEmailValido } from './email.helper';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  datos = {};

  constructor(private _nodeServer: NodeServerService
    , private _router : Router) { }

  ngOnInit(): void {
    this.comprobarUsuario();
    this.crearRegistroForm();
  }

  //datos={ email: "kicof78727@siberpay.com", contrasenia:"asdf"}

  crearRegistroForm(): void{
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      passw: new FormControl("", Validators.required)
    })
  }

  logIn() {

    var usuario = this.loginForm.value;

    this.datos = {
      email: usuario.email,
      contrasenia: usuario.passw
    };

    //console.log(JSON.stringify(this.datos));

    if(!this.emailValido){
      Swal.fire(
        'Error!',
        'Ingrese un email valido',
        'warning',
      );
    }else if(this.loginForm.valid){
      this._nodeServer.postLoginUsuario(this.datos).subscribe(data => {
      
        if(data.acceso){
          localStorage.setItem('usuario', data.usuario.Id);
          localStorage.setItem('tipo', data.usuario.TipoUsuario);
          //console.log(data.usuario);
          if(parseInt(localStorage.getItem('tipo'))==1){
            this._router.navigate(['registrarProducto']);
          }else if(parseInt(localStorage.getItem('tipo'))==2){
            this._router.navigate(['adminProductos']);
          }
        }else{
          //console.log(data.acceso);
          Swal.fire(
            'Error!',
            data.mensaje,
            'warning',
          );
        }
  
      }, err => console.log(err));
    }else{
      Swal.fire(
        'Error!',
        'Por favor completar todos los datos',
        'warning',
      );
    }

  }

  get emailValido(){
    return esEmailValido(this.loginForm.get('email').value)
  }

  comprobarUsuario(){
    if(localStorage.getItem('usuario')){
      //console.log("Ya se ha iniciado sesión");
      Swal.fire(
        '',
        'Ya se tiene una sesión activa',
        'warning',
      );
      this._router.navigate(['inicio']);
    }
  }
  
}
