import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaTransacaoDropdown } from '../models/dropdowns/categoria-transacoes-dropdown';
import { CategoriaTransacaoFormInsert } from '../models/forms/insert/categoria-transacao-form-insert';
import { CategoriaTransacaoFormUpdate } from '../models/forms/update/categoria-transacao-form-update';
import { CategoriaTransacaoTable } from '../models/tables/categoria-transacao-table';
import { ValidatorRecorrencia } from '../models/validators/validator-recorrencia';
import { CategoriaTransacaoCadastroRapidoFormInsert } from '../models/forms/insert/categoria-transacao-cadastro-rapido-form-insert';
import { CategoriaTransacaoCadastroRapidoFormInsertResponse } from '../models/forms/insert/categoria-transacao-cadastro-rapido-form-insert-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriaTransacaoService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.url = `${environment.apiUrl}/api/categorias-transacao`;
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, {})
  }

  consultar(): Observable<CategoriaTransacaoTable[]> {
    return this.httpClient.get<CategoriaTransacaoTable[]>(`${this.url}`)
  }

  cadastroRapido(categoria: CategoriaTransacaoCadastroRapidoFormInsert): Observable<CategoriaTransacaoCadastroRapidoFormInsertResponse> {
    return this.httpClient.post<CategoriaTransacaoCadastroRapidoFormInsertResponse>(`${this.url}/cadastro-rapido`, categoria)
  }

  consultarRecorrencia(categoria: CategoriaTransacaoFormInsert): Observable<ValidatorRecorrencia> {
    const params = new HttpParams().set('nome', categoria.nome!);
    return this.httpClient.get<ValidatorRecorrencia>(`${this.url}/validar-existente`, {params})
  }

  consultarDropdown(): Observable<CategoriaTransacaoDropdown[]> {
    return this.httpClient.get<CategoriaTransacaoDropdown[]>(`${this.url}`)
  }

  consultarPorId(id: number): Observable<CategoriaTransacaoTable> {
    return this.httpClient.get<CategoriaTransacaoTable>(`${this.url}/${id}`)
  }

  salvar(categoria: CategoriaTransacaoFormInsert): Observable<CategoriaTransacaoFormInsert> {
    return this.httpClient.post<CategoriaTransacaoFormInsert>(`${this.url}`, categoria)
  }

  atualizar(categoria: CategoriaTransacaoFormUpdate): Observable<CategoriaTransacaoFormUpdate> {
    return this.httpClient.put<CategoriaTransacaoFormUpdate>(`${this.url}/${categoria.id}`, categoria)
  }
}
