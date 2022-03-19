import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl()
  passw = new FormControl();

  constructor(private _nodeServer: NodeServerService
    , private _router : Router) { }

  ngOnInit(): void {
  }

  datos={ email: "kicof78727@siberpay.com", contrasenia:"asdf"}

  logIn() {

    this._nodeServer.postLoginUsuario(this.datos).subscribe(data => {
      
      if(data.acceso){
        console.log(data.usuario);
        this._router.navigate(['Inicio']);
      }else{
        Swal.fire(
          'Error!',
          'Usuario o contraseña incorrecta',
          'warning',
        );
      }

    }, err => console.log(err));
  }
  
}
