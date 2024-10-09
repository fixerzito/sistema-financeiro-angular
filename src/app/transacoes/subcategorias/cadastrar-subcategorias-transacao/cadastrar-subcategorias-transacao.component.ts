import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriasTransacoesService } from '../../../services/categorias-transacao.service';

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
  ],
  templateUrl: './cadastrar-subcategorias-transacao.component.html',
  styleUrl: './cadastrar-subcategorias-transacao.component.css'
})
export class CadastrarSubcategoriasTransacaoComponent implements OnInit {
  subcategoria: SubcategoriaTransacaoFormInsert = {
    nome: '',
    categoria: 0
  };

  categorias!: CategoriaTransacoesDropdown[];
  categoriaSelecionada: CategoriaTransacoesDropdown = {
    id: 0,
    nome: ''
  }

  constructor(
    private router: Router,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriasTransacoesService: CategoriasTransacoesService,
  ) { }

  ngOnInit() {
    this.categoriasTransacoesService.consultarDropdown()
    .subscribe(categorias => 
      this.categorias = categorias
    );
  }

  salvar() {
    this.subcategoriaTransacaoService.salvar(this.subcategoria)
      .subscribe(x => this.router.navigate(['/subcategorias-transacao'])
      )
  }

  atribuirIdCategoria(id: number) {
    
    this.subcategoria.categoria = id;
    console.log(this.subcategoria.categoria);
  }
}
