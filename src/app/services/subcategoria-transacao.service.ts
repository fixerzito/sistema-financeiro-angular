import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SubcategoriaTransacaoTable } from '../models/tables/subcategoria-transacao-table';
import { SubcategoriaTransacaoDropdown } from '../models/dropdowns/subcategoria-transacao-dropdown';
import { SubcategoriaTransacaoFormInsert } from '../models/forms/insert/subcategoria-transacao-insert';
import { SubcategoriaTransacaoFormUpdate } from '../models/forms/update/subcategoria-transacao-form-update';
import { ValidatorRecorrencia } from '../models/validators/validator-recorrencia';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaTransacaoService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = `${environment.apiUrl}/api/subcategorias-transacao`;
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, {})
  }

  consultar(): Observable<SubcategoriaTransacaoTable[]> {
    return this.httpClient.get<SubcategoriaTransacaoTable[]>(this.url)
  }

  consultarDropdown(categoriaId: number): Observable<SubcategoriaTransacaoDropdown[]> {
    return this.httpClient.get<SubcategoriaTransacaoDropdown[]>(`${this.url}/dropdown/${categoriaId}`)
  }

  consultarPorId(id: number): Observable<SubcategoriaTransacaoFormUpdate> {
    return this.httpClient.get<SubcategoriaTransacaoFormUpdate>(`${this.url}/${id}`)
  }

  consultarRecorrencia(subcategoria: SubcategoriaTransacaoFormInsert): Observable<ValidatorRecorrencia> {
    const params = new HttpParams()
      .set('nome', subcategoria.nome!);
    if (subcategoria.idCategoria) { 
      params.set('idCategoria', subcategoria.idCategoria!);
    }
    return this.httpClient.get<ValidatorRecorrencia>(`${this.url}/validar-existente`, { params })
  }

  salvar(subcategoria: SubcategoriaTransacaoFormInsert): Observable<SubcategoriaTransacaoFormInsert> {
    return this.httpClient.post<SubcategoriaTransacaoFormInsert>(this.url, subcategoria)
  }

  atualizar(subcategoria: SubcategoriaTransacaoFormUpdate): Observable<SubcategoriaTransacaoFormUpdate> {
    return this.httpClient.put<SubcategoriaTransacaoFormUpdate>(`${this.url}/${subcategoria.id}`, subcategoria)
  }
}
