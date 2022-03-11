import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NodeServerService } from 'src/app/services/node-server.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user={};
  nodeRES = '[vacio]';

  nombre = new FormControl();
  apellido= new FormControl();
  email = new FormControl();
  passw = new FormControl();
  municipio = new FormControl();
  departamento = new FormControl();
  telefono = new FormControl();
  direccion = new FormControl();
  

  constructor(private _nodeServer: NodeServerService ) { }

  postPrueba(){

    this.user = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      email: this.email.value,
      passw: this.passw.value,
      municipio: this.municipio.value,
      departamento: this.departamento.value,
      telefono: this.telefono.value,
      direccion: this.direccion.value
      
     };

     console.log(this.user);

     this._nodeServer.postNodeServer(this.user).subscribe(result=>{

      console.log(result);
      this.nodeRES ='\n ' + result.respuesta;

     },err =>console.log(err));
  
  };

  getPrueba(){

    this._nodeServer.getNodeServer().subscribe(data=>{
      console.log(data);
      this.nodeRES ='\n ' + data.server;
    },err =>console.log(err));
  }


  ngOnInit(): void {

   this.getPrueba();
  }




}
