import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TransacaoTable } from '../models/tables/transacao-table';
import { TransacaoFormInsert } from '../models/forms/insert/transacao-form-insert';
import { TransacaoFormUpdate } from '../models/forms/update/transacao-form-update';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.url = `${environment.apiUrl}/api/transacoes`;
  }

  getAll(): Observable<TransacaoTable[]> {
    return this.httpClient.get<TransacaoTable[]>(`${this.url}`);
  }

  consultar(): Observable<TransacaoTable[]> {
    return this.httpClient.get<TransacaoTable[]>(`${this.url}`)
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, {})
  }

  salvar(transacaoCriada: TransacaoFormInsert): Observable<TransacaoFormInsert> {
    return this.httpClient.post<TransacaoFormInsert>(`${this.url}`, transacaoCriada)
  }

  consultarPorId(id: number): Observable<TransacaoFormUpdate> {
    return this.httpClient.get<TransacaoFormUpdate>(`${this.url}/${id}`)
  }

  atualizar(transacao: TransacaoFormUpdate): Observable<TransacaoFormUpdate> {
    return this.httpClient.put<TransacaoFormUpdate>(`${this.url}/${transacao.id}`, transacao)
  }
}
