import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';
import { CategoriaTransacaoDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';

@Component({
  selector: 'app-cadastrar-subcategorias-transacao',
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
  templateUrl: './cadastrar-subcategorias-transacao.component.html',
  styleUrl: './cadastrar-subcategorias-transacao.component.css'
})
export class CadastrarSubcategoriasTransacaoComponent implements OnInit {
  formGroup!: FormGroup;
  erroNome?: string;
  erroCategoria?: string;

  categorias!: CategoriaTransacaoDropdown[];
  categoriaSelecionada: CategoriaTransacaoDropdown = {
    id: 0,
    nome: ''
  }

  constructor(
    private router: Router,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      categoria: new FormControl('', [Validators.required])
    });

    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias =>
        this.categorias = categorias
      );
  }

  salvar() {
    if(this.formGroup.valid){
      const subcategoria: SubcategoriaTransacaoFormInsert = {
        nome: this.formGroup.get('nome')?.value,
        idCategoria: this.formGroup.get('categoria')?.value
      }
      this.subcategoriaTransacaoService.salvar(subcategoria)
        .subscribe(x => this.router.navigate(['/subcategorias-transacao'])
        )
    }
  }

  cancelar() {
    this.router.navigate(['/subcategorias-transacao'])
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
