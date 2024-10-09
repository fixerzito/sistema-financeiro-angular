import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CategoriaTransacaoTable } from '../../../models/tables/categoria-transacao-table';
import { CategoriasTransacoesService } from '../../../services/categorias-transacao.service';


@Component({
  selector: 'app-listar-categorias-transacao',
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
  templateUrl: './listar-categorias-transacao.component.html',
  styleUrl: './listar-categorias-transacao.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListarCategoriasTransacaoComponent {

  categorias: CategoriaTransacaoTable[] = [];
  categoriaEditar!: CategoriaTransacaoTable;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private categoriasTransacoesService: CategoriasTransacoesService,

  ) { }

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
    this.categoriasTransacoesService.apagar(id)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Categoria apagada com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
  }

  consultar() {
  this.categoriasTransacoesService.consultar()
      .subscribe(x => {
        this.categorias = x;
      });
  }

  editar(id: number) {
    this.router.navigate(['categorias-transacao/editar', id]);
  }
}
