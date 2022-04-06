import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { NodeServerService } from "src/app/services/node-server.service";
import { Buffer } from 'buffer';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  id : number;

  nombre: string = "Celular";
  precio: number = 1200;
  descripcion: string =
    `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Repudiandae, possimus? Omnis cumque nesciunt,
      illum earum sint repudiandae assumenda ex exercitationem autem esse saepe ducimus, ad ea molestiae. 
      Voluptate, aliquid libero.`;
  hora = Date.now();
  categoria: string = "Celulares";

  constructor(private route: ActivatedRoute, 
    private _nodeServer: NodeServerService, 
    private _router : Router) {}

  ngOnInit(): void {
    this.obtenerIdProducto();
  }

  obtenerIdProducto(){
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log('Detalles de producto: '+this.id);
    this.obtenerProductoDetalle(this.id);
  }
  
  producto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    Categoria: '',
    actualizacion: '',
    Usuario: ''
  };

  imagenesProducto = [];

  obtenerProductoDetalle(id: number){
    this._nodeServer.getProductoDetalle(id).subscribe(data => {

      if (data.exito) {
        console.log(data.mensaje);
        this.producto = data.producto[0];
        this.imagenesProducto = data.imagenes;
        this.convertirImagenes();
      }
      else {
        console.log(data.mensaje);
      }

    }, err => console.log(err));
  }

  convertirImagenes(){
    this.imagenesProducto.forEach(imagen=>{
      let buff = new Buffer(imagen.Imagen);
      let stringToBase64 = buff.toString('base64');
      let img = 'data:'+imagen.ImagenTipo+';base64,'+stringToBase64;
      imagen.Imagen = img;
    });
  }
}
