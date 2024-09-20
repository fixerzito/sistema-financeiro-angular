import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  id: number
  nome: string,
  saldo?: number | null,
  icon: string,
  idCategoria: number
};

@Component({
  selector: 'app-editar-conta-bancaria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './editar-conta-bancaria.component.html',
  styleUrl: './editar-conta-bancaria.component.css'
})
export class EditarContaBancariaComponent {
  //form
  contaCriada: Conta = {
    id: -1,
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.httpClient.get<Conta>(`http://localhost:3000/contas/${id}`)
        .subscribe(contaRecebida => {
          this.contaCriada = contaRecebida;
          this.icon = this.icons.find(icon => icon.nome === contaRecebida.icon) || { nome: '' };
          this.buscarCategoriaPorId(contaRecebida.idCategoria)
          console.log(this.categoria);
        });
    });
    
  }

  buscarCategorias() {
    this.httpClient.get<Array<Categoria>>('http://localhost:3000/categorias').subscribe(x => {
      this.categorias = x
    });
  }

  buscarCategoriaPorId(id: number) {
  this.httpClient.get<Categoria>(`http://localhost:3000/categorias/${id}`).subscribe(x => {
      this.categoria = x
    });
  }

  salvar() {
    this.contaCriada.idCategoria = this.categoria.id;
    this.contaCriada.icon = this.icon.nome;

    this.httpClient.put<Conta>(`http://localhost:3000/contas/${this.contaCriada.id}`, this.contaCriada).subscribe(() => {
      this.router.navigate(['/contas'])
    })

  }

  cancelar() {
    this.router.navigate(['contas'])
  }

}
