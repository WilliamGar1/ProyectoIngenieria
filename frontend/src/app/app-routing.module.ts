import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarCuentaComponent } from './components/confirmar-cuenta/confirmar-cuenta.component';
import { FormContraseComponent } from './components/form-contrase/form-contrase.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path:'login' ,component: LoginComponent},
  {path:'registro' ,component: RegistroComponent},
  {path:'confirmarCuenta/:token' ,component: ConfirmarCuentaComponent},
  {path:'resetPasswordForm/:token' ,component:FormContraseComponent },
  {path:'inicio' ,component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
