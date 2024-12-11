import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoFormInsert } from '../../../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { DialogModule } from 'primeng/dialog';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';

@Component({
  selector: 'app-modal-cadastrar-categoria-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  templateUrl: './modal-cadastrar-categoria-transacao.component.html',
  styleUrl: './modal-cadastrar-categoria-transacao.component.css'
})
export class ModalCadastrarCategoriaTransacaoComponent {
  @Input() dialogVisivel: boolean;
  @Output() cadastroFinalizado: EventEmitter<string>;
  @Output() idCategoriaGerado: EventEmitter<number>;
  @Output() idSubcategoriaGerado: EventEmitter<number>;
  formGroup!: FormGroup;
  mensagemErroCategoria?: string;
  mensagemErroSubcaategoria?: string;

  constructor(
    private categoriaTransacaoService: CategoriaTransacaoService,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
  ) {
    this.mensagemErroCategoria = ''
    this.cadastroFinalizado = new EventEmitter();
    this.idCategoriaGerado = new EventEmitter<number>();
    this.idSubcategoriaGerado = new EventEmitter<number>();
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
      const categoria: CategoriaTransacaoFormInsert = {
        nome: this.formGroup.value.nomeCategoria
      };
      this.categoriaTransacaoService.salvar(categoria)
      .subscribe(response => {
        this.idCategoriaGerado.emit(response.id)
        const subcategoria: SubcategoriaTransacaoFormInsert = {
          nome: this.formGroup.value.nomeSubcategoria,
          categoria: response.id!
        }
        this.subcategoriaTransacaoService.salvar(subcategoria)
          .subscribe(responseSubcategoria => {
            this.idSubcategoriaGerado.emit(responseSubcategoria.id)
          })
        this.fecharDialog()
      });
    }
    this.obterMensagemErroNome()
  }

  protected fecharDialog(){
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
      this.mensagemErroCategoria =  'O nome da categoria deve ter no máximo 100 caracteres.';
    }

    if (nomeCategoria?.hasError('required')) {
      this.mensagemErroCategoria = 'O nome da categoria é obrigatório.';
    }

    if (nomeSubcategoria?.hasError('maxlength')) {
      this.mensagemErroSubcaategoria = 'O nome da subcategoria deve ter no máximo 100 caracteres.';
    } 
    
    if (nomeSubcategoria?.hasError('required')) {
      this.mensagemErroSubcaategoria = 'O nome da subcategoria é obrigatório.';
    } 
  }
}
