import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SubcategoriaTransacaoTable } from '../models/tables/subcategoria-transacao-table';
import { SubcategoriaTransacaoDropdown } from '../models/dropdowns/subcategoria-transacao-dropdown';
import { SubcategoriaTransacaoFormInsert } from '../models/forms/insert/subcategoria-transacao-insert';
import { SubcategoriaTransacaoFormUpdate } from '../models/forms/update/subcategoria-transacao-form-update';


@Injectable({
  providedIn: 'root'
})
export class SubcategoriaTransacaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/subcategorias-transacao/${id}`)
  }

  consultar(): Observable<SubcategoriaTransacaoTable[]> {
    return this.httpClient.get<SubcategoriaTransacaoTable[]>(`${environment.apiUrl}/subcategorias-transacao`)
  }

  consultarDropDown(): Observable<SubcategoriaTransacaoDropdown[]> {
    return this.httpClient.get<SubcategoriaTransacaoDropdown[]>(`${environment.apiUrl}/subcategorias-transacao`)
  }

  consultarPorId(id: number): Observable<SubcategoriaTransacaoFormUpdate> {
    return this.httpClient.get<SubcategoriaTransacaoFormUpdate>(`${environment.apiUrl}/subcategorias-transacao/${id}`)
  }

  salvar(subcategoria: SubcategoriaTransacaoFormInsert): Observable<SubcategoriaTransacaoFormInsert> {
    return this.httpClient.post<SubcategoriaTransacaoFormInsert>(`${environment.apiUrl}/subcategorias-transacao`, subcategoria)
  }

  atualizar(id: number, subcategoria: SubcategoriaTransacaoFormInsert): Observable<SubcategoriaTransacaoFormInsert> {
    return this.httpClient.put<SubcategoriaTransacaoFormInsert>(`${environment.apiUrl}/subcategorias-transacao/${id}`, subcategoria)
  }
}
