import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { CategoriaTransacaoFormUpdate } from '../../../models/forms/update/categoria-transacao-form-update';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-categorias-transacao',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categorias-transacao.component.html',
  styleUrl: './editar-categorias-transacao.component.css'
})
export class EditarCategoriasTransacaoComponent {
  formGroup!: FormGroup;
  categoria: CategoriaTransacaoFormUpdate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) { 
    this.categoria =  {
      id: 0,
      nome: ''
    }

    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

  }

  ngOnInit() { 
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.categoriaTransacaoService.consultarPorId(id)
        .subscribe(categoria => {
          this.categoria = categoria;
          this.formGroup.setValue({
            nome: this.categoria.nome
          })
        });
    });
  }

  salvar() {
    if(this.formGroup.valid){
      this.categoria.nome = this.formGroup.get('nome')?.value;
    this.categoriaTransacaoService.atualizar(this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias-transacao']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/categorias-transacao'])
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
