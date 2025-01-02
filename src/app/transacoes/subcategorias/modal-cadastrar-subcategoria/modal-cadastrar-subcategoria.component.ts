import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoFormInsert } from '../../../models/forms/insert/categoria-transacao-form-insert';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { ValidatorRecorrencia } from '../../../models/validators/validator-recorrencia';
import { finalize } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-modal-cadastrar-subcategoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './modal-cadastrar-subcategoria.component.html',
  styleUrl: './modal-cadastrar-subcategoria.component.css'
})
export class ModalCadastrarSubcategoriaTransacaoComponent {
  @Input() dialogVisivel: boolean;
  @Input() idCategoriaRecebido: number;
  @Output() cadastroFinalizado: EventEmitter<string>;
  @Output() idSubcategoriaGerado: EventEmitter<number>;

  recorrenciaSubcategoria?: boolean;
  formGroup!: FormGroup;
  mensagemErroSubcategoria?: string;
  loadingValidationSubcategoriaNome: boolean = false;

  constructor(
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
  ) {
    this.idCategoriaRecebido = 0;
    this.mensagemErroSubcategoria = ''
    this.cadastroFinalizado = new EventEmitter();
    this.idSubcategoriaGerado = new EventEmitter<number>();
    this.dialogVisivel = false;
  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nomeSubcategoria: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const subcategoria: SubcategoriaTransacaoFormInsert = {
        nome: this.formGroup.value.nomeSubcategoria,
        idCategoria: this.idCategoriaRecebido
      };
      if (!this.recorrenciaSubcategoria) {
        this.subcategoriaTransacaoService.salvar(subcategoria)
          .subscribe(response => {
            this.idSubcategoriaGerado.emit(response.id)
            this.fecharDialog()
          });
      } else {
        this.mensagemErroSubcategoria = 'Subcategoria já cadastrada'
      }
    }
    this.obterMensagemErroNome()
  }

  protected fecharDialog() {
    this.cadastroFinalizado.emit("Finalizado");
    this.formGroup.setValue({
      nomeSubcategoria: '',
    })
    this.dialogVisivel = false;
  }

  cancelar() {
    this.fecharDialog()
  }

  validarNomeSubcategoriaNaoUtilizado() {
    const subcategoria: SubcategoriaTransacaoFormInsert = {
      nome: this.formGroup.value.nomeSubcategoria,
      idCategoria: this.idCategoriaRecebido
    };
    this.loadingValidationSubcategoriaNome = true;
    this.subcategoriaTransacaoService.consultarRecorrencia(subcategoria)
      .pipe(finalize(() => this.loadingValidationSubcategoriaNome = false))
      .subscribe(x => {
        this.recorrenciaSubcategoria = x.existe
        if (this.recorrenciaSubcategoria) {
          this.mensagemErroSubcategoria = 'Subcategoria já cadastrada'
        } else {
          this.mensagemErroSubcategoria = ''
        }
      })
  }

  obterMensagemErroNome() {
    const nomeSubcategoria = this.formGroup.get('nomeSubcategoria');

    if (nomeSubcategoria?.hasError('maxlength')) {
      this.mensagemErroSubcategoria = 'O nome da subcategoria deve ter no máximo 100 caracteres.';
    }

    if (nomeSubcategoria?.hasError('required')) {
      this.mensagemErroSubcategoria = 'O nome da subcategoria é obrigatório.';
    }
  }
}
