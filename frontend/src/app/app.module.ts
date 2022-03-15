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


//Componentes 
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    LoginComponent,
    FooterComponent,
    RegistroComponent,
    RecuperarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //
    HttpClientModule,
    app_routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
