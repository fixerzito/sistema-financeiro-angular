import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExemploPrimengComponent } from './exemplo-primeng/exemplo-primeng.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'exemplos', component: ExemploPrimengComponent }
];
