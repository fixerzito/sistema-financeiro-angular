import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ContaBancariaFormInsert } from '../../../models/forms/insert/conta-bancaria-form-insert';
import { IconFormInsert } from '../../../models/forms/insert/icon-form-insert';
import { CategoriaContaBancariaDropDown } from '../../../models/dropdowns/categoria-conta-bancaria-dropdown';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { DialogModule } from 'primeng/dialog';
import { CategoriaContaBancariaFormInsert } from '../../../models/forms/insert/categoria-conta-bancaria-form-insert';
import { TooltipModule } from 'primeng/tooltip';
import { ContaBancariaErrorMessages } from '../../../models/errorMessages/ContaBancariaErrorMessages';

@Component({
  selector: 'app-page-cad-conta-bancaria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    DialogModule,
    ReactiveFormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-cad-conta-bancaria.component.html',
  styleUrl: './page-cad-conta-bancaria.component.css'
})
export class PageCadContaBancariaComponent {
  formGroup: FormGroup;
  visibleCadastroCategoria: boolean = false;
  categoriaCadastro: CategoriaContaBancariaFormInsert;
  contaCriada: ContaBancariaFormInsert;
  errorMessages: ContaBancariaErrorMessages;
  visible: boolean = false;
  categorias: CategoriaContaBancariaDropDown[] = [];
  categoria: CategoriaContaBancariaDropDown;

  icons: IconFormInsert[] = [];
  icon: IconFormInsert = {
    nome: ''
  };

  constructor(
    private router: Router,
    private contaBancariaService: ContaBancariaService,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) {
    this.categoriaCadastro = {

    }

    this.contaCriada = {
      nome: '',
      saldo: undefined,
      icon: '',
      idCategoria: 0
    }

    this.categoria = {
      id: 0,
      nome: ''
    }

    this.formGroup = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
      saldo: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required),
      idCategoria: new FormControl(null, Validators.required),
    })

    this.errorMessages = new ContaBancariaErrorMessages()
  }

  ngOnInit() {
    this.buscarCategorias();

    this.icons = [
      { nome: "pi pi-wallet" },
      { nome: "pi pi-money-bill" },
      { nome: "pi pi-chart-line" },
      { nome: "pi pi-briefcase" },
      { nome: "pi pi-check" },
      { nome: "pi pi-times" },
      { nome: "pi pi-user" },
      { nome: "pi pi-home" },
      { nome: "pi pi-credit-card" }
    ];
  }

  showDialog() {
    this.visibleCadastroCategoria = true;
  }

  buscarCategorias() {
    this.categoriaContaBancariaService.consultarDropDown()
      .subscribe(x => {
        this.categorias = x
      });
  }

  salvar() {
    this.obterMensagemErro()

    if (this.formGroup) {
      this.contaCriada = {
        nome: this.formGroup.get('nome')!.value,
        icon: this.formGroup.get('icon')!.value,
        idCategoria: this.formGroup.get('idCategoria')!.value,
        saldo: this.formGroup.get('saldo')!.value,
      }

      this.contaBancariaService.salvar(this.contaCriada)
        .subscribe(x => {
          this.router.navigate(['/contas'])
        })
    }
  }

  cancelar() {
    this.router.navigate(['/contas'])
  }

  obterMensagemErro() {
    const nomeControl = this.formGroup.get('nome');
    const saldoControl = this.formGroup.get('saldo');
    const iconControl = this.formGroup.get('icon');
    const idCategoriaControl = this.formGroup.get('idCategoria');

    if (nomeControl?.hasError('maxlength')) {
      this.errorMessages!.nome = 'O nome da conta deve ter no máximo 100 caracteres.';
    } else if (nomeControl?.hasError('minlength')) {
      this.errorMessages!.nome = 'O nome da conta deve ter no mínimo 1 caracter.';
    } else if (nomeControl?.hasError('required')) {
      this.errorMessages!.nome = 'O nome da conta é obrigatório.';
    } else {
      this.errorMessages!.nome = '';
    }

    if (saldoControl?.hasError('required')) {
      this.errorMessages!.saldo = 'É necessário um valor válido';
    } else {
      this.errorMessages!.saldo = '';
    }

    if (iconControl?.hasError('required')) {
      this.errorMessages!.icon = 'Um icone deve ser selecionado';
    } else {
      this.errorMessages!.icon = '';
    }

    if (idCategoriaControl?.hasError('required')) {
      this.errorMessages!.idCategoria = 'Selecione uma categoria';
    } else {
      this.errorMessages!.idCategoria = '';
    }
  }

  criarCategoria() {
    this.categoriaContaBancariaService.salvar(this.categoriaCadastro)
      .subscribe(x => {
        this.visibleCadastroCategoria = false
        this.buscarCategorias();
        this.contaCriada.idCategoria = x.id!
      })
  }
}
