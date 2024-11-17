import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContaBancariaTable } from '../models/tables/conta-bancaria-table';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContaBancariaDropdown } from '../models/dropdowns/conta-bancaria-dropdown';
import { ContaBancariaFormInsert } from '../models/forms/insert/conta-bancaria-form-insert';
import { ContaBancariaFormUpdate } from '../models/forms/update/conta-bancaria-form-update';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) { 
    this.url = `${environment.apiUrl}/api/contas`;
  }

  getAll(): Observable<ContaBancariaTable[]> {
    return this.httpClient.get<ContaBancariaTable[]>(`${this.url}`);
  }

  getAllDropdown(): Observable<ContaBancariaDropdown[]> {
    return this.getAll()
      .pipe(
        map(response => response.map(conta => ({
          id: conta.id!,
          nome: conta.nome
        })))
      );
  }

  consultar(): Observable<ContaBancariaTable[]> {
    return this.httpClient.get<ContaBancariaTable[]>(`${this.url}`)
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, {})
  }

  salvar(contaCriada: ContaBancariaFormInsert): Observable<ContaBancariaFormInsert> {
    return this.httpClient.post<ContaBancariaFormInsert>(`${this.url}`, contaCriada)
  }

  consultarPorId(id: number): Observable<ContaBancariaFormUpdate> {
    return this.httpClient.get<ContaBancariaFormUpdate>(`${this.url}/${id}`)
  }

  atualizar(conta: ContaBancariaFormUpdate): Observable<ContaBancariaFormUpdate> {
    return this.httpClient.put<ContaBancariaFormUpdate>(`${this.url}/${conta.id}`, conta)
  }
}
