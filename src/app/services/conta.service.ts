import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContaTable } from '../models/tables/conta-table';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContaDropdown } from '../models/dropdowns/conta-dropdown';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<ContaTable[]> {
    return this.httpClient.get<ContaTable[]>(`${environment.apiUrl}/contas`);
  }

  getAllDropdown(): Observable<ContaDropdown[]> { 
    return this.getAll()
      .pipe(
        map(response => response.map(conta => ({
          id: conta.id,
          nome: conta.nome
        })))
      );
  }
}
