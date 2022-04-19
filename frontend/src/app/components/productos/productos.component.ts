import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import { forEachChild } from 'typescript';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  formulario = new FormGroup({
    categorias: new FormControl(''),
  });

  id: number = 0;

  constructor(private _nodeServer: NodeServerService, private _router : Router) { }

  ngOnInit(): void {
    this.getDatosProductos();
    this.getProductos();
  }

  allCategorias = [];

  getDatosProductos() {

    this._nodeServer.getDatosRegistroProducto().subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.allCategorias = data.categorias;
      }
      else {
        console.log(data.mensaje);
      }

    }, err => console.log(err));
  }

  allProductos = [];
  getProductos(){
    this._nodeServer.getProductos().subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.allProductos = data.productos;
        this.verificarProductos();
        this.convertirImagenes();
      }
      else {
        console.log(data.mensaje);
      }

    }, err => console.log(err));
  }

  getProductosCategoria(id : number){
    console.log('Productos de categoria: '+id);
    this._nodeServer.getProductosCategoria(id).subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.allProductos = data.productos;
        this.verificarProductos();
        this.convertirImagenes();
      }
      else {
        console.log(data.mensaje);
        this.allProductos=[];
        Swal.fire(
          'Ups!',
          'No hay productos de esa categoría',
          'warning',
        );
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

  verificarProductos(){
    if(localStorage.getItem('usuario')){
      var usuario = parseInt(localStorage.getItem('usuario'));
      this.allProductos.forEach((producto, index) =>{
        if(producto.personaId==usuario){
          this.allProductos.splice(index, 1);
        }
      });
    }
  }

  cargarProductos(){
    let id = this.formulario.value.categorias;
    if(id == 0){
      this.getProductos();
    }else{
      this.getProductosCategoria(id);
    }
  }
}
