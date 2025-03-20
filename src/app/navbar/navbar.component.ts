import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Contas Bancárias',
        icon: 'pi pi-building-columns',
        items: [
          {
            label: 'Contas bancárias',
            icon: 'pi pi-building-columns',
            routerLink: '/contas'
          },
          {
            label: 'Categorias',
            icon: 'pi pi-tags',
            routerLink: '/categorias-contas-bancarias'
          },
        ]
      },
      {
        label: 'Cartões de crédito',
        icon: 'pi pi-credit-card',
        routerLink: '/cartoes'
      },
      {
        label: 'Transações',
        icon: 'pi pi-arrow-right-arrow-left',
        items: [
          {
            label: 'Transações',
            icon: 'pi pi-arrow-right-arrow-left',
            routerLink: '/transacoes'
          },
          {
            label: 'Categorias',
            icon: 'pi pi-tags',
            routerLink: '/categorias-transacao'
          },
          {
            label: 'Subcategorias',
            icon: 'pi pi-tag',
            routerLink: '/subcategorias-transacao'
          }
        ]
      },
      {
        label: 'Usuário',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            routerLink: '/perfil'
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
          }
        ]
      }
    ];
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
