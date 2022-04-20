import { Component, OnInit } from '@angular/core';
import { NodeServerService } from 'src/app/services/node-server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  id : number;
  vendedor = {
    nombre: '',
    departamento: ''
  }
  calificacion = 0;
  opiniones = 0;

  constructor(private route: ActivatedRoute,
    private _nodeServer: NodeServerService) { }

  ngOnInit(): void {
    this.obtenerIdVendedor();
    this.getCalificacionMedia();
  }


  obtenerIdVendedor() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log('Detalles de vendedor: ' + this.id);
    this.obtenerVendedorDetalle(this.id);
  }

  obtenerVendedorDetalle(id: number) {
    this._nodeServer.getVendedorDetalle(id).subscribe(
      (data) => {
        if (data.exito) {
          console.log(data.mensaje);
          this.vendedor = data.usuario;
        } else {
          console.log(data.mensaje);
        }
      },
      (err) => console.log(err)
    );
  }

  getCalificacionMedia(){
    this._nodeServer.getCalificacionMedia(this.id).subscribe(data => {

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

}
