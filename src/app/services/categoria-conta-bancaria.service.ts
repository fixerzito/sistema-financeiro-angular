import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaContaBancariaTable } from '../models/tables/categoria-conta-bancaria-table';
import { CategoriaContaBancariaFormInsert } from '../models/forms/insert/categoria-conta-bancaria-form-insert';
import { CategoriaContaBancariaFormUpdate } from '../models/forms/update/categoria-conta-bancaria-form-update';
import { CategoriaContaBancariaDropDown } from '../models/dropdowns/categoria-conta-bancaria-dropdown';
import { Table } from 'primeng/table';
import { TableModel } from '../models/tables/table';

@Injectable({
  providedIn: 'root'
})
export class CategoriaContaBancariaService {
  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = `${environment.apiUrl}/api/categorias-contas-bancarias`;
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }
  consultar(): Observable<CategoriaContaBancariaTable[]> {
    // consultar(page: number, rows: number, ordenacaoColuna: string, ordenacao: number): Observable<TableModel> {
    // let params = new HttpParams() 
    //   .set('Quantidade', rows.toString())
    //   .set('pagina', page.toString())
    //   .set('ordenacaoColuna', ordenacaoColuna.toString())
    //   .set('ordenacao', ordenacao.toString());

    return this.httpClient.get<CategoriaContaBancariaTable[]>(`${this.url}`)
  }

  consultarDropDown(): Observable<CategoriaContaBancariaDropDown[]> {
    return this.httpClient.get<CategoriaContaBancariaDropDown[]>(`${this.url}`)
  }

  consultarPorId(id: number): Observable<CategoriaContaBancariaTable> {
    return this.httpClient.get<CategoriaContaBancariaTable>(`${this.url}/${id}`)
  }

  salvar(categoria: CategoriaContaBancariaFormInsert): Observable<CategoriaContaBancariaFormInsert> {
    return this.httpClient.post<CategoriaContaBancariaFormInsert>(`${this.url}`, categoria)
  }

  atualizar(categoria: CategoriaContaBancariaFormUpdate): Observable<CategoriaContaBancariaFormUpdate> {
    return this.httpClient.put<CategoriaContaBancariaFormUpdate>(`${this.url}/${categoria.id}`, categoria)
  }
}
