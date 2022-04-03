import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NodeServerService } from 'src/app/services/node-server.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categorias: new FormControl('', Validators.required),
  });
  constructor(private router: Router, private location: Location,
    private _nodeServer: NodeServerService, private _router : Router) { }

  ngOnInit(): void {

    this.getDatosRegistroProducto();
    this.comprobarUsuario();
  }
  files = [];
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  producto = {}

  validar() {
    var product = this.formulario.value;
    this.producto = {
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      categoria: product.categorias,
      usuarioId: localStorage.getItem('usuario')
    }
    console.log(this.producto);
    if (!this.formulario.valid || !this.files.length) {
      Swal.fire(
        'ERROR!',
        'Porfavor completar todos los campos',
        'warning',
      );
    } else {
      const formData = new FormData();

      for (let img of this.files) {

        formData.append('imagenesProducto', img);
      }
      this._nodeServer.postInsertNewProducto({ producto: this.producto }, 0).subscribe(result => {
        if (result.exito) {
          this._nodeServer.postInsertNewProducto(formData, result.productoId).subscribe(result => {

            if (result.exito) {
              Swal.fire(
                'Buen Trabajo!',
                result.mensaje,
                'success',
              );

            } else {

              Swal.fire(
                'ERROR!',
                result.mensaje,
                'warning',
              );
            }


          });
        } else {

          Swal.fire(
            'ERROR!',
            result.mensaje,
            'warning',
          );

        }
      });


    }
    this.formulario.reset();
    // this.files.pop();
    while (this.files.length) {
      this.files.pop();
    }


  }

  //Datos registro Producto
  allCategorias = [];


  getDatosRegistroProducto() {

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

  comprobarUsuario(){
    if(!localStorage.getItem('usuario')){
      console.log("Usuario no encontrado");
      Swal.fire(
        'ERROR!',
        'No ha iniciado sesión',
        'warning',
      );
      this._router.navigate(['login']);
    }
  }

}
