import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeServerService {
  
    url='http://localhost:3000';
    //url='https://app-backendingenieria.herokuapp.com';


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

  postRecuperar( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/resetPasswordSolicitud',req_body);
  };

  
  postCambiarContraseniaToken( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/resetPasswordForm/token',req_body);
  };

  postCambiarContraseniaGuardar( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/resetPasswordForm/guardar',req_body);
  };


  getDatosRegistroProducto():Observable<any> {

    return this.http.get(this.url+'/datosregistroProducto');
  };

  postInsertNewProducto( req_body : any, id: number):Observable<any> {

    return this.http.post(this.url+`/insertNewProducto/${id}`,req_body);
  };

  getProductos():Observable<any> {

    return this.http.get(this.url+'/getProductosMuestra');
  };

  getProductosCategoria(id: number):Observable<any> {

    return this.http.get(this.url+`/getProductosCategoria/${id}`);
  };

  getProductoDetalle(id: number):Observable<any> {

    return this.http.get(this.url+`/getProductoDetalle/${id}`);
  };

  getProductosUsuario(id: number):Observable<any> {

    return this.http.get(this.url+`/getProductosUsuario/${id}`);
  };

  getInhabilitarProducto(id: number):Observable<any> {

    return this.http.get(this.url+`/setInhabilitarProducto/${id}`);
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
