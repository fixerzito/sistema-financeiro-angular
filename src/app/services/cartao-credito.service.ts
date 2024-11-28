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
  private url: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = `${environment.apiUrl}/api/cartoes`;
  }

  insert(form: CartaoCreditoFormInsert): Observable<void> {
    return this.httpClient.post<void>(`${this.url}`, form)
  }

  apagar(id: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/${id}`, {})
  }

  consultar(): Observable<CartaoTable[]> {
    return this.httpClient.get<CartaoTable[]>(`${this.url}`)
  }

  buscarCartaoEditar(idParaEditar: number): Observable<CartaoCreditoFormUpdate> {
    return this.httpClient.get<CartaoCreditoFormUpdate>(`${this.url}/${idParaEditar}`)
  }

  salvar(id: number, cartaoEditado: CartaoCreditoFormUpdate): Observable<CartaoCreditoFormInsert> {
    return this.httpClient.put<CartaoCreditoFormInsert>(`${this.url}/${id}`, cartaoEditado)
  }
}
