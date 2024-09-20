import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

interface Conta {
  id: number,
  nome: string,
  saldo: number,
  icon: string,
  idCategoria: number
};

@Component({
  selector: 'app-listar-contas-bancarias',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    CommonModule
  ],
  templateUrl: './listar-contas-bancarias.component.html',
  styleUrl: './listar-contas-bancarias.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListarContasBancariasComponent {
  contas: Conta[] = [];
  // objeto de chave/valor, onde o id representa a string
  categorias: { [id: number]: string } = {};

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.consultar()
  }

  consultar() {
    this.httpClient.get<Array<Conta>>('http://localhost:3000/contas')
      .subscribe(contas => {
        this.contas = contas;
        contas.forEach(conta => this.consultarCatPorId(conta.idCategoria));
      });
  }
  
  consultarCatPorId(id: number) {
    // Verifica se a categoria já foi carregada
    if (!this.categorias[id]) {
      this.httpClient.get<any>(`http://localhost:3000/categorias/${id}`)
        .subscribe(categoria => {
          this.categorias[id] = categoria.nome; // Armazena a categoria
        });
    }
  }

  apagar(id: number) {
    this.httpClient.delete(`http://localhost:3000/contas/${id}`)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Categoria apagada com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
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

  editar(id:number){
    this.router.navigate(['contas/editar', id]);
  }
  
}
