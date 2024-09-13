import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

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
  styleUrl: './lista-categoria-conta-bancaria.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListaCategoriaContaBancariaComponent {
  categorias: Categoria[] = []

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.consultar()
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
    this.httpClient.delete(`http://localhost:3000/categorias/${id}`)
      .subscribe(x => {
        this.messageService.add({ severity: 'info', summary: 'Categoria apagada com sucesso', detail: 'Record deleted' });
        this.consultar()
      })
  }

  editar(id: number) {

  }


  consultar() {
    this.httpClient.get<Array<Categoria>>("http://localhost:3000/categorias")
      .subscribe(x => {
        this.categorias = x;
      });
  }
}
