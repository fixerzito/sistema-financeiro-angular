import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CategoriaTransacaoFilterComponent } from "../categoria-transacao-filter/categoria-transacao-filter.component";
import { ContaTransacaoFilterComponent } from "../conta-transacao-filter/conta-transacao-filter.component";
import { DataEfetivacaoTransacaoFilterComponent } from "../data-efetivacao-transacao-filter/data-efetivacao-transacao-filter.component";
import { PrevisaoEfetivacaoTransacaoFilterComponent } from "../previsao-efetivacao-transacao-filter/previsao-efetivacao-transacao-filter.component";
import { NomeTransacaoFilterComponent } from "../nome-transacao-filter/nome-transacao-filter.component";
import { StatusTransacaoFilterComponent } from "../status-transacao-filter/status-transacao-filter.component";
import { SubcategoriaTransacaoFilterComponent } from "../subcategoria-transacao-filter/subcategoria-transacao-filter.component";
import { TipoTransacaoFilterComponent } from "../tipo-transacao-filter/tipo-transacao-filter.component";
import { AccordionModule } from 'primeng/accordion';
import { ValorTransacaoFilterComponent } from "../valor-transacao-filter/valor-transacao-filter.component";
import { PeriodoTransacaoFilterComponent } from "../periodo-transacao-filter/periodo-transacao-filter.component";

@Component({
  selector: 'app-transacao-filters',
  standalone: true,
  imports: [
    ButtonModule,
    OverlayPanelModule,
    CommonModule,
    DataEfetivacaoTransacaoFilterComponent,
    PrevisaoEfetivacaoTransacaoFilterComponent,
    NomeTransacaoFilterComponent,
    StatusTransacaoFilterComponent,
    TipoTransacaoFilterComponent,
    AccordionModule,
    CategoriaTransacaoFilterComponent,
    SubcategoriaTransacaoFilterComponent,
    ContaTransacaoFilterComponent,
    ValorTransacaoFilterComponent,
    PeriodoTransacaoFilterComponent
],
  templateUrl: './transacao-filters.component.html',
  styleUrl: './transacao-filters.component.css'
})
export class TransacaoFiltersComponent {
  nomeTransacao?: string;
  valorTransacao?: number;
  idCategoria?: number;
  idContabancaria?: number;
  idTipoTransacao?: number;
  idStatusTransacao?: number;
  dataEfeteivacao?: Date;
  dataPrevisaoEfeteivacao?: Date;

  receberNomeTransacao(evento: string){
    this.nomeTransacao = evento
  }

  receberValorTransacao(evento: string){
    this.nomeTransacao = evento
  }

  receberContaBancaria(evento: number){
    this.idContabancaria = evento
  }
  
  receberIdCategoriaTransacao(evento: number){
    this.idCategoria = evento
  }

  receberTipoTransacao(evento: number){
    this.idContabancaria = evento
  }

  receberStatusTransacao(evento: number){
    this.idStatusTransacao = evento
  }

  receberDataEfetivacao(evento: Date){
    this.dataEfeteivacao = evento
  }

  receberDataPrevisaoEfetivacao(evento: Date){
    this.dataPrevisaoEfeteivacao = evento
  }
}
