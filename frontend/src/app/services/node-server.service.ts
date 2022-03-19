import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeServerService {
  
  url='http://localhost:3000';


  constructor(private http:HttpClient) { }


  getDatosRegistro():Observable<any> {

    return this.http.get(this.url+'/datosregistro');
  };

  postInsertNewUser( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/insertNewUser',req_body);
  };

  postconfirmarCuenta( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/confirmarcuenta',req_body);
  };

  postLoginUsuario( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/loginUsuario',req_body);
  };




  //prueba get
  getNodeServer():Observable<any> {

    return this.http.get(this.url);
  };

  //prueba post
  postNodeServer( req_body : any ):Observable<any> {

    return this.http.post(this.url,req_body);
  };
 
}
