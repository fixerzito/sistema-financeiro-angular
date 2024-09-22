import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-categoria-conta-bancaria',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './cadastro-categoria-conta-bancaria.component.html',
  styleUrl: './cadastro-categoria-conta-bancaria.component.css'
})
export class CadastroCategoriaContaBancariaComponent {
  nome: string = "";
  // httpClient!: HttpClient;

  // constructor(httpClient: HttpClient) {
  //   this.httpClient = httpClient;
  // }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }
  salvar() {
    let dados = {
      nome: this.nome
    }
    this.httpClient.post(`${environment.apiUrl}/categorias`, dados).subscribe(x => this.router.navigate(['/categorias'])
    )
  }
}
