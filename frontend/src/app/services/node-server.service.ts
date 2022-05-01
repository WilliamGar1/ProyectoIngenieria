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

  getInfoUsuario(id: number):Observable<any> {

    return this.http.get(this.url+`/infoUsuario/${id}`);
  };

  
  getVendedorDetalle(id: number):Observable<any> {

    return this.http.get(this.url+`/detallesVendedor/${id}`);
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

  //PRODUCTOS
  postInsertNewProducto( req_body : any, id: number):Observable<any> {

    return this.http.post(this.url+`/insertNewProducto/${id}`,req_body);
  };

  getProductos():Observable<any> {

    return this.http.get(this.url+'/getProductosMuestra');
  };

  getProductosAdmin():Observable<any> {

    return this.http.get(this.url+'/getProductosAdmin');
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

  //SUSCRIPCIONES 
  getSubscripcionesCliente(id: number):Observable<any> {

    return this.http.get(this.url+`/suscripcionesCliente/${id}`);
  };

  postInscribirCategoria( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/suscribirCategoria',req_body);
  };

  postcancelarSuscripcion( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/cancelarSuscripcion',req_body);
  };

  //CALIFICACIONES
  getCalificacionMedia(id: number):Observable<any> {

    return this.http.get(this.url+`/getCalificacionMedia/${id}`);
  };

  postCalificarVendedor( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/calificarVendedor',req_body);
  };

  postDenunciarVendedor( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/recibirDenuncia',req_body);
  };
  
  //CHATS
  getChatsPersona(id: number):Observable<any> {

    return this.http.get(this.url+`/chatPersonas/${id}`);
  };

  getMensajesPersona(usuarioId: number, personaId: number):Observable<any> {

    return this.http.get(this.url+`/mensajesPersona/${usuarioId}/${personaId}`);
  };

  postEnviarMensaje( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/enviarMensaje',req_body);
  };
  
  postBorrarMensajes( req_body : any ):Observable<any> {

    return this.http.post(this.url+'/borrarChat',req_body);
  };

  //DENUNCIAS

  getDenuncias(): Observable<any> {
    return this.http.get(this.url + '/getDenuncias');
  }

  getDenunciasResueltas(): Observable<any> {
    return this.http.get(this.url + '/getDenunciasResueltas');
  }

  putTacharDenuncia( req_body : any ):Observable<any> {
    
    return this.http.put(this.url+'/tacharDenuncia',req_body);
  }


  //CATEGORIAS

  postInsertNewCategoria( req_body : any ):Observable<any> {
    
    return this.http.post(this.url+'/insertNewCategoria',req_body);
  }

  deleteCategoria( id : number ):Observable<any> {
    
    return this.http.delete(this.url+`/eliminarCategoria/${id}`);
  }

  putUpdateCategoria( req_body : any ):Observable<any> {
    
    return this.http.put(this.url+'/actualizarCategoria',req_body);
  }

  //ADMINISTRADOR
  
  postDeshabilitarUsuario( req_body : any ):Observable<any> {
    
    return this.http.post(this.url+'/desHabilitarUsuario',req_body);
  }

  //ESTADISTICAS
  
  getStatByDepto(): Observable<any> {
    return this.http.get(this.url + '/statspordepto');
  }

  getStatByCat(): Observable<any> {
    return this.http.get(this.url + '/statsporcat');
  }

  getBestUsers(id: number):Observable<any> {

    return this.http.get(this.url+`/bestUsers/${id}`);
  };

  //FAVORITOS

  postAgregarFavorito( req_body : any ):Observable<any> {
    
    return this.http.post(this.url+'/agregarDeseo',req_body);
  }

  postEliminarFavorito_2( req_body : any ):Observable<any> {
    
    return this.http.post(this.url+'/eliminarDeseo_2',req_body);
  }

  postEstadoDeseo( req_body : any ):Observable<any> {
    
    return this.http.post(this.url+'/estadoDeseo',req_body);
  }

  getFavoritos(id: number):Observable<any> {

    return this.http.get(this.url+`/listaDeseoProductos/${id}`);
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
