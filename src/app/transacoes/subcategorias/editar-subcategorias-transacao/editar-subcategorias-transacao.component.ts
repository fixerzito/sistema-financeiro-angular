import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { SubcategoriaTransacaoFormUpdate } from '../../../models/forms/update/subcategoria-transacao-form-update';
import { CategoriaTransacaoDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';

@Component({
  selector: 'app-editar-subcategorias-transacao',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToastModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-subcategorias-transacao.component.html',
  styleUrl: './editar-subcategorias-transacao.component.css'
})
export class EditarSubcategoriasTransacaoComponent implements OnInit {
  formGroup!: FormGroup;
  erroNome?: string;
  erroCategoria?: string;
  subcategoriaEditar: SubcategoriaTransacaoFormUpdate;
  categorias!: CategoriaTransacaoDropdown[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      categoria: new FormControl('', [Validators.required])
    });

    this.subcategoriaEditar = {
      id: 0,
      nome: '',
      categoria: 0
    };
  }

  ngOnInit() {
    this.buscarCategorias();

    this.route.paramMap.subscribe(params => {
      this.subcategoriaEditar.id = +params.get('id')!
      this.subcategoriaTransacaoService.consultarPorId(this.subcategoriaEditar.id)
        .subscribe(response => {
          if (Array.isArray(response)) {
            this.subcategoriaEditar = response[0];
          } else {
            this.subcategoriaEditar = response;
          }
          this.formGroup.setValue({
            nome: this.subcategoriaEditar.nome,
            categoria: this.subcategoriaEditar.categoria,
          });
        });
    });
  }

  cancelar() {
    this.router.navigate(['subcategorias-transacao']);
  }

  buscarCategorias() {
    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }

  salvar() {
    if (this.formGroup.valid) {
      this.subcategoriaEditar.nome = this.formGroup.get('nome')?.value
      this.subcategoriaEditar.categoria = this.formGroup.get('categoria')?.value

      this.subcategoriaTransacaoService.atualizar(this.subcategoriaEditar)
        .subscribe(x => {
          this.router.navigate(['subcategorias-transacao']);
        });
    }
  }

  obterMensagemErro() {
    const nomeControl = this.formGroup.get('nome');
    const cateogoriaControl = this.formGroup.get('categoria');

    if (nomeControl?.hasError('maxlength')) {
      this.erroNome = 'O nome da subcategoria deve ter no máximo 100 caracteres.';
    } else if (nomeControl?.hasError('required')) {
      this.erroNome = 'O nome da subcategoria é obrigatório.';
    } else {
      this.erroNome = '';
    }

    if (cateogoriaControl?.hasError('required')) {
      this.erroCategoria = 'É necessário selecionar uma categoria';
    } else {
      this.erroCategoria = '';
    }
  }

}
