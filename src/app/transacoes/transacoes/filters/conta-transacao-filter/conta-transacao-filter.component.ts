import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ContaBancariaDropdown } from '../../../../models/dropdowns/conta-bancaria-dropdown';
import { ContaBancariaService } from '../../../../services/conta-bancaria.service';

@Component({
  selector: 'app-conta-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './conta-transacao-filter.component.html',
  styleUrl: './conta-transacao-filter.component.css'
})
export class ContaTransacaoFilterComponent {
  @Output() idContaBancariaEmitter = new EventEmitter<number>();

  contas?: ContaBancariaDropdown[];
  id?: number;

  constructor(
    private contaBancariaService: ContaBancariaService,
  ) { }

  enviarConta() {
    this.idContaBancariaEmitter.emit(this.id);
  }

  ngOnInit() {
    this.contaBancariaService.getAllDropdown()
      .subscribe(x => this.contas = x)
  }
}
