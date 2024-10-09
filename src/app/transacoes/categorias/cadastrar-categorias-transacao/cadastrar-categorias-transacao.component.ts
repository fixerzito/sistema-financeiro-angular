import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacoesInsert } from '../../../models/forms/insert/categoria-transacoes-insert';
import { CategoriasTransacoesService } from '../../../services/categorias-transacao.service';

@Component({
  selector: 'app-cadastrar-categorias-transacao',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './cadastrar-categorias-transacao.component.html',
  styleUrl: './cadastrar-categorias-transacao.component.css'
})
export class CadastrarCategoriasTransacaoComponent {
  categoria: CategoriaTransacoesInsert = {
    nome: ''
  };

  constructor(
    private router: Router,
    private categoriasTransacoesService: CategoriasTransacoesService,
  ) {

  }
  salvar() {
    this.categoriasTransacoesService.salvar(this.categoria)
      .subscribe(x => this.router.navigate(['/categorias-transacao'])
      )
  }
}
