import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TransacaoDropdown } from '../../../../models/dropdowns/transacao-dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-nome-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './nome-transacao-filter.component.html',
  styleUrl: './nome-transacao-filter.component.css'
})
export class NomeTransacaoFilterComponent {
  @Output() nomeTransacaoEmitter = new EventEmitter<string>();
  nomeTransacao?: string;

  enviarNomeTransacao(){
    this.nomeTransacaoEmitter.emit(this.nomeTransacao);
  }
}
