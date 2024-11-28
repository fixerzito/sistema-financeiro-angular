import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaContaBancariaFormUpdate } from '../../../models/forms/update/categoria-conta-bancaria-form-update';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  categoria: CategoriaContaBancariaFormUpdate;
  formGroup!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) { 
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    
    this.categoria = { id: 0, nome: '' }

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.categoriaContaBancariaService.consultarPorId(id)
        .subscribe(categoria => {
          this.categoria = categoria;
          this.formGroup.setValue({
            nome: categoria.nome
          })
        });
    });
  }

  salvar() {
    if(this.formGroup.valid){
      this.categoria.nome = this.formGroup.get('nome')?.value;
      this.categoriaContaBancariaService.atualizar(this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias-contas-bancarias']);
      });
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
