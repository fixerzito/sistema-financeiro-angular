import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    DialogModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-cad-conta-bancaria.component.html',
  styleUrl: './page-cad-conta-bancaria.component.css'
})
export class PageCadContaBancariaComponent {
  visibleCadastroCategoria: boolean = false;
  categoriaCadastro: CategoriaContaBancariaFormInsert;
  contaCriada: ContaBancariaFormInsert = {
    nome: '',
    saldo: 0,
    icon: '',
    idCategoria: 0
  };

  visible: boolean = false;

  categorias: CategoriaContaBancariaDropDown[] = [];
  categoria: CategoriaContaBancariaDropDown = {
    id: 0,
    nome: ''
  };

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
    this.contaCriada.icon = this.icon.nome;

    this.contaBancariaService.salvar(this.contaCriada)
      .subscribe(x => {
        this.router.navigate(['/contas'])
      })

  }

  cancelar() {
    this.router.navigate(['/contas'])
  }

  criarCategoria(){
    this.categoriaContaBancariaService.salvar(this.categoriaCadastro)
      .subscribe(x => {
        this.visibleCadastroCategoria = false
        this.buscarCategorias();
        this.contaCriada.idCategoria = x.id!
      })
  }
}
