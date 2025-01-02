import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PeriodoTransacao } from '../../../../models/view/periodo-transacao';

@Component({
  selector: 'app-periodo-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './periodo-transacao-filter.component.html',
  styleUrl: './periodo-transacao-filter.component.css'
})
export class PeriodoTransacaoFilterComponent {
  @Output() idPeriodoTransacaoEmitter = new EventEmitter<number>()
    
      periodoTransacao: PeriodoTransacao[];
      id?: number;
    
      constructor(){
        this.periodoTransacao = [
          {
            id: 0,
            nome: "Mês atual"
          },
          {
            id: 1,
            nome: "Mês anterior"
          },
          {
            id: 2,
            nome: "Próximo mês"
          },
          {
            id: 3,
            nome: "Ano atual"
          },
          {
            id: 4,
            nome: "Ano passado"
          },
          {
            id: 5,
            nome: "Próximo ano"
          },
          {
            id: 6,
            nome: "Especificar um período"
          }
        ]
      }
    
      enviarStatusTransacao() {
        this.idPeriodoTransacaoEmitter.emit(this.id);
      }

}
