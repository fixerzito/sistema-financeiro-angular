import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoFormInsert } from '../../../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-categorias-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-categorias-transacao.component.html',
  styleUrl: './cadastrar-categorias-transacao.component.css'
})
export class CadastrarCategoriasTransacaoComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) {

  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria: CategoriaTransacaoFormInsert = {
        nome: this.formGroup.value.nome
      };
      this.categoriaTransacaoService.salvar(categoria)
        .subscribe(() => this.router.navigate(['/categorias-transacao']));
    }
  }

  cancelar() {
    this.router.navigate(['/categorias-transacao'])
  }

  obterMensagemErroNome() {
    const nomeControl = this.formGroup.get('nome');

    if (nomeControl?.hasError('maxlength')) {
      return 'O nome da categoria deve ter no máximo 100 caracteres.';
    }

    if (nomeControl?.hasError('required')) {
      return 'O nome da categoria é obrigatório.';
    }

    return '';
  }
}
