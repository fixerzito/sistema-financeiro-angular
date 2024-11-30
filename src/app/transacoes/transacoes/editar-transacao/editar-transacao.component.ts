import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { ContaBancariaDropdown } from '../../../models/dropdowns/conta-bancaria-dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../models/dropdowns/subcategoria-transacao-dropdown';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { TransacaoService } from '../../../services/transacao.service';
import { TransacaoFormUpdate } from '../../../models/forms/update/transacao-form-update';
import { CalendarModule } from 'primeng/calendar';
import { ErrorMessages } from '../Models/errorMessages';

@Component({
  selector: 'app-editar-transacao',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-transacao.component.html',
  styleUrl: './editar-transacao.component.css'
})
export class EditarTransacaoComponent {
  transacao: TransacaoFormUpdate;
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
    private route: ActivatedRoute,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
    private transacaoService: TransacaoService,
    private contaBancariaService: ContaBancariaService,
  ) {
    this.transacao = {}
    this.errorMessages = new ErrorMessages()

    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      valor: new FormControl('', [Validators.required, Validators.pattern(/^[+]?\d+(\.\d+)?$/)]),
      status: new FormControl(false),
      tipoTransacao: new FormControl(''),
      dataPrevista: new FormControl(null),
      dataEfetivacao: new FormControl(null),
      idSubcategoriaTransacao: new FormControl({ value: '', disabled: false }, [Validators.required]),
      idCategoriaTransacao: new FormControl('', [Validators.required]),
      idContaBancaria: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.transacao.id = +params.get('id')!;
      console.log(this.transacao.id);
      
      this.transacaoService.consultarPorId(this.transacao.id)
        .subscribe(transacao => {
          this.transacao = transacao;
          if (transacao.dataPrevista != null)
            this.transacao.dataPrevista = new Date(transacao.dataPrevista)

          if (transacao.dataEfetivacao != null)
            this.transacao.dataEfetivacao = new Date(transacao.dataEfetivacao)

          if (transacao.tipoTransacao == 1) {
            this.tipoTransacao = true;
          }

          this.carregarContasBancarias();
          this.carregarCategorias();

          console.log(this.transacao.id);
          this.formGroup.setValue({
            nome: transacao.nome,
            valor: transacao.valor,
            tipoTransacao: this.tipoTransacao,
            idContaBancaria: transacao.idContaBancaria,
            idCategoriaTransacao: transacao.idCategoriaTransacao,
            idSubcategoriaTransacao: transacao.idSubcategoriaTransacao,
            status: transacao.status,
            dataPrevista: transacao.dataPrevista,
            dataEfetivacao: transacao.dataEfetivacao,
          })
        });
    });
  }

  carregarCategorias() {
    if (this.categorias != undefined) {
      return
    }

    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias =>
        this.categorias = categorias
      );

    this.carregarSubcategorias()
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
    this.subcategoriaTransacaoService.consultarDropdown(this.transacao.idCategoriaTransacao!)
      .subscribe(subcategorias => {
        this.carregandoSubcategoriasDropdown = false
        this.subcategorias = subcategorias
        if (subcategorias.length == 0) {
          alert("Nenhuma subcategoria cadastrada")  //TODO: definir para mensagem padrão do sistema
          this.desabilitadoSubcategoriaDropdown = true;
          return
        }
        this.desabilitadoSubcategoriaDropdown = false;
      });
  }

  onCategoriaChange() {
    this.transacao.idSubcategoriaTransacao = undefined;
    this.carregarSubcategorias();
  }

  atribuirIdConta(id: number) {
    this.transacao.idSubcategoriaTransacao = id;
  }

  salvar() {
    this.obterMensagemErro()
    if(this.formGroup.valid){
      if (this.formGroup.get('tipoTransacao')?.value == false) {
        //entrada = 1 | saida = 2o
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
        id: this.transacao.id,
        tipoTransacao: this.transacao.tipoTransacao,
        nome: this.formGroup.get('nome')?.value,
        valor: this.formGroup.get('valor')?.value,
        idContaBancaria: this.formGroup.get('idContaBancaria')?.value,
        idSubcategoriaTransacao: this.formGroup.get('idSubcategoriaTransacao')?.value,
        status: this.formGroup.get('status')?.value,
        dataPrevista: this.formGroup.get('dataPrevista')?.value,
        dataEfetivacao: this.formGroup.get('dataEfetivacao')?.value,
      }

      console.log(this.transacao.id);
  
      this.transacaoService.atualizar(this.transacao)
        .subscribe(x => this.router.navigate(['/transacoes'])
        )
    }
  }

  cancelar() {
    this.router.navigate(['/transacoes'])
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
