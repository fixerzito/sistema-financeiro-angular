import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriaTransacaoDropdown } from '../../../../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriaTransacaoService } from '../../../../services/categoria-transacao.service';

@Component({
  selector: 'app-categoria-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './categoria-transacao-filter.component.html',
  styleUrl: './categoria-transacao-filter.component.css'
})
export class CategoriaTransacaoFilterComponent {
  @Output() idCategoriaTransacaoEmitter =  new EventEmitter<number>();

  categorias?: CategoriaTransacaoDropdown[];
  id?: number;

  constructor(
    private categoriaTransacaoService: CategoriaTransacaoService,
  ){}

  enviarIdCategoria(){
    this.idCategoriaTransacaoEmitter.emit(this.id);
  }

  ngOnInit(){
    this.categoriaTransacaoService.consultarDropdown()
    .subscribe(x => this.categorias = x)
  }
}
