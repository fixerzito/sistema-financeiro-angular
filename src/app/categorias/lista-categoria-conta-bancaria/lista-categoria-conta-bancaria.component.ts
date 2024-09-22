import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../environments/environment';

interface Categoria {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-lista-categoria-conta-bancaria',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './lista-categoria-conta-bancaria.component.html',
  styleUrls: ['./lista-categoria-conta-bancaria.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListaCategoriaContaBancariaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaEditar!: Categoria;

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.consultar();
  }

  confirmacaoApagar(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente apagar?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.apagar(id);
      }
    });
  }

  apagar(id: number) {
    this.httpClient.delete(`${environment.apiUrl}/categorias/${id}`)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Categoria apagada com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
  }

consultar() {
  this.httpClient.get<Array<Categoria>>(`${environment.apiUrl}/categorias`)
      .subscribe(x => {
        this.categorias = x;
      });
  }

  editar(id: number) {
    this.router.navigate(['categorias/editar-categoria', id]);
  }
}
