import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadCatContaBancariaComponent } from './cad-cat-conta-bancaria/cad-cat-conta-bancaria.component';
import { PageCadContaBancariaComponent } from './page-cad-conta-bancaria/page-cad-conta-bancaria.component';
import { ListaCategoriaContaBancariaComponent } from './categorias/lista-categoria-conta-bancaria/lista-categoria-conta-bancaria.component';
import { CadastroCartoesCreditoComponent } from './cadastro-cartoes-credito/cadastro-cartoes-credito.component';
import { CadastroCategoriaContaBancariaComponent } from './categorias/cadastro-categoria-conta-bancaria/cadastro-categoria-conta-bancaria.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'categorias/cadastro', component: CadastroCategoriaContaBancariaComponent },
    // { path: 'categorias/cadastro', component: CadCatContaBancariaComponent },
    { path: 'contas', component: PageCadContaBancariaComponent },
    { path: 'categorias', component: ListaCategoriaContaBancariaComponent },
    { path: 'cad-cartao-credito', component: CadastroCartoesCreditoComponent }
];
