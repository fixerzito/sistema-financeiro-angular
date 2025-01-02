import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-data-efetivacao-transacao-filter',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './data-efetivacao-transacao-filter.component.html',
  styleUrl: './data-efetivacao-transacao-filter.component.css'
})
export class DataEfetivacaoTransacaoFilterComponent {
  @Output() dataEfetivacaoEmitter = new EventEmitter<Date>();
  
  data?: Date;

  enviarDataEfetivacao(){
    this.dataEfetivacaoEmitter.emit(this.data);
  }
}
