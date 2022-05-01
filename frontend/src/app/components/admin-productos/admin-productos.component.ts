import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  constructor(private _nodeServer: NodeServerService, 
    private _router : Router) { }

  allProductos = [];
  
  ngOnInit(): void {
    this.comprobarUsuario();
    this.getProductos();
  }

  
  getProductos(){
    this._nodeServer.getProductosAdmin().subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.allProductos = data.productos;
        this.calcularDías();
        //console.log(this.allProductos);
      }
      else {
        console.log(data.mensaje);
      }

    }, err => console.log(err));
  }

  calcularDías(){
    let currentDate = new Date();
    this.allProductos.forEach((producto)=>{
      let productDate = new Date(producto.creacion);
      let days = currentDate.getTime() - productDate.getTime();
      days = Math.round(days/(1000*60*60*24));
      producto.actualizacion = days;
    });
  }

  inhabilitarProducto(id:number){
    console.log('inahabilitar producto: '+id);
    Swal.fire({
      title: 'Estas seguro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._nodeServer.getInhabilitarProducto(id).subscribe(data => {

          if (data.exito) {
            console.log(data.mensaje);
            this.getProductos();
            Swal.fire(
              'Producto eliminado',
              '',
              'success',
            );
          }
          else {
            console.log(data.mensaje);
          }

        }, err => console.log(err));
      }
    })
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
