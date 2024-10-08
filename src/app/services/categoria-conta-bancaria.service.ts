import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaContaBancariaTable } from '../models/tables/categoria-conta-bancaria-table';
import { CategoriaContaBancariaFormInsert } from '../models/forms/insert/categoria-conta-bancaria-form-insert';
import { CategoriaContaBancariaFormUpdate } from '../models/forms/update/categoria-conta-bancaria-form-update';
import { CategoriaContaBancariaDropDown } from '../models/dropdowns/categoria-conta-bancaria-dropdown';

@Injectable({
  providedIn: 'root'
})
export class CategoriaContaBancariaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/categorias-contas-bancarias/${id}`)
  }

  consultar(): Observable<CategoriaContaBancariaTable[]> {
    return this.httpClient.get<CategoriaContaBancariaTable[]>(`${environment.apiUrl}/categorias-contas-bancarias`)
  }

  consultarDropDown(): Observable<CategoriaContaBancariaDropDown[]> {
    return this.httpClient.get<CategoriaContaBancariaDropDown[]>(`${environment.apiUrl}/categorias-contas-bancarias`)
  }

  consultarPorId(id: number): Observable<CategoriaContaBancariaTable> {
    return this.httpClient.get<CategoriaContaBancariaTable>(`${environment.apiUrl}/categorias-contas-bancarias/${id}`)
  }

  salvar(categoria: CategoriaContaBancariaFormInsert): Observable<CategoriaContaBancariaFormInsert> {
    return this.httpClient.post<CategoriaContaBancariaFormInsert>(`${environment.apiUrl}/categorias-contas-bancarias`, categoria)
  }

  atualizar(categoria: CategoriaContaBancariaFormUpdate): Observable<CategoriaContaBancariaFormUpdate> {
    return this.httpClient.put<CategoriaContaBancariaFormUpdate>(`${environment.apiUrl}/categorias-contas-bancarias/${categoria.id}`, categoria)
  }
}
