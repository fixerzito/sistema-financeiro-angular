import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Cartao } from '../models/cartao.component';
import { CartaoListar } from '../models/cartao-listar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  ngOnInit(): void {
    this.consultar()
  }

  constructor(
    private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  cartao!: Cartao;
  cartoesLista: CartaoListar[] = [];


  consultar() {
    this.httpClient.get<Array<CartaoListar>>(`${environment.apiUrl}/cartoes`)
      .subscribe(cartoesRecebidos => {
        this.cartoesLista = cartoesRecebidos;
        console.log(this.cartoesLista);
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
    this.httpClient.delete(`${environment.apiUrl}/cartoes/${id}`)
      .subscribe(() => {
        this.messageService.add({ severity: 'info', summary: 'Cartão apagado com sucesso', detail: 'Record deleted' });
        this.consultar();
      });
  }

  editar(id: number) {
    this.router.navigate(['cartoes/editar', id]);
  }

  obterBandeiraCartao(digitos: string): string {
    // Certifique-se de que a string possui exatamente 6 dígitos
    if (digitos.length !== 6) {
        throw new Error("Os dígitos do cartão devem ter exatamente 6 caracteres.");
    }

    // Variável para armazenar a bandeira do cartão
    let bandeiraCartao: string;
    
    // Verifica a bandeira com base nos 6 primeiros dígitos
    if (/^4/.test(digitos)) {
        bandeiraCartao = "Visa";
    } else if (/^51|52|53|54|55/.test(digitos)) {
        bandeiraCartao = "MasterCard";
    } else if (/^34|37/.test(digitos)) {
        bandeiraCartao = "American Express";
    } else if (/^6011|622|64|65/.test(digitos)) {
        bandeiraCartao = "Discover";
    } else if (/^35/.test(digitos)) {
        bandeiraCartao = "JCB";
    } else if (/^60/.test(digitos)) {
        bandeiraCartao = "Diners Club";
    } else {
        bandeiraCartao = "Bandeira desconhecida";
    }

    return bandeiraCartao;
}

}
