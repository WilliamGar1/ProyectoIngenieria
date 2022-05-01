import { Component, OnInit } from '@angular/core';
import { NodeServerService } from 'src/app/services/node-server.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  
  constructor(private _nodeServer: NodeServerService) { }

  allProductos = [];

  ngOnInit(): void {
    this.getFavoritos();
  }

  getFavoritos(){
    if(parseInt(localStorage.getItem('tipo'))==1){
      this._nodeServer.getFavoritos(parseInt(localStorage.getItem('usuario'))).subscribe(data=>{
        if(data.exito){
          console.log(data.mensaje);
          this.allProductos = data.productos;
          this.convertirImagenes();
        }else{
          console.log(data.mensaje);
        }
      }, err => console.log(err));
    }
  }

  convertirImagenes(){
    this.allProductos.forEach(producto=>{
      let buff = new Buffer(producto.Imagen);
      let stringToBase64 = buff.toString('base64');
      let imagen = 'data:'+producto.ImagenTipo+';base64,'+stringToBase64;
      producto.Imagen = imagen;
    });
  }
 
}
