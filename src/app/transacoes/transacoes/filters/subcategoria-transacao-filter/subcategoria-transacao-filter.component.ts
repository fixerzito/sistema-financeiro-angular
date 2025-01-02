import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../../models/dropdowns/subcategoria-transacao-dropdown';
import { SubcategoriaTransacaoService } from '../../../../services/subcategoria-transacao.service';
import { CategoriaTransacaoFilterComponent } from "../categoria-transacao-filter/categoria-transacao-filter.component";
import { map } from 'rxjs';

@Component({
  selector: 'app-subcategoria-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './subcategoria-transacao-filter.component.html',
  styleUrl: './subcategoria-transacao-filter.component.css'
})
export class SubcategoriaTransacaoFilterComponent {
  @Output() subcategoriaTransacaoEmitter = new EventEmitter<string>();
  @Input() idCategoria: number;
  @Input() desablitado: boolean;

  subcategorias?: SubcategoriaTransacaoDropdown[];
  subcategoria?: SubcategoriaTransacaoDropdown;


  constructor(
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
  ) {
    this.desablitado = false;
    this.idCategoria = 0;
  }

  enviarNomesubcategoria() {
    this.subcategoriaTransacaoEmitter.emit(this.subcategoria!.nome);
  }

  iniciar() {
    if (this.idCategoria) {
      this.subcategoriaTransacaoService.consultarDropdown(this.idCategoria)
        .subscribe(x => this.subcategorias = x)
    } else {
      this.subcategoriaTransacaoService.consultar()
      .pipe(
        map((x: any[]) => x.map(subcategoria => ({
          id: subcategoria.id,
          nome: subcategoria.nome
        } as SubcategoriaTransacaoDropdown)))
      )
      .subscribe(subcategoriasFiltradas => this.subcategorias = subcategoriasFiltradas);
    }

    if (this.idCategoria != 0 && this.subcategorias?.length == 0) {
      this.desablitado = true;
    }
  }
}
