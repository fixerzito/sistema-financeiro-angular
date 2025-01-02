import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-previsao-efetivacao-transacao-filter',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './previsao-efetivacao-transacao-filter.component.html',
  styleUrl: './previsao-efetivacao-transacao-filter.component.css'
})
export class PrevisaoEfetivacaoTransacaoFilterComponent {
  @Output() dataPrevisaoEfetivacaoEmitter = new EventEmitter<Date>();

  data?: Date;

  enviarDataEfetivacao() {
    this.dataPrevisaoEfetivacaoEmitter.emit(this.data);
  }
}
