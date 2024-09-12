import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadCatContaBancariaComponent } from './cad-cat-conta-bancaria/cad-cat-conta-bancaria.component';
import { PageCadContaBancariaComponent } from './page-cad-conta-bancaria/page-cad-conta-bancaria.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cad-cat-conta-bancaria', component: CadCatContaBancariaComponent },
    { path: 'conta-bancaria', component: PageCadContaBancariaComponent }
];
