import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Usuario: number;
  calificacion = 0;
  opiniones = 0;
  allCategorias = [];
  categoria = new FormControl();
  suscripciones = [];
  usuario = {
    nombre: '',
    apellido: '',
    departamento: '',
    email: '',
    telefono: ''
  }

  constructor(private _nodeServer: NodeServerService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getCategorias();
    this.getSubscripcionesCliente();
    this.getCalificacionMedia();
  }

  subscribirCategoria(){
    console.log(this.categoria.value);
    var datos = {
      clienteId: this.Usuario,
      categoriaId: this.categoria.value
    }
    console.log(datos);
    this._nodeServer.postInscribirCategoria(datos).subscribe(data => {
      if (data.exito) {
        Swal.fire(
          ''+data.mensaje,
          '',
          'success',
        );
        this.getSubscripcionesCliente();
        console.log(data.mensaje);
      }
      else {
        Swal.fire(
          ''+data.mensaje,
          '',
          'info',
        );
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  cancelarSuscripcion(id : number){
    var datos = {
      clienteId: this.Usuario,
      categoriaId: id
    }

    Swal.fire({
      text: "¿Desea eliminar esta suscripción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._nodeServer.postcancelarSuscripcion(datos).subscribe(data => {
          if (data.exito) {
            console.log(data.mensaje);
            this.getSubscripcionesCliente();
            Swal.fire(
              'Suscripción cancelada',
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

  getUsuario(){
    this.Usuario = parseInt(localStorage.getItem('usuario'));
    this._nodeServer.getInfoUsuario(this.Usuario).subscribe(data => {
      if (data.exito) {
        console.log(data.mensaje);
        this.usuario = data.usuario;
      }
      else {
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  getSubscripcionesCliente() {

    this._nodeServer.getSubscripcionesCliente(this.Usuario).subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.suscripciones = data.suscripciones;
      }
      else {
        console.log(data.mensaje);
        this.suscripciones = [];
      }

    }, err => console.log(err));
  }

  getCalificacionMedia(){
    this._nodeServer.getCalificacionMedia(this.Usuario).subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.opiniones = data.cantidad;
        this.calificacion = data.CalificacionMedia*2;
      }
      else {
        console.log(data.mensaje);
      }

    }, err => console.log(err));
  }

  getCategorias() {

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

}
