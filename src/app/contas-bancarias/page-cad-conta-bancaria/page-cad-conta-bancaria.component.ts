import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

interface Categoria {
  id: number,
  nome: string;
}

interface Icon {
  nome: string
}

interface Conta {
  nome: string,
  saldo?: number | null,
  icon: string,
  idCategoria: number
};

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
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-cad-conta-bancaria.component.html',
  styleUrl: './page-cad-conta-bancaria.component.css'
})
export class PageCadContaBancariaComponent {
  //form
  contaCriada: Conta = {
    nome: '',
    saldo: null,
    icon: '',
    idCategoria: 0
  };

  //

  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  categorias: Categoria[] = [];
  categoria: Categoria = {
    id: 0,
    nome: ''
  };

  icons: Icon[] = [];
  icon: Icon = {
    nome: ''
  };

    constructor(
      private httpClient: HttpClient,
      private router: Router
    ){}

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

  buscarCategorias(){
  this.httpClient.get<Array<Categoria>>('http://localhost:3000/categorias').subscribe(x => {
    this.categorias = x
  });
  }

  salvar(){
    this.contaCriada.idCategoria = this.categoria.id; 
    this.contaCriada.icon = this.icon.nome;
    
    this.httpClient.post('http://localhost:3000/contas', this.contaCriada).subscribe(x => {
      this.router.navigate(['/contas'])
    })
    
  }

  cancelar(){
    this.router.navigate(['/contas'])
  }
}
