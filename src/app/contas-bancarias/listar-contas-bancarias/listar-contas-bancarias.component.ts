import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ContaBancariaTable } from '../../models/tables/conta-bancaria-table';
import { ContaBancariaService } from '../../services/conta-bancaria.service';
import { CategoriaContaBancariaService } from '../../services/categoria-conta-bancaria.service';

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
  contas: ContaBancariaTable[] = [];
  categorias: { [id: number]: string } = {};

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private contaBancariaService: ContaBancariaService,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
  ) { }

  ngOnInit() {
    this.consultar()
  }

  consultar() {
    this.contaBancariaService.consultar()
      .subscribe(contas => {
        this.contas = contas;
        contas.forEach(conta => this.consultarCatPorId(conta.idCategoria));
      });
  }

  consultarCatPorId(id: number) {
    if (!this.categorias[id]) {
      this.categoriaContaBancariaService.consultarPorId(id)
        .subscribe(categoria => {
          this.categorias[id] = categoria.nome;
        });
    }
  }

  apagar(id: number) {
    this.contaBancariaService.apagar(id)
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

  editar(id: number) {
    this.router.navigate(['contas/editar', id]);
  }

}
