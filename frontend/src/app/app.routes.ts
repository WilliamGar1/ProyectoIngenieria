import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component"; 
import { LoginComponent } from "./components/login/login.component";
const app_routes: Routes =[
    {path: 'inicio', component: InicioComponent},
    {path:'login', component: LoginComponent},
    {path:'**', pathMatch:'full', redirectTo:'inicio'}
];

export const app_routing =RouterModule.forRoot(app_routes);

