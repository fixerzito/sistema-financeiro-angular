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
import { CartaoCreditoFormInsert } from '../../models/forms/insert/cartao-credito-form-insert';
import { ContaDropdown } from '../../models/dropdowns/conta-dropdown';
import { Bandeira } from '../../models/tables/bandeira.component';
import { CartaoCreditoService } from '../../services/cartao-credito.service';
import { ContaService } from '../../services/conta.service';
import { obterBandeiraCartao } from '../../helpers/bandeira.helper';

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
  cartaoEditado: CartaoCreditoFormInsert = {
    nome: '',
    digBandeira: ''
  };

  cartaoRecebidoParaEditar: CartaoCreditoFormInsert = {
    nome: '',
    digBandeira: ''
  };

  bandeira: Bandeira = {
    nome: '',
    link: ''
  };

  idParaEditar!: number;
  visible: boolean = false;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaDropdown[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public cartaoCreditoService: CartaoCreditoService,
    private contaService: ContaService,
  ) { }
  
  ngOnInit() {
    this.buscarContasBancarias();

    this.route.paramMap.subscribe(params => {
      this.idParaEditar = +params.get('id')!
      this.cartaoCreditoService.buscarCartaoEditar(this.idParaEditar)
        .subscribe(response => {
          if (Array.isArray(response)) {
            this.cartaoRecebidoParaEditar = response[0];
          } else {
            this.cartaoRecebidoParaEditar = response;
          }

          if (this.cartaoRecebidoParaEditar.idContaVinculada != undefined) {
            this.stringValidaConta = true;
            this.validarConta();
          }

          this.cartaoEditado = this.cartaoRecebidoParaEditar;
          
          this.preencherBandeiraCartao()
        });
    });
  }

  validarConta() {
    this.validaConta = this.stringValidaConta === true;
    if(this.stringValidaConta != true){
      this.cartaoEditado.idContaVinculada = undefined;
    }
  }
  
  showDialog() {
    this.visible = true;
  }

  cancelar() {
    this.router.navigate(['cartoes']);
  }

  buscarContasBancarias() {
    this.contaService.getAllDropdown()
      .subscribe(contas => {
        this.contasDropdown = contas;

      });
  }

  salvar(id: number, cartao: CartaoCreditoFormInsert ) {
    this.cartaoCreditoService.salvar(id, cartao)
      .subscribe(x => {
        this.router.navigate(['cartoes']);
      });
  }

  preencherBandeiraCartao(){
    obterBandeiraCartao(this.cartaoEditado.digBandeira, this.bandeira)
  }
  
}
