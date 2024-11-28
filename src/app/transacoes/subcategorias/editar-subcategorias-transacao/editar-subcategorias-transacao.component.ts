import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { SubcategoriaTransacaoFormInsert } from '../../../models/forms/insert/subcategoria-transacao-insert';

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
  ],
  templateUrl: './editar-subcategorias-transacao.component.html',
  styleUrl: './editar-subcategorias-transacao.component.css'
})
export class EditarSubcategoriasTransacaoComponent implements OnInit{
  subcategoriaEditada: SubcategoriaTransacaoFormUpdate = {
    id: 0,
    nome: '',
    categoria: 0
  };

  subcategoriaRecebida: SubcategoriaTransacaoFormUpdate = {
    id: 0,
    nome: '',
    categoria: 0
  };


  categorias!: CategoriaTransacoesDropdown[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) { }

  ngOnInit() {
    this.buscarCategorias();

    this.route.paramMap.subscribe(params => {
      let idParaEditar = +params.get('id')!
      this.subcategoriaTransacaoService.consultarPorId(idParaEditar)
        .subscribe(response => {
          if (Array.isArray(response)) {
            this.subcategoriaRecebida = response[0];
          } else {
            this.subcategoriaRecebida = response;
          }

          this.subcategoriaEditada = this.subcategoriaRecebida;
          
          console.log(this.subcategoriaEditada);
          
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

  salvar(id: number, subcategoria: SubcategoriaTransacaoFormInsert ) {
    this.subcategoriaTransacaoService.atualizar(id, subcategoria)
      .subscribe(x => {
        this.router.navigate(['subcategorias-transacao']);
      });
  }

  atribuirIdCategoria(id: number) {    
    this.subcategoriaEditada.categoria = id;
  }

}
