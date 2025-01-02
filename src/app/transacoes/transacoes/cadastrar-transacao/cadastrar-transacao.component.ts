import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoriaTransacaoDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { ContaBancariaDropdown } from '../../../models/dropdowns/conta-bancaria-dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../models/dropdowns/subcategoria-transacao-dropdown';
import { TransacaoDropdown } from '../../../models/dropdowns/transacao-dropdown';
import { TransacaoFormInsert } from '../../../models/forms/insert/transacao-form-insert';
import { TransacaoFormUpdate } from '../../../models/forms/update/transacao-form-update';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { TransacaoService } from '../../../services/transacao.service';
import { TransactionErrorMessages } from '../models/transactionErrorMessages';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { ModalCadastrarCategoriaTransacaoComponent } from '../../categorias/modal-cadastrar-categoria-transacao/modal-cadastrar-categoria-transacao.component';
import { ModalCadastrarSubcategoriaTransacaoComponent } from "../../subcategorias/modal-cadastrar-subcategoria/modal-cadastrar-subcategoria.component";
import { CategoriaTransacaoCadastroRapidoFormInsertResponse } from '../../../models/forms/insert/categoria-transacao-cadastro-rapido-form-insert-response';

@Component({
  selector: 'app-cadastrar-despesa',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DialogModule,
    CheckboxModule,
    ToggleButtonModule,
    InputGroupModule,
    ModalCadastrarCategoriaTransacaoComponent,
    ModalCadastrarSubcategoriaTransacaoComponent
],
  templateUrl: './cadastrar-transacao.component.html',
  styleUrl: './cadastrar-transacao.component.css'
})
export class CadastrarDespesaComponent {
  @ViewChild(ModalCadastrarCategoriaTransacaoComponent) modalCadastrarCategoriaTransacaoComponent!: ModalCadastrarCategoriaTransacaoComponent;
  @ViewChild(ModalCadastrarSubcategoriaTransacaoComponent) modalCadastrarSubcategoriaTransacaoComponent!: ModalCadastrarSubcategoriaTransacaoComponent;
  modalCadastrarCategoriaTransacaoVisivel: boolean;
  modalCadastrarSubcategoriaTransacaoVisivel: boolean;

  @Input() dialogVisivel: boolean;
  @Input() tituloDialog: string;
  @Input() tipoTransacao: number;
  @Output() cadastroFinalizado: EventEmitter<string>;

  idEntradaExistente?: number;

  transacao: TransacaoFormInsert;
  transacoesDropdown: TransacaoDropdown[];
  transacaoDropdown: TransacaoDropdown;
  formTransacaoClone: FormGroup;
  transacaoClone: TransacaoFormUpdate;
  filteredTransacoesDropdown: TransacaoDropdown[]
  errorMessages: TransactionErrorMessages;
  categoriaId?: number;
  categorias!: CategoriaTransacaoDropdown[]; // TODO: CategoriaTransacaoDropdown
  subcategorias!: SubcategoriaTransacaoDropdown[];
  carregandoSubcategoriasDropdown: boolean = false;
  desabilitadoSubcategoriaDropdown: boolean = true;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaBancariaDropdown[];
  formGroup!: FormGroup;
  visible: boolean = false;

  protected fecharDialogo() {
    this.reset();
    this.cadastroFinalizado.emit("Finalizado");
  }

