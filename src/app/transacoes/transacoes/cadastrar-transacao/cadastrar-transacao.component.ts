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
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-transacao.component.html',
  styleUrl: './cadastrar-transacao.component.css'
})
export class CadastrarTransacaoComponent {
  transacao: TransacaoFormInsert;
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

  //false = saida, true = entrada
  tipoTransacao: boolean = false;

  constructor(
    private router: Router,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
    private transacaoService: TransacaoService,
    private contaBancariaService: ContaBancariaService,
  ) {
    this.transacao = {};
    this.errorMessages = new ErrorMessages()

    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      valor: new FormControl('', [Validators.required, Validators.pattern(/^[+]?\d+(\.\d+)?$/)]),
      status: new FormControl(false),
      tipoTransacao: new FormControl(''),
      dataPrevista: new FormControl(null),
      dataEfetivacao: new FormControl(null),
      idSubcategoriaTransacao: new FormControl({ value: '', disabled: true }, [Validators.required]),
      idCategoriaTransacao: new FormControl('', [Validators.required]),
      idContaBancaria: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
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

  validarConta() {
    if (this.validaConta) {
      this.validaConta = false
    } else {
      this.validaConta = true
    }
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

  onCategoriaChange() {
    this.categoriaId = this.formGroup.get('idCategoriaTransacao')!.value
    this.transacao.idSubcategoriaTransacao = undefined;
    this.carregarSubcategorias();
    this.obterMensagemErro();
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

      this.transacaoService.salvar(this.transacao)
        .subscribe(x => this.router.navigate(['/transacoes'])
        )
    }
  }

  cancelar() {
    this.router.navigate(['/transacoes'])
  }

  validarNumeroPositivo(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value < 0) {
        return { negativo: true };
      }
      return null;
    };
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
}
