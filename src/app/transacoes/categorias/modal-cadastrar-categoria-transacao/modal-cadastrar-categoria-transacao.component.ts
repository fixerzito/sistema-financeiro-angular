import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoFormInsert } from '../../../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { DialogModule } from 'primeng/dialog';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';
import { ValidatorRecorrencia } from '../../../models/validators/validator-recorrencia';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { finalize } from 'rxjs';
import { CategoriaTransacaoCadastroRapidoFormInsert } from '../../../models/forms/insert/categoria-transacao-cadastro-rapido-form-insert';
import { CategoriaTransacaoCadastroRapidoFormInsertResponse } from '../../../models/forms/insert/categoria-transacao-cadastro-rapido-form-insert-response';

@Component({
  selector: 'app-modal-cadastrar-categoria-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputIconModule,
    IconFieldModule
  ],
  templateUrl: './modal-cadastrar-categoria-transacao.component.html',
  styleUrl: './modal-cadastrar-categoria-transacao.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ModalCadastrarCategoriaTransacaoComponent {
  @Input() dialogVisivel: boolean;
  @Output() cadastroFinalizado: EventEmitter<string>;
  @Output() categoriaSubcategoriaGerada: EventEmitter<CategoriaTransacaoCadastroRapidoFormInsertResponse>;
  formGroup!: FormGroup;
  recorrenciaCategoria?: boolean;
  recorrenciaSubcategoria?: boolean;
  mensagemErroCategoria?: string;
  mensagemErroSubcategoria?: string;
  loadingValidationCategoriaNome: boolean = false;

  constructor(
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) {
    this.mensagemErroCategoria = ''
    this.cadastroFinalizado = new EventEmitter();
    this.categoriaSubcategoriaGerada = new EventEmitter<CategoriaTransacaoCadastroRapidoFormInsertResponse>();
    this.dialogVisivel = false;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nomeCategoria: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      nomeSubcategoria: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria: CategoriaTransacaoCadastroRapidoFormInsert = {
        nome: this.formGroup.value.nomeCategoria,
        subcategoria: this.formGroup.value.nomeSubcategoria,
      };
      if (!this.recorrenciaCategoria) {
        this.categoriaTransacaoService.cadastroRapido(categoria)
          .subscribe(response => {
            this.categoriaSubcategoriaGerada.emit(response)
          
            this.fecharDialog()
          });
      } else {
        this.mensagemErroCategoria = 'Categoria já cadastrada'
      }
    }
    this.obterMensagemErroNome()
  }

  validarNomeCategoriaNaoUtilizado() {
    const categoria: CategoriaTransacaoFormInsert = {
      nome: this.formGroup.value.nomeCategoria
    };
    this.loadingValidationCategoriaNome = true;
    this.categoriaTransacaoService.consultarRecorrencia(categoria)
      .pipe(finalize(() => this.loadingValidationCategoriaNome = false))
      .subscribe(x => {
        this.recorrenciaCategoria = x.existe
        if (this.recorrenciaCategoria) {
          this.mensagemErroCategoria = 'Categoria já cadastrada'
        } else {
          this.mensagemErroCategoria = ''
        }
      })
  }

  protected fecharDialog() {
    this.cadastroFinalizado.emit("Finalizado");
    this.formGroup.setValue({
      nomeCategoria: '',
      nomeSubcategoria: '',
    })
    this.dialogVisivel = false;
  }

  cancelar() {
    this.fecharDialog()
  }

  obterMensagemErroNome() {
    const nomeCategoria = this.formGroup.get('nomeCategoria');
    const nomeSubcategoria = this.formGroup.get('nomeSubcategoria');

    if (nomeCategoria?.hasError('maxlength')) {
      this.mensagemErroCategoria = 'O nome da categoria deve ter no máximo 100 caracteres.';
    }

    if (nomeCategoria?.hasError('required')) {
      this.mensagemErroCategoria = 'O nome da categoria é obrigatório.';
    }

    if (nomeSubcategoria?.hasError('maxlength')) {
      this.mensagemErroSubcategoria = 'O nome da subcategoria deve ter no máximo 100 caracteres.';
    }

    if (nomeSubcategoria?.hasError('required')) {
      this.mensagemErroSubcategoria = 'O nome da subcategoria é obrigatório.';
    }
  }
}
