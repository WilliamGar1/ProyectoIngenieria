import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import { Buffer } from 'buffer';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NewChatService } from 'src/app/services/new-chat.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  denuncia = new FormGroup({
    motivo: new FormControl('', Validators.required),
  });

  calificacion = new FormGroup({
    estrella1: new FormControl('1'),
    estrella2: new FormControl('2'),
    estrella3: new FormControl('3'),
    estrella4: new FormControl('4'),
    estrella5: new FormControl('5'),
  });

  id: number;
  marcado:boolean=false
  nombre: string = 'Celular';
  precio: number = 1200;
  descripcion: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
      Repudiandae, possimus? Omnis cumque nesciunt,
      illum earum sint repudiandae assumenda ex exercitationem autem esse saepe ducimus, ad ea molestiae. 
      Voluptate, aliquid libero.`;
  hora = Date.now();
  categoria: string = 'Celulares';

  constructor(
    private route: ActivatedRoute,
    private _nodeServer: NodeServerService,
    private _router: Router,
    private newChat: NewChatService
  ) {}

  ngOnInit(): void {
    this.obtenerIdProducto();
  }

  obtenerIdProducto() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log('Detalles de producto: ' + this.id);
    this.obtenerProductoDetalle(this.id);
  }

  producto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    Categoria: '',
    actualizacion: '',
    Usuario: '',
    UsuarioId: 0
  };

  imagenesProducto = [];

  obtenerProductoDetalle(id: number) {
    this._nodeServer.getProductoDetalle(id).subscribe(
      (data) => {
        if (data.exito) {
          console.log(data.mensaje);
          this.producto = data.producto[0];
          this.imagenesProducto = data.imagenes;
          this.convertirImagenes();
        } else {
          console.log(data.mensaje);
        }
      },
      (err) => console.log(err)
    );
  }

  convertirImagenes() {
    this.imagenesProducto.forEach((imagen) => {
      let buff = new Buffer(imagen.Imagen);
      let stringToBase64 = buff.toString('base64');
      let img = 'data:' + imagen.ImagenTipo + ';base64,' + stringToBase64;
      imagen.Imagen = img;
    });
  }

  calificarVendedor(calif: number){
    if(!localStorage.getItem('usuario')){
      console.log("Usuario no encontrado");
      Swal.fire(
        'ERROR!',
        'Debe iniciar sesión para calificar',
        'warning',
      );
      this._router.navigate(['login']);
    }else{
      var data = {
        vendedorId: this.producto.UsuarioId,
        clienteId: parseInt(localStorage.getItem('usuario')),
        calificacion: calif
      }
      this._nodeServer.postCalificarVendedor(data).subscribe(data => {
        if (data.exito) {
          console.log(data.mensaje);
          Swal.fire(
            '',
            data.mensaje,
            'success',
          );
        }
        else {
          console.log(data.mensaje);
        }
  
      }, err => console.log(err));
    }
    
  }

  denunciarVendedor(){
    var data = {
      vendedorId: this.producto.UsuarioId,
      clienteId: parseInt(localStorage.getItem('usuario')),
      detalle: this.denuncia.value.motivo
    }
    this._nodeServer.postDenunciarVendedor(data).subscribe(data => {
      if (data.exito) {
        console.log(data.mensaje);
      }
      else {
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  iniciarChat(chatPersona: string, chatPersonaId: number){
    this.newChat.addNewChat(chatPersona,chatPersonaId);
    this._router.navigate(['chat']);
  }

  validar() {
    if(!localStorage.getItem('usuario')){
      console.log("Usuario no encontrado");
      Swal.fire(
        'ERROR!',
        'Debe iniciar sesión para calificar',
        'warning',
      );
      this._router.navigate(['login']);
    }else{
      if (!this.denuncia.valid) {
        Swal.fire('Error!', 'Por favor ingrese el motivo', 'warning');
      } else {
        this.denunciarVendedor();
        Swal.fire('¡Excelente!', 'Su denuncia a sido enviada', 'success');
        this.denuncia.reset();
      }
    }
  }

  get user() {
    return parseInt(localStorage.getItem('tipo')) === 1 ? true : false;
  }

  favoritos(){
    if(this.marcado==false){
      this.marcado=true
    }else{
      this.marcado=false
    }
  }
}
