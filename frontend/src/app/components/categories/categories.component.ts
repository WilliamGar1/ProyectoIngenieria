import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public newCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nameUpdate: new FormControl('', Validators.required)
  });

  categorias = [];
  categoriaId:number;
  nombre:string;


  constructor(
    private _nodeServer: NodeServerService, 
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getCategorias();
  }


  private getCategorias() {
    this._nodeServer.getDatosRegistroProducto()
      .subscribe(data => {
        if (data.exito) {
          console.log(data.mensaje);
          this.categorias = data.categorias;
        }
        else {
          console.log(data.mensaje);
        }
  
      }, err => console.log(err));
  }

  newCategoria(){
    var data = {
      categoria: this.newCategoryForm.value.name
    }
    this._nodeServer.postInsertNewCategoria(data).subscribe(data=>{
      if(data.exito){
        console.log(data.mensaje);
        this.getCategorias();
        Swal.fire(
          ''+data.mensaje,
          '',
          'success',
        );
      }
      else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
    this.newCategoryForm.reset();
  }

  deleteCategoria(id:number){
    Swal.fire({
      text: "¿Desea eliminar esta categoria?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this._nodeServer.deleteCategoria(id).subscribe(data=>{
          if(data.exito){
            console.log(data.mensaje);
            this.getCategorias();
            Swal.fire(
              ''+data.mensaje,
              '',
              'success',
            );
          }
          else{
            console.log(data.mensaje);
          }
        }, err => console.log(err));
      }
    })
  }

  updateCategoriaHelper(id:number, nombre:string){
    this.categoriaId = id;
    this.nombre = nombre;
  }

  updateCategoria(){
    var data = {
      categoriaId:this.categoriaId,
      categoria:this.newCategoryForm.value.nameUpdate
    }
    this._nodeServer.putUpdateCategoria(data).subscribe(data=>{
      if(data.exito){
        console.log(data.mensaje);
        this.getCategorias();
        Swal.fire(
          ''+data.mensaje,
          '',
          'success',
        );
      }
      else{
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
