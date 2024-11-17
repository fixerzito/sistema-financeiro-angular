import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, LazyLoadEvent, MessageService, SortEvent } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CategoriaContaBancariaTable } from '../../../models/tables/categoria-conta-bancaria-table';
import { CategoriaContaBancariaService } from '../../../services/categoria-conta-bancaria.service';

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
  categorias: CategoriaContaBancariaTable[] = [];
  categoriaEditar!: CategoriaContaBancariaTable;
  ordenacaoColuna: string = "nome";
  ordenacao: number = 1;
  page:number = 0;
  totalRecords!: number;
  loading: boolean = false;

  rows = 10;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private categoriaContaBancariaService: CategoriaContaBancariaService
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
    this.categoriaContaBancariaService.apagar(id)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Categoria apagada com sucesso', detail: '' });
        this.consultar();
      });
  }

  consultar() {
    this.categoriaContaBancariaService.consultar()
      .subscribe(x => {
        this.categorias = x;
      });
  }

  editar(id: number) {
    this.router.navigate(['categorias-contas-bancarias/editar', id]);
  }


  loadCategories(event: any) {
    console.log('Event:', event); // Log do evento completo para verificação

    const pageNumber = event.first / event.rows + 1;
    const rows = event.rows;

    if (!isNaN(pageNumber) && pageNumber > 0 && !isNaN(rows) && rows > 0) {
        this.page = pageNumber;
        this.rows = rows;
    } else {
        console.error('Invalid pagination parameters', { pageNumber, rows });
        return;
    }

    this.ordenacao = event.sortOrder !== undefined ? event.sortOrder : 1;
    this.ordenacaoColuna = event.sortField ? event.sortField : "nome";

    this.consultar();
  }
}
