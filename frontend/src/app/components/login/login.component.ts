import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl()
  passw = new FormControl();

  constructor() { }

  ngOnInit(): void {



  }

  datos={ email: "",

contraseña=""}

  this._nodeServer.postlogin(this.datos).subscribe(result => {
  
    if(!result.acceso){

      console.log(result.mensaje);
      this._router.navigate(['inicio']);

    }else{

      console.log(result.mensaje);
      this._router.navigate(['registro']);
    }


  }, err => console.log(err));
}
