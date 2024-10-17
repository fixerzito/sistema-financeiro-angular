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

  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.url = `${environment.apiUrl}/subcategorias-transacao`;
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  consultar(): Observable<SubcategoriaTransacaoTable[]> {
    return this.httpClient.get<SubcategoriaTransacaoTable[]>(this.url)
  }

  consultarDropDown(): Observable<SubcategoriaTransacaoDropdown[]> {
    return this.httpClient.get<SubcategoriaTransacaoDropdown[]>(this.url)
  }

  consultarPorId(id: number): Observable<SubcategoriaTransacaoFormUpdate> {
    return this.httpClient.get<SubcategoriaTransacaoFormUpdate>(`${this.url}/${id}`)
  }

  salvar(subcategoria: SubcategoriaTransacaoFormInsert): Observable<SubcategoriaTransacaoFormInsert> {
    return this.httpClient.post<SubcategoriaTransacaoFormInsert>(this.url, subcategoria)
  }

  atualizar(id: number, subcategoria: SubcategoriaTransacaoFormInsert): Observable<SubcategoriaTransacaoFormInsert> {
    return this.httpClient.put<SubcategoriaTransacaoFormInsert>(`${this.url}/${id}`, subcategoria)
  }
}
