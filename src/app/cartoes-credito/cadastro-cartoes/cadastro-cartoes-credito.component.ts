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
import { Router } from '@angular/router';
import { ContaService } from '../../services/conta.service';
import { ContaDropdown } from '../../models/dropdowns/conta-dropdown';
import { CartaoCreditoService } from '../../services/cartao-credito.service';
import { CartaoCreditoFormInsert } from '../../models/forms/insert/cartao-credito-form-insert';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Bandeira } from '../../models/tables/bandeira.component';
import { obterBandeiraCartao } from '../../helpers/bandeira.helper';

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
    InputGroupAddonModule,
    ToastModule,
  ],
  templateUrl: './cadastro-cartoes-credito.component.html',
  styleUrls: ['./cadastro-cartoes-credito.component.css'],
  providers: [ MessageService]
})
export class CadastroCartoesCreditoComponent implements OnInit {
  cartaoCriado: CartaoCreditoFormInsert = {
    nome: '',
    digBandeira: ''
  };

  bandeira: Bandeira = {
    nome: '',
    link: ''
  };

  visible: boolean = false;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaDropdown[];
  contaSelecionada!: ContaDropdown;;

  constructor(
    private router: Router,
    private contaService: ContaService, 
    private cartaoCreditoService: CartaoCreditoService,
    private messageService: MessageService,
  ) { }
  
  ngOnInit() {
    this.stringValidaConta = false;
    this.contaService.getAllDropdown()
    .subscribe(contas => {
      this.contasDropdown = contas;
    });
  }

  validarConta() {
    if(this.validaConta){
      this.validaConta = false
    } else {
      this.validaConta = true
    }
  }

  showDialog() {
    this.visible = true;
  }
  
  cancelar() {
    this.router.navigate(['cartoes']);
  }

  salvar() {
   this.cartaoCreditoService.insert(this.cartaoCriado)
      .subscribe({
        next: () => { 
          this.router.navigate(['cartoes'], {state: {"cadastrou": true}});
         },
        error: (error: Error) => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possível cadastrar o seu cartão' }) }
      });
  }

  atribuirIdConta(id: number | undefined) {
    this.cartaoCriado.idContaVinculada = id;
  }

  preencherBandeiraCartao(){
    obterBandeiraCartao(this.cartaoCriado.digBandeira, this.bandeira)
  }
}