  constructor(
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
    private transacaoService: TransacaoService,
    private contaBancariaService: ContaBancariaService,
  ) {
    this.modalCadastrarCategoriaTransacaoVisivel = false;
    this.modalCadastrarSubcategoriaTransacaoVisivel = false;
    this.tipoTransacao = 0;
    this.dialogVisivel = false;
    this.cadastroFinalizado = new EventEmitter();
    this.tituloDialog = "Cadastro de Despesa";

    this.transacaoDropdown = {};
    this.transacaoClone = {};
    this.transacao = {};
    this.transacoesDropdown = [];
    this.filteredTransacoesDropdown = [];
    this.errorMessages = new TransactionErrorMessages()

    this.formTransacaoClone = new FormGroup({
      nome: new FormControl(''),
      valor: new FormControl(''),
      catSubcat: new FormControl(''),
      contaBancaria: new FormControl(''),
    });

    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      valor: new FormControl('', Validators.required),
      status: new FormControl(false),
      dataPrevista: new FormControl(null),
      dataEfetivacao: new FormControl(null),
      idSubcategoriaTransacao: new FormControl({ value: '', disabled: true }, [Validators.required]),
      idCategoriaTransacao: new FormControl('', [Validators.required]),
      idContaBancaria: new FormControl('', [Validators.required])
    });
  }

  reset() {
    this.formGroup.setValue({
      nome: '',
      valor: '',
      status: false,
      dataPrevista: null,
      dataEfetivacao: null,
      idCategoriaTransacao: '',
      idSubcategoriaTransacao: '',
      idContaBancaria: ''
    });
    this.categoriaId = undefined;
  }

  resetarCamposFormulario() {
    this.reset()
    this.fecharModal()
  }

  fecharModal() {
    this.visible = false
  }

  salvarModal() {
    this.carregarCategorias();
    this.categoriaId = this.transacaoClone.idCategoriaTransacao;

    this.carregarSubcategorias();
    this.carregarContasBancarias();
    this.formGroup.patchValue({
      nome: this.formTransacaoClone.get('nome')?.value[0],
      valor: this.formTransacaoClone.get('valor')?.value[0],
      idCategoriaTransacao: this.transacaoClone.idCategoriaTransacao,
      idSubcategoriaTransacao: this.transacaoClone.idSubcategoriaTransacao,
      idContaBancaria: this.transacaoClone.idContaBancaria,
    });

    this.fecharModal()
  }

  ngOnInit() {
    this.transacaoService.consultarDropdown()
      .subscribe(transacoes => this.transacoesDropdown = transacoes);

    this.transacao.status = false;
  }

  carregarCategorias() {
    // if (this.categorias != undefined) {
    //   return
    // }

    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias =>
        this.categorias = categorias
      );
  }

  carregarContasBancarias() {
    if (this.contasDropdown != undefined) {
      return
    }

    this.contaBancariaService.getAllDropdown()
      .subscribe(contas =>
        this.contasDropdown = contas
      );
  }

  abrirModal() {
    this.transacaoDropdown = this.formGroup.get('nome')?.value;
    this.transacaoClone!.id = this.transacaoDropdown.id;
    this.transacaoService.consultarPorId(this.transacaoClone.id!)
      .subscribe(transacao => {
        this.transacaoClone = transacao;
      })
    this.visible = true;
  }

  validarConta() {
    if (this.validaConta) {
      this.validaConta = false
    } else {
      this.validaConta = true
    }
  }

  filtrarTransacoes(event: AutoCompleteCompleteEvent) {
    let filtered: TransacaoDropdown[] = [];
    let query = event.query;

    for (let i = 0; i < this.transacoesDropdown.length; i++) {
      let transacaoBuscada = this.transacoesDropdown[i];
      if (transacaoBuscada!.nome!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(transacaoBuscada);
      }
    }
    this.filteredTransacoesDropdown = filtered;
  }

  carregarSubcategorias() {
    this.carregandoSubcategoriasDropdown = true
    this.subcategoriaTransacaoService.consultarDropdown(this.formGroup.get('idCategoriaTransacao')!.value)
      .subscribe(subcategorias => {
        this.carregandoSubcategoriasDropdown = false
        this.subcategorias = subcategorias
        if (subcategorias.length == 0) {
          this.formGroup.get('idSubcategoriaTransacao')?.disable();
          return
        }
        this.formGroup.get('idSubcategoriaTransacao')?.enable();
      });
  }

  onCategoriaChange(event: any) {
    this.categoriaId = this.formGroup.get('idCategoriaTransacao')!.value
    this.formGroup.patchValue({
      idSubcategoriaTransacao: undefined
    });
    this.carregarSubcategorias();
  }

  atribuirIdConta(id: number) {
    this.transacao.idContaBancaria = id;
  }

  salvar() {
    this.obterMensagemErro()
    if (this.formGroup.valid) {
      if (!this.transacao.dataPrevista) {
        this.transacao.dataPrevista = null;
      }

      if (!this.transacao.dataEfetivacao) {
        this.transacao.dataEfetivacao = null;
      }

      if (this.transacao.status == true) {
        this.transacao.dataEfetivacao = new Date();
      }

      this.transacao = {
        nome: this.formGroup.get('nome')?.value,
        valor: this.formGroup.get('valor')?.value,
        tipoTransacao: this.tipoTransacao,
        idContaBancaria: this.formGroup.get('idContaBancaria')?.value,
        idSubcategoriaTransacao: this.formGroup.get('idSubcategoriaTransacao')?.value,
        status: this.formGroup.get('status')?.value,
        dataPrevista: this.formGroup.get('dataPrevista')?.value,
        dataEfetivacao: this.formGroup.get('dataEfetivacao')?.value,
      }

      if (this.idEntradaExistente) {
        this.transacao.id = this.idEntradaExistente;
        this.transacaoService.atualizar(this.transacao)
          .subscribe(x => this.dialogVisivel = false)
      }

      if (!this.idEntradaExistente && this.tipoTransacao == 1) {
        this.transacaoService.cadastrarReceita(this.transacao)
          .subscribe(x => this.dialogVisivel = false)
      } else if (!this.idEntradaExistente && this.tipoTransacao == 2) {
        this.transacaoService.cadastrarDespesa(this.transacao)
          .subscribe(x => this.dialogVisivel = false)
      }

    }
  }

  cancelar() {
    this.reset()
    this.dialogVisivel = false
  }

  evitarNumeroNegativo(event: any) {
    let value = event.target.value;
    if (value < 0) {
      event.target.value = 0;  // Impede que o número seja negativo
    }
  }

  obterMensagemErro() {
    const nomeControl = this.formGroup.get('nome');
    const idSubcategoriaTransacaoControl = this.formGroup.get('idSubcategoriaTransacao');
    const idCategoriaTransacaoControl = this.formGroup.get('idCategoriaTransacao');
    const valorControl = this.formGroup.get('valor');
    const idContaBancariaControl = this.formGroup.get('idContaBancaria');

    if (nomeControl?.hasError('maxlength')) {
      this.errorMessages!.nome = 'O nome da transação deve ter no máximo 100 caracteres.';
    } else if (nomeControl?.hasError('required')) {
      this.errorMessages!.nome = 'O nome da transação é obrigatório.';
    } else {
      this.errorMessages!.nome = '';
    }

    if (idSubcategoriaTransacaoControl?.hasError('required')) {
      this.errorMessages!.idSubcategoriaTransacao = 'É necessário selecionar uma subcategoria';
    } else {
      this.errorMessages!.idSubcategoriaTransacao = '';
    }

    if (idCategoriaTransacaoControl?.hasError('required')) {
      this.errorMessages!.idCategoriaTransacao = 'É necessário selecionar uma categoria';
    } else {
      this.errorMessages!.idCategoriaTransacao = '';
    }

    if (idContaBancariaControl?.hasError('required')) {
      this.errorMessages!.idContaBancaria = 'É necessário selecionar uma conta bancária';
    } else {
      this.errorMessages!.idContaBancaria = '';
    }

    if (valorControl?.hasError('required')) {
      this.errorMessages!.valor = 'Valor deve ser preenchido';
    } else {
      this.errorMessages!.valor = '';
    }
  }

  filterNotNumberKeys(event: any) {
    if (event.key == '-') {
      event.preventDefault();
    }
  }

  public carregarEntradaExistente(id: number) {
    this.idEntradaExistente = id;
    this.tituloDialog = "Editar transação"
    this.transacaoService.consultarPorId(this.idEntradaExistente).subscribe({
      next: entradaLista => {
        this.categoriaId = entradaLista.idCategoriaTransacao
        this.preencherFormularioEditar(entradaLista)
      },
      error: erro => {
        alert("Não foi possível carregar a entrada")
        console.error(erro);
      }
    })
  }

  preencherFormularioEditar(transacao: TransacaoFormUpdate) {
    this.carregarContasBancarias();
    this.carregarSubcategorias()
    this.carregarCategorias();
    this.formGroup.setValue({
      nome: transacao.nome,
      valor: transacao.valor,
      status: transacao.status,
      dataPrevista: transacao.dataPrevista ? new Date(transacao.dataPrevista) : null,
      dataEfetivacao: transacao.dataEfetivacao ? new Date(transacao.dataEfetivacao) : null,
      idCategoriaTransacao: transacao.idCategoriaTransacao,
      idSubcategoriaTransacao: transacao.idSubcategoriaTransacao,
      idContaBancaria: transacao.idContaBancaria
    });
  }

  //-------------------------------

  dialogCategoriaTransacao() {
    this.modalCadastrarCategoriaTransacaoVisivel = true;
  }

  fecharDialogCategoriaTransacao(mensagem: string) {
    this.modalCadastrarCategoriaTransacaoVisivel = false;
  }

  fecharDialogSubcategoriaTransacao(mensagem: string) {
    this.modalCadastrarSubcategoriaTransacaoVisivel = false;
  }

  dialogSubcategoriaTransacao() {
    if(this.formGroup.get('idCategoriaTransacao')!.value != ''){
      this.modalCadastrarSubcategoriaTransacaoVisivel = true;
    } else {
      this.modalCadastrarCategoriaTransacaoVisivel = true;
    } 
  }

  receberIdCategoriaGerado(response: CategoriaTransacaoCadastroRapidoFormInsertResponse) {
    this.formGroup.patchValue({
      idCategoriaTransacao: response.idCategoria,
      idSubcategoriaTransacao: response.idSubcategoria 
    })
    this.carregarCategorias()
    this.carregarSubcategorias()
  }

  receberIdSubcategoriaGerado(novoId: number) {
    this.carregarSubcategorias()
    this.formGroup.patchValue({
      idSubcategoriaTransacao: novoId
    })
  }
}
