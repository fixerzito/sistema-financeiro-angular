import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriaContaBancariaFormUpdate } from '../../../models/forms/update/categoria-conta-bancaria-form-update';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  categoria: CategoriaContaBancariaFormUpdate = { id: 0, nome: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.categoriaContaBancariaService.consultarPorId(id)
        .subscribe(categoria => {
          this.categoria = categoria;
        });
    });
  }

  salvar() {
    this.categoriaContaBancariaService.atualizar(this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias-contas-bancarias']);
      });
  }
}
