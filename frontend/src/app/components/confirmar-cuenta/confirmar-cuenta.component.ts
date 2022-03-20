import { Component, OnInit } from '@angular/core';
import { NodeServerService } from 'src/app/services/node-server.service';

import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.css']
})
export class ConfirmarCuentaComponent implements OnInit {

  constructor(private _nodeServer: NodeServerService
              ,private _activateRoute: ActivatedRoute
              , private _router : Router) { }

  ngOnInit(): void {

    this.postConfirmarCuentaToken();
  }


  postConfirmarCuentaToken(){

    this._activateRoute.params.subscribe( token =>{


      this._nodeServer.postconfirmarCuenta(token).subscribe(result=>{

        console.log(result);
  
     
  
       },err =>console.log(err));

       this._router.navigate(['login']);
    });
 
  
  };
}
