import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TransacaoService } from '../../../services/transacao.service';
import { TransacaoTable } from '../../../models/tables/transacao-table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-listar-transacao',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule
  ],
  templateUrl: './listar-transacao.component.html',
  styleUrl: './listar-transacao.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ListarTransacaoComponent implements OnInit {

  transacoes: TransacaoTable[] = [];
  statusString!: string;
  statusSeverity!: string;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private transacaoService: TransacaoService

  ) { }

  consultar() {
    this.transacaoService.consultar()
      .subscribe(transacoesRecebidas => {
        this.transacoes = transacoesRecebidas
      }); 
  }

  ngOnInit(): void {
    this.consultar()
  }

  // ngAfterViewInit(): void {
  //   const state = this.location.getState() as { [key: string]: string };
  //   if (state && state['cadastrou']) {
  //     this.messageService.add({ severity: 'success', summary: 'Cartão criado com sucesso' });
  //   }
  // }

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

  obterStatus(status: boolean): 'warning' | 'success' {
    if (status)
      return "success"
    return "warning"
  }

  obterTexto(status: boolean): string {
    if (status)
      return "Recebido"
    return "Pendente"
  }

  buttonTexto(status: boolean) : string{
    if (status === true){
      return "Tornar Pendente"
    }

    return "Efetuar Transação"
  }

  buttonSeverity(status: boolean) : 'success' | 'help' {
    if (status)
      return "help"
    return "success"
  }

  alterarStatus(status: boolean, id: number) {
    this.transacaoService.consultarPorId(id).subscribe(response => {
      let transacao = response;
      transacao.status = !status;
      if(transacao.status === true){
        transacao.dataEfetivacao = new Date();
      } else {
        transacao.dataEfetivacao = null
      }
      this.transacaoService.atualizar(transacao).subscribe(() => {
        this.consultar();
      });
    });
  }
  

  buttonIcon(status: boolean) : string {
    if (status)
      return "pi pi-arrow-right-arrow-left"
    return "pi pi-dollar"
  }

  apagar(id: number) {
    this.transacaoService.apagar(id)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Transação apagado com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
  }

  editar(id: number) {
    this.router.navigate(['transacoes/editar', id]);
  }
}
