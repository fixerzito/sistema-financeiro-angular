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

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ContaBancariaTable[]> {
    return this.httpClient.get<ContaBancariaTable[]>(`${environment.apiUrl}/contas`);
  }

  getAllDropdown(): Observable<ContaBancariaDropdown[]> {
    return this.getAll()
      .pipe(
        map(response => response.map(conta => ({
          id: conta.id,
          nome: conta.nome
        })))
      );
  }

  consultar(): Observable<ContaBancariaTable[]> {
    return this.httpClient.get<ContaBancariaTable[]>(`${environment.apiUrl}/contas`)
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/contas/${id}`)
  }

  salvar(contaCriada: ContaBancariaFormInsert): Observable<ContaBancariaFormInsert> {
    return this.httpClient.post<ContaBancariaFormInsert>(`${environment.apiUrl}/contas`, contaCriada)
  }

  consultarPorId(id: number): Observable<ContaBancariaFormUpdate> {
    return this.httpClient.get<ContaBancariaFormUpdate>(`${environment.apiUrl}/contas/${id}`)
  }

  atualizar(conta: ContaBancariaFormUpdate): Observable<ContaBancariaFormUpdate> {
    return this.httpClient.put<ContaBancariaFormUpdate>(`${environment.apiUrl}/contas/${conta.id}`, conta)
  }
}
