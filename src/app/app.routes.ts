import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaCategoriaContaBancariaComponent } from './contas-bancarias/categorias/lista-categoria-conta-bancaria/lista-categoria-conta-bancaria.component';
import { CadastroCartoesCreditoComponent } from './cartoes-credito/cadastro-cartoes/cadastro-cartoes-credito.component';
import { CadastroCategoriaContaBancariaComponent } from './contas-bancarias/categorias/cadastro-categoria-conta-bancaria/cadastro-categoria-conta-bancaria.component';
import { EditarCategoriaComponent } from './contas-bancarias/categorias/editar-categoria/editar-categoria.component';
import { ListarCartoesComponent } from './cartoes-credito/listar-cartoes/listar-cartoes.component';
import { EditarCartoesComponent } from './cartoes-credito/editar-cartoes/editar-cartoes.component';
import { ListarCategoriasTransacaoComponent } from './transacoes/categorias/listar-categorias-transacao/listar-categorias-transacao.component';
import { CadastrarCategoriasTransacaoComponent } from './transacoes/categorias/cadastrar-categorias-transacao/cadastrar-categorias-transacao.component';
import { EditarCategoriasTransacaoComponent } from './transacoes/categorias/editar-categorias-transacao/editar-categorias-transacao.component';
import { ListarSubcategoriasTransacaoComponent } from './transacoes/subcategorias/listar-subcategorias-transacao/listar-subcategorias-transacao.component';
import { CadastrarSubcategoriasTransacaoComponent } from './transacoes/subcategorias/cadastrar-subcategorias-transacao/cadastrar-subcategorias-transacao.component';
import { EditarSubcategoriasTransacaoComponent } from './transacoes/subcategorias/editar-subcategorias-transacao/editar-subcategorias-transacao.component';
import { EditarContaBancariaComponent } from './contas-bancarias/contas-bancarias/editar-conta-bancaria/editar-conta-bancaria.component';
import { ListarContasBancariasComponent } from './contas-bancarias/contas-bancarias/listar-contas-bancarias/listar-contas-bancarias.component';
import { PageCadContaBancariaComponent } from './contas-bancarias/contas-bancarias/page-cad-conta-bancaria/page-cad-conta-bancaria.component';
import { CadastrarTransacaoComponent } from './transacoes/transacoes/cadastrar-transacao/cadastrar-transacao.component';
import { ListarTransacaoComponent } from './transacoes/transacoes/listar-transacao/listar-transacao.component';
import { EditarTransacaoComponent } from './transacoes/transacoes/editar-transacao/editar-transacao.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: 'contas', component: ListarContasBancariasComponent },
    { path: 'contas/cadastro', component: PageCadContaBancariaComponent },
    { path: 'contas/editar/:id', component: EditarContaBancariaComponent },

    { path: 'categorias-contas-bancarias', component: ListaCategoriaContaBancariaComponent },
    { path: 'categorias-contas-bancarias/editar/:id', component: EditarCategoriaComponent },
    { path: 'categorias-contas-bancarias/cadastro', component: CadastroCategoriaContaBancariaComponent },

    { path: 'cartoes', component: ListarCartoesComponent },
    { path: 'cartoes/cadastro', component: CadastroCartoesCreditoComponent },
    { path: 'cartoes/editar/:id', component: EditarCartoesComponent  },

    { path: 'categorias-transacao', component: ListarCategoriasTransacaoComponent  },
    { path: 'categorias-transacao/cadastro', component: CadastrarCategoriasTransacaoComponent  },
    { path: 'categorias-transacao/editar/:id', component: EditarCategoriasTransacaoComponent  },

    { path: 'subcategorias-transacao', component: ListarSubcategoriasTransacaoComponent  },
    { path: 'subcategorias-transacao/cadastro', component: CadastrarSubcategoriasTransacaoComponent  },
    { path: 'subcategorias-transacao/editar/:id', component: EditarSubcategoriasTransacaoComponent  },

    { path: 'transacoes', component: ListarTransacaoComponent  },
    { path: 'transacoes/cadastro', component: CadastrarTransacaoComponent  },
    { path: 'transacoes/editar/:id', component: EditarTransacaoComponent  },
];

