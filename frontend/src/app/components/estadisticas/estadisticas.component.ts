import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeServerService } from 'src/app/services/node-server.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  view: [number,number] = [700, 400];
  view2: [number,number] = [700, 400];
  // Primer gráfico
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  //SegundoGráfico
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient2: boolean = false;
  showLegend2: boolean = true;
  legendPosition: any = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Categorías';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Cantidad de Productos';
  schemeType: any = 'linear';

  //Tercer Gráfico
  showXAxis2: boolean = true;
  showYAxis2: boolean = true;
  gradient3: boolean = false;
  showLegend3: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel2: string = 'Usuarios';
  showYAxisLabel2: boolean = true;
  yAxisLabel2: string = 'Calificación';
  legendTitle: string = 'Estrellas'


  single = [];

  multi = [];

  multi2 = [];
  
  constructor(private _nodeServer: NodeServerService, 
    private _router : Router) {
   // Object.assign(this, { single });
   }

  ngOnInit(): void {
    this.comprobarUsuario();
    this.getEstadisticasDepto();
    this.getEstadisticasCategoria();
    this.getEstadisticasUsuario();
  }

  getEstadisticasDepto(){
    this._nodeServer.getStatByDepto().subscribe(data =>{
      if(data.exito){
        console.log(data.mensaje);
        this.single = data.estadisticas;
      }else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  getEstadisticasCategoria(){
    this._nodeServer.getStatByCat().subscribe(data =>{
      if(data.exito){
        console.log(data.mensaje);
        this.multi = [];
        data.estadisticas.forEach(estadistica => {
          let item = {
            "name": estadistica.name,
            "series": 
            [
              {
                "name": "Productos",
                "value": estadistica.value
              }
            ]
          }
          this.multi.push(item);
        });
      }else{
        console.log(data.mensaje);
      }
    }, err => console.log(err));
  }

  getEstadisticasUsuario(){
    this._nodeServer.getBestUsers(3).subscribe(data=>{
      if(data.exito){
        console.log(data.mensaje);
        this.multi2 = [];
        data.estadisticas.forEach(estadistica =>{
          let item = {
            "name": estadistica.name,
            "series": 
            [
              {
                "name": "Estrellas",
                "value": estadistica.value
              }
            ]
          }
          this.multi2.push(item);
        });
      }else{
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

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
