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

@Component({
  selector: 'app-modal-cadastrar-subcategoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule
  ],
  templateUrl: './modal-cadastrar-subcategoria.component.html',
  styleUrl: './modal-cadastrar-subcategoria.component.css'
})
export class ModalCadastrarSubcategoriaTransacaoComponent {
  @Input() dialogVisivel: boolean;
  @Input() idCategoriaRecebido: number;
  @Output() cadastroFinalizado: EventEmitter<string>;
  @Output() idSubcategoriaGerado: EventEmitter<number>;
  formGroup!: FormGroup;
  mensagemErroSubcategoria?: string;

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
        categoria: this.idCategoriaRecebido
      };
      this.subcategoriaTransacaoService.salvar(subcategoria)
      .subscribe(response => {
        this.idSubcategoriaGerado.emit(response.id)
        this.fecharDialog()
      });
    }
    this.obterMensagemErroNome()
  }

  protected fecharDialog(){
    this.cadastroFinalizado.emit("Finalizado");
    this.formGroup.setValue({
      nomeSubcategoria: '',
    })
    this.dialogVisivel = false;
  }

  cancelar() {
    this.fecharDialog()
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
