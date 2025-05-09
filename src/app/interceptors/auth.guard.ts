import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (!this.usuarioService.isTokenValid()) {
      this.usuarioService.logout(); // Remove o token e redireciona
      return false;
    }
    return true;
  }
}
