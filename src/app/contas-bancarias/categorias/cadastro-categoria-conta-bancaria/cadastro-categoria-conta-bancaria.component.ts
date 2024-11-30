import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaContaBancariaFormInsert } from '../../../models/forms/insert/categoria-conta-bancaria-form-insert';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-categoria-conta-bancaria',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cadastro-categoria-conta-bancaria.component.html',
  styleUrl: './cadastro-categoria-conta-bancaria.component.css'
})
export class CadastroCategoriaContaBancariaComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) {

  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria: CategoriaContaBancariaFormInsert = {
        nome: this.formGroup.value.nome
      };
      this.categoriaContaBancariaService.salvar(categoria)
      .subscribe(x => this.router.navigate(['/categorias-contas-bancarias']));
    }
  }

  cancelar() {
    this.router.navigate(['/categorias-contas-bancarias'])
  }

  obterMensagemErroNome() {
    const nomeControl = this.formGroup.get('nome');

    if (nomeControl?.hasError('maxlength')) {
      return 'O nome da categoria deve ter no máximo 100 caracteres.';
    }

    if (nomeControl?.hasError('required')) {
      return 'O nome da categoria é obrigatório.';
    }

    return '';
  }
}
