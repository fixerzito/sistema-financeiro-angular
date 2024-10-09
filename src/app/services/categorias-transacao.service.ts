import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaTransacoesDropdown } from '../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriaTransacoesInsert } from '../models/forms/insert/categoria-transacoes-insert';
import { CategoriaTransacoesUpdate } from '../models/forms/update/categoria-transacoes-form-update';
import { CategoriaTransacaoTable } from '../models/tables/categoria-transacao-table';

@Injectable({
  providedIn: 'root'
})
export class CategoriasTransacoesService {
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

  salvar(categoria: CategoriaTransacoesInsert): Observable<CategoriaTransacoesInsert> {
    return this.httpClient.post<CategoriaTransacoesInsert>(`${environment.apiUrl}/categorias-transacao`, categoria)
  }

  atualizar(categoria: CategoriaTransacoesUpdate): Observable<CategoriaTransacoesUpdate> {
    return this.httpClient.put<CategoriaTransacoesUpdate>(`${environment.apiUrl}/categorias-transacao/${categoria.id}`, categoria)
  }
}
