import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaints-history',
  templateUrl: './complaints-history.component.html',
  styleUrls: ['./complaints-history.component.css']
})
export class ComplaintsHistoryComponent implements OnInit {

  constructor(private _nodeServer: NodeServerService, 
    private _router : Router) { }

  denuncias = []

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getDenunciasResueltas();
  }

  private getDenunciasResueltas(){
    this._nodeServer.getDenunciasResueltas()
      .subscribe(data => {
        if(data.exito){
          this.denuncias = data.denuncias;
          console.log(data.mensaje);
        }else{
          console.log(data.mensaje);
        }
        
      }, err => console.log(err));
  }

  comprobarUsuario(){
    if(!localStorage.getItem('usuario')){
      console.log("Usuario no encontrado");
      Swal.fire(
        '',
        'No ha iniciado sesión',
        'warning',
      );
      this._router.navigate(['login']);
    }else if(parseInt(localStorage.getItem('tipo'))!=2){
      //console.log("Ya se ha iniciado sesión");
      Swal.fire(
        '',
        'No tiene permisos para acceder a esta sección',
        'warning',
      );
      this._router.navigate(['inicio']);
    }
  }

}
