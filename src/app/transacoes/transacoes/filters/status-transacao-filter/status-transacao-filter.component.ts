import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { StatusTransacao } from '../../../../models/view/status-transacao';

@Component({
  selector: 'app-status-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './status-transacao-filter.component.html',
  styleUrl: './status-transacao-filter.component.css'
})
export class StatusTransacaoFilterComponent {
   @Output() idStatusTransacaoEmitter = new EventEmitter<number>()
  
    statusTransacao: StatusTransacao[];
    id?: number;
  
    constructor(){
      this.statusTransacao = [
        {
          id: 0,
          nome: "Todos"
        },
        {
          id: 1,
          nome: "Pendente"
        },
        {
          id: 2,
          nome: "Efetivada"
        },
        {
          id: 3,
          nome: "Vencida"
        }
      ]
  
      this.id = 0;
    }
  
    enviarStatusTransacao() {
      this.idStatusTransacaoEmitter.emit(this.id);
    }
}
