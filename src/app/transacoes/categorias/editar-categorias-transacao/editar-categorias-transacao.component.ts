import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriasTransacoesService } from '../../../services/categorias-transacao.service';
import { CategoriaTransacoesUpdate } from '../../../models/forms/update/categoria-transacoes-form-update';

@Component({
  selector: 'app-editar-categorias-transacao',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './editar-categorias-transacao.component.html',
  styleUrl: './editar-categorias-transacao.component.css'
})
export class EditarCategoriasTransacaoComponent {
  categoria: CategoriaTransacoesUpdate = { id: 0, nome: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriasTransacoesService: CategoriasTransacoesService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.categoriasTransacoesService.consultarPorId(id)
        .subscribe(categoria => {
          this.categoria = categoria;
        });
    });
  }

  salvar() {
    this.categoriasTransacoesService.atualizar(this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias-transacao']);
      });
  }

}
