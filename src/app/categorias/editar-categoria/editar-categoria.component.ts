import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface Categoria {
  id: number;
  nome: string;
}

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
  categoria: Categoria = { id: 0, nome: '' };

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.httpClient.get<Categoria>(`http://localhost:3000/categorias/${id}`)
        .subscribe(categoria => {
          this.categoria = categoria;
        });
    });
  }

  salvar() {
    this.httpClient.put<Categoria>(`http://localhost:3000/categorias/${this.categoria.id}`, this.categoria)
      .subscribe(() => {
        this.router.navigate(['categorias']);
      });
  }
}
