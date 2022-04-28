import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';

//Ruta
import { app_routing } from './app.routes';
import { NgxDropzoneModule } from 'ngx-dropzone';


//Componentes 
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { FormContraseComponent } from './components/form-contrase/form-contrase.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MisProductosComponent } from './components/mis-productos/mis-productos.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { AdminProductosComponent } from './components/admin-productos/admin-productos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    LoginComponent,
    FooterComponent,
    RegistroComponent,
    RecuperarComponent,
    FormContraseComponent,
    RegistrarProductoComponent,
    ProductosComponent,
    MisProductosComponent,
    ProductDetailComponent,
    ProfileComponent,
    SellerProfileComponent,
    ChatComponent,
    FavoritosComponent,
    AdminProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
