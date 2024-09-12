import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-lista-categoria-conta-bancaria',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TableModule
  ],
  templateUrl: './lista-categoria-conta-bancaria.component.html',
  styleUrl: './lista-categoria-conta-bancaria.component.css'
})
export class ListaCategoriaContaBancariaComponent {
  categorias: Categoria[] = []

  constructor(
    private httpClient: HttpClient) {
  }

  ngOnInit(){
    this.consultar()
  }

  consultar() {
    this.httpClient.get<Array<Categoria>>("http://localhost:3000/categorias")
      .subscribe(x => {
        this.categorias = x;
      });
  }
}
