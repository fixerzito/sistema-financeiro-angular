import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cartao } from '../models/cartao.component';
import { environment } from '../../../environments/environment';
import { Conta } from '../../contas-bancarias/models/conta.component';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-cartoes-credito',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskModule,
    RadioButtonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './cadastro-cartoes-credito.component.html',
  styleUrls: ['./cadastro-cartoes-credito.component.css']
})
export class CadastroCartoesCreditoComponent implements OnInit {
  cartaoCriado: Cartao = {
    id: -1,
    nome: '',
    digBandeira: ''
  };

  bandeira: any = {
    nome: '',
    link: ''
  };

  visible: boolean = false;
  stringValidaConta: string = "";
  validaConta: boolean = false;
  contasDropdown!: Conta[];
  contaSelecionada!: Conta;

  validarConta() {
    this.validaConta = this.stringValidaConta === "true";
  }

  showDialog() {
    this.visible = true;
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.stringValidaConta = "false";
    this.buscarContasBancarias()
      .subscribe(contas => {
        this.contasDropdown = contas;
      });
  }

  cancelar() {
    this.router.navigate(['cartoes']);
  }

  buscarContasBancarias(): Observable<Conta[]> {
    return this.httpClient.get<Array<Conta>>(`${environment.apiUrl}/contas`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar contas bancárias', error);
          return of([]);
        })
      );
  }

  salvar() {
    this.httpClient.post<Cartao>(`${environment.apiUrl}/cartoes`, this.cartaoCriado)
      .pipe(
        catchError(error => {
          console.error('Erro ao salvar o cartão', error);
          return of(null);
        })
      )
      .subscribe(x => {
        if (x) {
          this.router.navigate(['cartoes']);
        }
      });
  }

  atribuirIdConta(id: number) {
    this.cartaoCriado.idContaVinculada = id;
  }

  obterBandeiraCartao(digitos: string) {
    if (/^4/.test(digitos)) {
      this.bandeira.nome = "Visa";
      this.bandeira.link = 'assets/flags-icon/visa.png';
    } else if (/^51|52|53|54|55/.test(digitos)) {
      this.bandeira.nome = "MasterCard";
      this.bandeira.link = 'assets/flags-icon/mastercard.png';
    } else if (/^34|37/.test(digitos)) {
      this.bandeira.nome = "American Express";
      this.bandeira.link = 'assets/flags-icon/american.png';
    } else if (/^6011|622|64|65/.test(digitos)) {
      this.bandeira.nome = "Discover";
      this.bandeira.link = 'assets/flags-icon/discover.png';
    } else if (/^35/.test(digitos)) {
      this.bandeira.nome = "JCB";
      this.bandeira.link = 'assets/flags-icon/jcb.png';
    } else if (/^60/.test(digitos)) {
      this.bandeira.nome = "Diners Club";
      this.bandeira.link = 'assets/flags-icon/diners.png';
    } else {
      this.bandeira.nome = "";
      this.bandeira.link = '';
    }
  }
}
