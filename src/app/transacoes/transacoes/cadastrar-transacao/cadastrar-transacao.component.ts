import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TransacaoFormInsert } from '../../../models/forms/insert/transacao-form-insert';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../models/dropdowns/subcategoria-transacao-dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TransacaoService } from '../../../services/transacao.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ContaBancariaDropdown } from '../../../models/dropdowns/conta-bancaria-dropdown';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { CalendarModule } from 'primeng/calendar';
import { ErrorMessages } from '../Models/errorMessages';
import { InputNumberModule } from 'primeng/inputnumber';
import { TransacaoDropdown } from '../../../models/dropdowns/transacao-dropdown';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TransacaoFormUpdate } from '../../../models/forms/update/transacao-form-update';

@Component({
  selector: 'app-cadastrar-transacao',
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
    CheckboxModule
  ],
  templateUrl: './cadastrar-transacao.component.html',
  styleUrl: './cadastrar-transacao.component.css'
})
export class CadastrarTransacaoComponent {
  transacao: TransacaoFormInsert;
  transacoesDropdown: TransacaoDropdown[];
  transacaoDropdown: TransacaoDropdown;
  formTransacaoClone: FormGroup;
  transacaoClone: TransacaoFormUpdate;
  filteredTransacoesDropdown: TransacaoDropdown[]
  errorMessages: ErrorMessages;
  categoriaId?: number;
  categorias!: CategoriaTransacoesDropdown[]; // TODO: CategoriaTransacaoDropdown
  subcategorias!: SubcategoriaTransacaoDropdown[];
  carregandoSubcategoriasDropdown: boolean = false;
  desabilitadoSubcategoriaDropdown: boolean = true;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaBancariaDropdown[];
  formGroup!: FormGroup;
  visible: boolean = false;

  //false = saida, true = entrada
  tipoTransacao: boolean = false;

  constructor(
    private router: Router,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
    private transacaoService: TransacaoService,
    private contaBancariaService: ContaBancariaService,
  ) {
    this.transacaoDropdown = {};
    this.transacaoClone = {};
    this.transacao = {};
    this.transacoesDropdown = [];
    this.filteredTransacoesDropdown = [];
    this.errorMessages = new ErrorMessages()

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
      tipoTransacao: new FormControl(''),
      dataPrevista: new FormControl(null),
      dataEfetivacao: new FormControl(null),
      idSubcategoriaTransacao: new FormControl({ value: '', disabled: true }, [Validators.required]),
      idCategoriaTransacao: new FormControl('', [Validators.required]),
      idContaBancaria: new FormControl('', [Validators.required])
    });
  }

  resetarCamposFormulario() {
    this.formGroup.setValue({
      nome: '',
      valor: '',
      status: false,
      tipoTransacao: '',
      dataPrevista: null,
      dataEfetivacao: null,
      idSubcategoriaTransacao: { value: '', disabled: true },
      idCategoriaTransacao: '',
      idContaBancaria: ''
    });

    this.fecharModal()
  }

  fecharModal() {
    this.visible = false
  }

  salvarModal(){
    this.carregarCategorias();
    this.categoriaId = this.transacaoClone.idCategoriaTransacao;

    this.carregarSubcategorias();
    this.carregarContasBancarias();
    this.formGroup.patchValue({
      nome: this.formTransacaoClone.get('nome')?.value,
      valor: this.formTransacaoClone.get('valor')?.value,
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
    if (this.categorias != undefined) {
      return
    }

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
      .subscribe(transacao =>  {
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
    this.subcategoriaTransacaoService.consultarDropdown(this.categoriaId!)
      .subscribe(subcategorias => {
        this.carregandoSubcategoriasDropdown = false
        this.subcategorias = subcategorias
        if (subcategorias.length == 0) {
          alert("Nenhuma subcategoria cadastrada")  //TODO: definir para mensagem padrão do sistema
          this.formGroup.get('idSubcategoriaTransacao')?.disable();
          return
        }
        this.formGroup.get('idSubcategoriaTransacao')?.enable();
      });
  }

  onCategoriaChange(event: any) {
    this.categoriaId = this.formGroup.get('idCategoriaTransacao')!.value
    this.transacao.idSubcategoriaTransacao = undefined;
    this.carregarSubcategorias();
    console.log(this.categoriaId);

  }

  atribuirIdConta(id: number) {
    this.transacao.idSubcategoriaTransacao = id;
  }

  salvar() {
    this.obterMensagemErro()
    if (this.formGroup.valid) {

      if (this.formGroup.get('tipoTransacao')?.value == false) {
        //entrada = 1 | saida = 2
        this.transacao.tipoTransacao = 2;
      } else {
        this.transacao.tipoTransacao = 1;
      }

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
        idContaBancaria: this.formGroup.get('idContaBancaria')?.value,
        idSubcategoriaTransacao: this.formGroup.get('idSubcategoriaTransacao')?.value,
        status: this.formGroup.get('status')?.value,
        dataPrevista: this.formGroup.get('dataPrevista')?.value,
        dataEfetivacao: this.formGroup.get('dataEfetivacao')?.value,
      }

      // this.transacaoService.salvar(this.transacao)
      //   .subscribe(x => this.router.navigate(['/transacoes'])
      //   )
    }
  }

  cancelar() {
    this.router.navigate(['/transacoes'])
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
}
