import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CartaoCreditoFormInsert } from '../models/forms/insert/cartao-credito-form-insert';
import { CartaoTable } from '../models/tables/cartao-table';
import { CartaoCreditoFormUpdate } from '../models/forms/update/cartao-credito-form-update';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  insert(form: CartaoCreditoFormInsert): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/cartoes`, form)
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/cartoes/${id}`)
  }

  consultar(): Observable<CartaoTable[]> {
    return this.httpClient.get<CartaoTable[]>(`${environment.apiUrl}/cartoes`)
  }

  buscarCartaoEditar(idParaEditar: number): Observable<CartaoCreditoFormUpdate> {
    return this.httpClient.get<CartaoCreditoFormUpdate>(`${environment.apiUrl}/cartoes/${idParaEditar}`)
  }

  salvar(id: number, cartaoEditado: CartaoCreditoFormInsert): Observable<CartaoCreditoFormInsert> {
    return this.httpClient.put<CartaoCreditoFormInsert>(`${environment.apiUrl}/cartoes/${id}`, cartaoEditado)
  }
}
