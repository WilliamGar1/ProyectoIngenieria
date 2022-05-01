import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(
    private _nodeServer: NodeServerService, 
    private _router : Router
  ) { }

  denuncias = []

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getDenuncias();
  }

  private getDenuncias(){
    this._nodeServer.getDenuncias()
      .subscribe(data => {
        this.denuncias = data.denuncias;
        //console.log(this.denuncias);
      })
  }

  tacharDenuncia(id:number){
    var data = {
      denunciaId:id
    }
    Swal.fire({
      text: "¿Desea mover esta denuncia a resueltas?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._nodeServer.putTacharDenuncia(data).subscribe(data => {
          if(data.exito){
            console.log(data.mensaje);
            this.getDenuncias();
            Swal.fire(
              ''+data.mensaje,
              '',
              'success',
            );
          }else {
            console.log(data.mensaje);
          }
        }, err => console.log(err));
      }
    });
  }

  banearUsuario(id:number){
    var data = {
      usuarioId:id
    }
    Swal.fire({
      text: "¿Desea deshabilitar este vendedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._nodeServer.postDeshabilitarUsuario(data).subscribe(data => {
          if(data.exito){
            console.log(data.mensaje);
            this.getDenuncias();
            Swal.fire(
              ''+data.mensaje,
              '',
              'success',
            );
          }else {
            console.log(data.mensaje);
          }
        }, err => console.log(err));
      }
    });
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
