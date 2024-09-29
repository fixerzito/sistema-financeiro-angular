import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadCatContaBancariaComponent } from './cad-cat-conta-bancaria/cad-cat-conta-bancaria.component';
import { PageCadContaBancariaComponent } from './contas-bancarias/page-cad-conta-bancaria/page-cad-conta-bancaria.component';
import { ListaCategoriaContaBancariaComponent } from './categorias/lista-categoria-conta-bancaria/lista-categoria-conta-bancaria.component';
import { CadastroCartoesCreditoComponent } from './cartoes-credito/cadastro-cartoes/cadastro-cartoes-credito.component';
import { CadastroCategoriaContaBancariaComponent } from './categorias/cadastro-categoria-conta-bancaria/cadastro-categoria-conta-bancaria.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { ListarContasBancariasComponent } from './contas-bancarias/listar-contas-bancarias/listar-contas-bancarias.component';
import { EditarContaBancariaComponent } from './contas-bancarias/editar-conta-bancaria/editar-conta-bancaria.component';
import { ListarCartoesComponent } from './cartoes-credito/listar-cartoes/listar-cartoes.component';
import { EditarCartoesComponent } from './cartoes-credito/editar-cartoes/editar-cartoes.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'contas', component: ListarContasBancariasComponent },
    { path: 'contas/cad-contas', component: PageCadContaBancariaComponent },
    { path: 'contas/editar/:id', component: EditarContaBancariaComponent },
    { path: 'categorias', component: ListaCategoriaContaBancariaComponent },
    { path: 'categorias/editar-categoria/:id', component: EditarCategoriaComponent },
    { path: 'categorias/cadastro', component: CadastroCategoriaContaBancariaComponent },
    { path: 'cartoes', component: ListarCartoesComponent },
    { path: 'cartoes/cadastro', component: CadastroCartoesCreditoComponent },
    { path: 'cartoes/editar/:id', component: EditarCartoesComponent  }
];

