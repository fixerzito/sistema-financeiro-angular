import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login'
      },
      {
        label: 'Contas Bancárias',
        icon: 'pi pi-building-columns',
        items: [
          {
            label: 'Categorias',
            icon: 'pi pi-bolt',
            routerLink: 'categorias'
          },
          {
            label: 'Contas bancárias',
            icon: 'pi pi-building-columns',
            routerLink: 'contas'
          }
        ]
      },
      {
        label: 'Cartão de crédito',
        icon: 'pi pi-credit-card',
        routerLink: 'cartoes'
      }
    ]
  }
}
