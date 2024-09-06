import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExemploPrimengComponent } from './exemplo-primeng/exemplo-primeng.component';
import { ExemploPrimeng2Component } from './exemplo-primeng-2/exemplo-primeng-2.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'exemplos', component: ExemploPrimengComponent },
    { path: 'exemplos2', component: ExemploPrimeng2Component }
];
