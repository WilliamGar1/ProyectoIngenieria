import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component"; 
import { LoginComponent } from "./components/login/login.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { RecuperarComponent } from "./components/recuperar/recuperar.component";
import  { FormContraseComponent } from "./components/form-contrase/form-contrase.component";
import { RegistrarProductoComponent } from "./components/registrar-producto/registrar-producto.component";
import {ProductosComponent} from "./components/productos/productos.component";
import {MisProductosComponent} from "./components/mis-productos/mis-productos.component";


const app_routes: Routes =[
    {path: 'inicio', component: InicioComponent},
    {path: 'form-contrase', component: FormContraseComponent},
    {path:'login/registro', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/recuperar', component: RecuperarComponent},
    {path: 'registrarProducto', component: RegistrarProductoComponent},
    {path: 'Producto', component: ProductosComponent},
    {path: 'misProductos', component: MisProductosComponent},
    {path:'**', pathMatch:'full', redirectTo:'inicio'}
];

export const app_routing =RouterModule.forRoot(app_routes);

