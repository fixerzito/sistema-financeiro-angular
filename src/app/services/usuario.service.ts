import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioVerify } from '../models/forms/user/UsuarioVerify';
import { Observable } from 'rxjs/internal/Observable';
import { CadastroRequest } from '../models/forms/user/cadastro/cadastroRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   private url: string;
  
    constructor(
      private httpClient: HttpClient,
    ) {
      this.url = `${environment.apiUrl}/api/usuario`;
    }
  
    verificarEmail(usuarioVerify: UsuarioVerify) : Observable<any> {
      return this.httpClient.get(`${this.url}/verificar-email/`, {
        params: { email: usuarioVerify.email! }
      });
    }

    cadastrar(cadastroRequest: CadastroRequest) : Observable<CadastroRequest>{
      return this.httpClient.post<CadastroRequest>(`${this.url}/cadastro`, cadastroRequest)
    }
}
