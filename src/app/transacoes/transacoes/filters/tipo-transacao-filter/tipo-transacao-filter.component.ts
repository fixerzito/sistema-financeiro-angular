import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TipoTransacao } from '../../../../models/view/tipoTransacao';

@Component({
  selector: 'app-tipo-transacao-filter',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './tipo-transacao-filter.component.html',
  styleUrl: './tipo-transacao-filter.component.css'
})
export class TipoTransacaoFilterComponent {
  @Output() idTipoTransacaoEmitter = new EventEmitter<number>()

  tiposTransacao: TipoTransacao[];
  id?: number;

  constructor(){
    this.tiposTransacao = [
      {
        id: 0,
        nome: "Todos"
      },
      {
        id: 1,
        nome: "Entrada"
      },
      {
        id: 2,
        nome: "Saída"
      }
    ]

    this.id = 0;
  }

  enviarTipoTransacao() {
    this.idTipoTransacaoEmitter.emit(this.id);
  }
}
