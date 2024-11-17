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
import { ActivatedRoute, Router } from '@angular/router';
import { CartaoCreditoFormInsert } from '../../models/forms/insert/cartao-credito-form-insert';
import { ContaBancariaDropdown } from '../../models/dropdowns/conta-bancaria-dropdown';
import { Bandeira } from '../../models/view/bandeira';
import { CartaoCreditoService } from '../../services/cartao-credito.service';
import { ContaBancariaService } from '../../services/conta-bancaria.service';
import { obterBandeiraCartao } from '../../helpers/bandeira.helper';
import { CartaoCreditoFormUpdate } from '../../models/forms/update/cartao-credito-form-update';

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
  cartaoEditado: CartaoCreditoFormUpdate = {
    nome: '',
    digBandeira: ''
  };

  cartaoRecebidoParaEditar: CartaoCreditoFormUpdate = {   
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
  contasDropdown!: ContaBancariaDropdown[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public cartaoCreditoService: CartaoCreditoService,
    private contaBancariaService: ContaBancariaService,
  ) { }
  
  ngOnInit() {
    this.buscarContasBancarias();

    this.route.paramMap.subscribe(params => {
      let idParaEditar = +params.get('id')!
      this.cartaoCreditoService.buscarCartaoEditar(idParaEditar)
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
    this.contaBancariaService.getAllDropdown()
      .subscribe(contas => {
        this.contasDropdown = contas;

      });
  }

  salvar(id: number | undefined = -1 , cartao: CartaoCreditoFormInsert ) {
    this.cartaoCreditoService.salvar(id, cartao)
      .subscribe(x => {
        this.router.navigate(['cartoes']);
      });
  }

  preencherBandeiraCartao(){
    obterBandeiraCartao(this.cartaoEditado.digBandeira, this.bandeira)
  }
  
}
