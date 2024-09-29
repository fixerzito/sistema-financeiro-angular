import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartao } from '../models/cartao.component';
import { environment } from '../../../environments/environment';
import { Conta } from '../../contas-bancarias/models/conta.component';

@Component({
  selector: 'app-editar-cartoes',
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
  templateUrl: './editar-cartoes.component.html',
  styleUrl: './editar-cartoes.component.css'
})
export class EditarCartoesComponent implements OnInit {
  cartaoEditado: Cartao = {
    id: -1,
    nome: '',
    digBandeira: ''
  };

  cartaoRecebidoParaEditar: Cartao = {
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

  contaSelecionada: Conta = {
    id: -1,
    nome: '',
    saldo: 0,
    icon: '',
    idCategoria: -1
  };

  contaRecebida: Conta = {
    id: -1,
    nome: '',
    saldo: 0,
    icon: '',
    idCategoria: -1
  };

  contasDropdown: Conta[] = [
    {
      id: -1,
      nome: '',
      saldo: 0,
      icon: '',
      idCategoria: -1
    }
  ];


  validarConta() {
    this.validaConta = this.stringValidaConta === "true";
    if(this.stringValidaConta != "true"){
      this.cartaoEditado.idContaVinculada = undefined;
    }
  }


  showDialog() {
    this.visible = true;
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buscarContasBancarias();

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.httpClient.get<any>(`${environment.apiUrl}/cartoes/${id}`)
        .subscribe(response => {
          // Verifica se a resposta é um array contendo o objeto
          if (Array.isArray(response)) {
            this.cartaoRecebidoParaEditar = response[0]; // Obtém o primeiro objeto do array
          } else {
            this.cartaoRecebidoParaEditar = response;
          }

          if (this.cartaoRecebidoParaEditar.idContaVinculada != undefined) {
            this.stringValidaConta = "true";
            this.validarConta();
            // this.contaRecebida = this.filterContaPorId(this.cartaoRecebidoParaEditar.idContaVinculada);
          }

          this.cartaoEditado = this.cartaoRecebidoParaEditar;
        });
    });

    this.contaSelecionada = this.contaRecebida;
  }

  // filterContaPorId(idConta: number): Conta {
  //   const conta = this.contasDropdown.find(x => x.id === idConta);
  //   return conta ? conta : {
  //     id: -1,
  //     nome: '',
  //     saldo: 0,
  //     icon: ''
  //   };
  // }

  cancelar() {
    this.router.navigate(['cartoes']);
  }

  buscarContasBancarias() {
    this.httpClient.get<Array<Conta>>(`${environment.apiUrl}/contas`)
      .subscribe(contas => {
        this.contasDropdown = contas;
      });
  }

  salvar(id: number) {
    console.log(this.cartaoEditado);
    this.httpClient.put<Cartao>(`${environment.apiUrl}/cartoes/${id}`, this.cartaoEditado)
      .subscribe(x => {
        this.router.navigate(['cartoes']);
      });
  }

  atribuirIdConta(id: number) {
    this.cartaoEditado.idContaVinculada = id;
  }

  obterBandeiraCartao(digitos: string) {
    // Verifica a bandeira com base nos 6 primeiros dígitos
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
    };
  }
}
