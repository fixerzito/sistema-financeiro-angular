import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UsuarioService } from './services/usuario.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private usuarioService: UsuarioService) { }

  isLoggedIn(): boolean {
    return this.usuarioService.isTokenValid(); // Verifica se o token ainda é válido
  }

  logout() {
    this.usuarioService.logout();
  }
}
