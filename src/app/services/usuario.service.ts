import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioVerify } from '../models/forms/user/UsuarioVerify';
import { Observable } from 'rxjs/internal/Observable';
import { CadastroRequest } from '../models/forms/user/cadastro/cadastroRequest';
import { Router } from '@angular/router';
import { UserLogin } from '../models/forms/insert/user-login';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   private url: string;
  
    constructor(
      private httpClient: HttpClient,
      private router: Router
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

    confirmarEmail(email: string, token: string): Observable<any> {
      const body = { email, token };
      return this.httpClient.post( `${this.url}/confirmar-email`, body);
    }
    
    cadastrarSenha(email: string, senha: string): Observable<any> {
      return this.httpClient.post(`${this.url}/cadastrar-senha`, { email, senha });
    }



    login(userLogin: UserLogin): Observable<any>{
      return this.httpClient.post<{ sucesso: boolean, accessToken: string, refreshToken: string, erros: string[] }>(`${this.url}/login`, userLogin)
    }

    decodeToken(): JwtPayload | null {
      const token = this.getToken();
      if (!token) return null;
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
  
    isTokenValid(): boolean {
      const tokenData = this.decodeToken();
      if (!tokenData || !tokenData.exp) return false;
      
      // Verifica se o token expirou
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return tokenData.exp > currentTimestamp;
    }
    
    isAuthenticated(): string {
      const token = localStorage.getItem('jwt');
      return token!;
    }
    
    salvarToken(token: string): void {
      localStorage.setItem('jwt', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('jwt');
    }
  
    logout() {
      localStorage.removeItem('jwt'); 
    }

    obterUsuarioId(): string | null {
      const token = this.getToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        return decoded.id;
      }
      return null;
    }
}
