import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component"; 
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { RecuperarComponent } from "./components/recuperar/recuperar.component";
import  { FormContraseComponent } from "./components/form-contrase/form-contrase.component";


const app_routes: Routes =[
    {path: 'inicio', component: InicioComponent},
    {path: 'form-contrase', component: FormContraseComponent},
    {path:'login/registro', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/recuperar', component: RecuperarComponent},
    {path:'**', pathMatch:'full', redirectTo:'inicio'}
];

export const app_routing =RouterModule.forRoot(app_routes);

