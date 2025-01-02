import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-valor-transacao-filter',
  standalone: true,
  imports: [
        FormsModule,
        CommonModule,
        InputTextModule
  ],
  templateUrl: './valor-transacao-filter.component.html',
  styleUrl: './valor-transacao-filter.component.css'
})
export class ValorTransacaoFilterComponent {
 @Output() valorTransacaoEmitter = new EventEmitter<string>();
  valorTransacao?: string;

  enviarValorTransacao(){
    this.valorTransacaoEmitter.emit(this.valorTransacao);
  }
}
