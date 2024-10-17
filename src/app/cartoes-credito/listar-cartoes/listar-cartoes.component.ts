import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CartaoCreditoService } from '../../services/cartao-credito.service';
import { obterStringBandeiraCartao } from '../../helpers/bandeira.helper';
import { CartaoTable } from '../../models/tables/cartao-table';
import { ContaBancariaService } from '../../services/conta-bancaria.service';

@Component({
  selector: 'app-listar-cartoes',
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
  templateUrl: './listar-cartoes.component.html',
  styleUrl: './listar-cartoes.component.css',
  providers: [ConfirmationService, MessageService]
})

export class ListarCartoesComponent implements OnInit {
  cartoesLista: CartaoTable[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private location: Location,
    private cartaoCreditoService: CartaoCreditoService,
    private contaBancariaService: ContaBancariaService
  ) { }

  ngOnInit(): void {
    this.consultar()
  }

  ngAfterViewInit(): void {
    const state = this.location.getState() as { [key: string]: string };
    if (state && state['cadastrou']) {
      this.messageService.add({ severity: 'success', summary: 'Cartão criado com sucesso' });
    }
  }

  consultar() {
    this.cartaoCreditoService.consultar()
      .subscribe(cartoesRecebidos => {
        this.cartoesLista = cartoesRecebidos;
        this.cartoesLista.forEach(cartao => {
          cartao.bandeira = obterStringBandeiraCartao(cartao.digBandeira)
          console.log(this.cartoesLista);
          
        })
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

  apagar(id: number) {
    this.cartaoCreditoService.apagar(id)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Cartão apagado com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
  }

  editar(id: number) {
    this.router.navigate(['cartoes/editar', id]);
  }
}
