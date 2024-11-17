import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaContaBancariaFormInsert } from '../../../models/forms/insert/categoria-conta-bancaria-form-insert';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';

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
  categoria: CategoriaContaBancariaFormInsert = {
    nome: ''
  };

  constructor(
    private router: Router,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) {

  }
  salvar() {
    this.categoriaContaBancariaService.salvar(this.categoria)
      .subscribe(x => this.router.navigate(['/categorias-contas-bancarias'])
      )
  }

  cancelar() {
    this.router.navigate(['/categorias-contas-bancarias'])
  }
}
