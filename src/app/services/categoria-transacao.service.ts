import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaTransacoesDropdown } from '../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriaTransacaoFormInsert } from '../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoFormUpdate } from '../models/forms/update/categoria-transacao-form-update';
import { CategoriaTransacaoTable } from '../models/tables/categoria-transacao-table';

@Injectable({
  providedIn: 'root'
})
export class CategoriaTransacaoService {
  constructor(
    private httpClient: HttpClient
  ) { }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/categorias-transacao/${id}`)
  }

  consultar(): Observable<CategoriaTransacaoTable[]> {
    return this.httpClient.get<CategoriaTransacaoTable[]>(`${environment.apiUrl}/categorias-transacao`)
  }

  consultarDropdown(): Observable<CategoriaTransacoesDropdown[]> {
    return this.httpClient.get<CategoriaTransacoesDropdown[]>(`${environment.apiUrl}/categorias-transacao`)
  }

  consultarPorId(id: number): Observable<CategoriaTransacaoTable> {
    return this.httpClient.get<CategoriaTransacaoTable>(`${environment.apiUrl}/categorias-transacao/${id}`)
  }

  salvar(categoria: CategoriaTransacaoFormInsert): Observable<CategoriaTransacaoFormInsert> {
    return this.httpClient.post<CategoriaTransacaoFormInsert>(`${environment.apiUrl}/categorias-transacao`, categoria)
  }

  atualizar(categoria: CategoriaTransacaoFormUpdate): Observable<CategoriaTransacaoFormUpdate> {
    return this.httpClient.put<CategoriaTransacaoFormUpdate>(`${environment.apiUrl}/categorias-transacao/${categoria.id}`, categoria)
  }
}
