import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoFormInsert } from '../../../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';

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
  categoria: CategoriaTransacaoFormInsert = {
    nome: ''
  };

  constructor(
    private router: Router,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) {

  }
  salvar() {
    this.categoriaTransacaoService.salvar(this.categoria)
      .subscribe(x => this.router.navigate(['/categorias-transacao'])
      )
  }
}
