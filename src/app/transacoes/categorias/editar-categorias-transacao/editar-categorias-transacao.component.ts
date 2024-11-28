import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { CategoriaTransacaoFormUpdate } from '../../../models/forms/update/categoria-transacao-form-update';

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
  categoria: CategoriaTransacaoFormUpdate = { id: 0, nome: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaTransacaoService: CategoriaTransacaoService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.categoriaTransacaoService.consultarPorId(id)
        .subscribe(categoria => {
          this.categoria = categoria;
        });
    });
  }

  salvar() {
    this.categoriaTransacaoService.atualizar(this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias-transacao']);
      });
  }

  cancelar() {
    this.router.navigate(['/categorias-transacao'])
  }

}
