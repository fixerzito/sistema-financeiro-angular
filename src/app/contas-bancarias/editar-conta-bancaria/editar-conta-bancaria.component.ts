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
  categoriaExistente?: Categoria;

  icons: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buscarCategorias();

    this.icons = [
       "pi pi-wallet",
       "pi pi-money-bill",
       "pi pi-chart-line",
       "pi pi-briefcase",
       "pi pi-check",
       "pi pi-times",
       "pi pi-user",
       "pi pi-home",
       "pi pi-credit-card"
    ];

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.httpClient.get<Conta>(`http://localhost:3000/contas/${id}`)
        .subscribe(contaRecebida => {
          this.contaCriada = contaRecebida;
          debugger;
          this.categoriaExistente = this.filterCategoriaPorId(this.contaCriada.idCategoria);
          // this.buscarCategoriaPorId(contaRecebida.idCategoria)
          console.log(this.contaCriada);         
        });
    });
  }

  buscarCategorias() {
    this.httpClient.get<Array<Categoria>>('http://localhost:3000/categorias').subscribe(x => {
      this.categorias = x
    });
  }

  salvar() {

    this.httpClient.put<Conta>(`http://localhost:3000/contas/${this.contaCriada.id}`, this.contaCriada).subscribe(() => {
      this.router.navigate(['/contas'])
    })

  }

  cancelar() {
    this.router.navigate(['contas'])
  }

  filterCategoriaPorId(idCategoria: number): Categoria | undefined{ 
    return this.categorias.find(x => x.id == idCategoria);
  }

}
