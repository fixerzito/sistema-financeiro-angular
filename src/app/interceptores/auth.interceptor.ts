import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { jwtDecode } from "jwt-decode";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(UsuarioService);
  const token = authService.getToken();

  let userId: string | undefined;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);

      // Extraindo o ID corretamente
      userId =
        decoded?.sub 
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  }

  console.log('Interceptor chamado. Token atual:', token);

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`, 'UserId': userId || '' }})
    : req;

  return next(authReq);
};
