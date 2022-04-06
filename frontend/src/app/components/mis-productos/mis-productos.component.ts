import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { forEachChild } from 'typescript';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  idUsuario : number;
  allProductos = [];

  constructor(private _nodeServer: NodeServerService
    , private _router : Router) { }

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getProductosUsuario();
  }

  getProductosUsuario(){
    this._nodeServer.getProductosUsuario(this.idUsuario).subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.allProductos = data.productos;
        this.convertirImagenes();
        console.log(this.allProductos);
      }
      else {
        console.log(data.mensaje);
        this.allProductos = [];
      }

    }, err => console.log(err));
  }

  convertirImagenes(){
    this.allProductos.forEach(producto=>{
      let buff = new Buffer(producto.Imagen);
      let stringToBase64 = buff.toString('base64');
      let imagen = 'data:'+producto.ImagenTipo+';base64,'+stringToBase64;
      producto.Imagen = imagen;
    });
  }

  eliminarProducto(producto : any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminara el producto: "+producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Inhabilitando producto: '+producto.Id);
        this._nodeServer.getInhabilitarProducto(producto.Id).subscribe(data => {

          if (data.exito) {
            console.log(data.mensaje);
            this.getProductosUsuario();
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
        'ERROR!',
        'No ha iniciado sesión',
        'warning',
      );
      this._router.navigate(['login']);
    }else{
      this.idUsuario = parseInt(localStorage.getItem('usuario'));
      console.log('Usuario: '+this.idUsuario);
    }
  }

}
