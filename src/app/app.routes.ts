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
import { ListarTransacaoComponent } from './transacoes/transacoes/listar-transacao/listar-transacao.component';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { AutenticacaoComponent } from './login/autenticacao/autenticacao.component';
import { ConfirmarEmailComponent } from './login/confirmar-email/confirmar-email.component';
import { CadastrarSenhaComponent } from './login/cadastrar-senha/cadastrar-senha.component';
import { AuthGuard } from './interceptors/auth.guard';
import { EmailEnviadoComponent } from './login/email-enviado/email-enviado.component';
import { HomeComponent } from './home/home.component';
import { EsqueciSenhaComponent } from './login/redefinir-senhas/esqueci-senha/esqueci-senha.component';
import { RedefinirSenhaComponent } from './login/redefinir-senhas/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full'},
    { path: 'login', component: LoginComponent },
    { path: 'login/cadastro', component: CadastroComponent },
    { path: 'login/autenticacao', component: AutenticacaoComponent },
    { path: 'login/confirmar-email', component: ConfirmarEmailComponent },
    { path: 'login/cadastrar-senha', component: CadastrarSenhaComponent },
    { path: 'login/email-enviado', component: EmailEnviadoComponent },
    { path: 'login/esqueci-minha-senha', component: EsqueciSenhaComponent },
    { path: 'login/redefinir-senha', component: RedefinirSenhaComponent },

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

    { path: 'contas', component: ListarContasBancariasComponent, canActivate: [AuthGuard] },
    { path: 'contas/cadastro', component: PageCadContaBancariaComponent, canActivate: [AuthGuard] },
    { path: 'contas/editar/:id', component: EditarContaBancariaComponent, canActivate: [AuthGuard] },

    { path: 'categorias-contas-bancarias', component: ListaCategoriaContaBancariaComponent, canActivate: [AuthGuard] },
    { path: 'categorias-contas-bancarias/editar/:id', component: EditarCategoriaComponent, canActivate: [AuthGuard] },
    { path: 'categorias-contas-bancarias/cadastro', component: CadastroCategoriaContaBancariaComponent, canActivate: [AuthGuard] },

    { path: 'cartoes', component: ListarCartoesComponent, canActivate: [AuthGuard] },
    { path: 'cartoes/cadastro', component: CadastroCartoesCreditoComponent, canActivate: [AuthGuard] },
    { path: 'cartoes/editar/:id', component: EditarCartoesComponent, canActivate: [AuthGuard]  },

    { path: 'categorias-transacao', component: ListarCategoriasTransacaoComponent, canActivate: [AuthGuard]  },
    { path: 'categorias-transacao/cadastro', component: CadastrarCategoriasTransacaoComponent, canActivate: [AuthGuard]  },
    { path: 'categorias-transacao/editar/:id', component: EditarCategoriasTransacaoComponent, canActivate: [AuthGuard]  },

    { path: 'subcategorias-transacao', component: ListarSubcategoriasTransacaoComponent, canActivate: [AuthGuard]  },
    { path: 'subcategorias-transacao/cadastro', component: CadastrarSubcategoriasTransacaoComponent, canActivate: [AuthGuard]  },
    { path: 'subcategorias-transacao/editar/:id', component: EditarSubcategoriasTransacaoComponent, canActivate: [AuthGuard]  },

    { path: 'transacoes', component: ListarTransacaoComponent  },
];

