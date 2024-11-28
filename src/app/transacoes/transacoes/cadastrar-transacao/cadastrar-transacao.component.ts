import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TransacaoFormInsert } from '../../../models/forms/insert/transacao-form-insert';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../models/dropdowns/subcategoria-transacao-dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TransacaoService } from '../../../services/transacao.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ContaBancariaDropdown } from '../../../models/dropdowns/conta-bancaria-dropdown';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-cadastrar-transacao',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    CalendarModule
  ],
  templateUrl: './cadastrar-transacao.component.html',
  styleUrl: './cadastrar-transacao.component.css'
})
export class CadastrarTransacaoComponent {
  transacao: TransacaoFormInsert;
  categoriaId?: number;
  categorias!: CategoriaTransacoesDropdown[]; // TODO: CategoriaTransacaoDropdown
  subcategorias!: SubcategoriaTransacaoDropdown[];
  carregandoSubcategoriasDropdown: boolean = false;
  desabilitadoSubcategoriaDropdown: boolean = true;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaBancariaDropdown[];
  texto: Date | null = null;

  //false = saida, true = entrada
  tipoTransacao: boolean = false;

  constructor(
    private router: Router,
    private subcategoriaTransacaoService: SubcategoriaTransacaoService,
    private categoriaTransacaoService: CategoriaTransacaoService,
    private transacaoService: TransacaoService,
    private contaBancariaService: ContaBancariaService, 
  ) {
    this.transacao = {
      nome: "",
    }
  }

  ngOnInit() {
      this.transacao.status = false;
  }

  carregarCategorias() {
    if(this.categorias != undefined){
      return  
    }

    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias =>
        this.categorias = categorias
      );
  }

  carregarContasBancarias(){
    if(this.contasDropdown != undefined){
      return  
    }

    this.contaBancariaService.getAllDropdown()
      .subscribe(contas =>
        this.contasDropdown = contas
      );
  }

  validarConta() {
    if(this.validaConta){
      this.validaConta = false
    } else {
      this.validaConta = true
    }
  }

  carregarSubcategorias() {
    this.carregandoSubcategoriasDropdown = true
    this.subcategoriaTransacaoService.consultarDropdown(this.categoriaId!)
      .subscribe(subcategorias => {
        this.carregandoSubcategoriasDropdown = false
        this.subcategorias = subcategorias
        if(subcategorias.length == 0){
          alert("Nenhuma subcategoria cadastrada")  //TODO: definir para mensagem padrão do sistema
          this.desabilitadoSubcategoriaDropdown = true;
          return
        }
        this.desabilitadoSubcategoriaDropdown = false;
      });
  }

  onCategoriaChange() {
    this.transacao.idSubcategoriaTransacao = undefined;
    this.carregarSubcategorias();
  }

  atribuirIdConta(id: number) {
    this.transacao.idSubcategoriaTransacao = id;
  }

  salvar() {
    if(this.tipoTransacao == false){
      //entrada = 1 | saida = 2
      this.transacao.tipoTransacao = 2;
    } else {
      this.transacao.tipoTransacao = 1;
    }

    if (!this.transacao.dataPrevista) {
      this.transacao.dataPrevista = null;
    }

    if (!this.transacao.dataEfetivacao) {
      this.transacao.dataEfetivacao = null;
    }

    if(this.transacao.status == true){
      this.transacao.dataEfetivacao = new Date();
    }
    
    this.transacaoService.salvar(this.transacao)
      .subscribe(x => this.router.navigate(['/transacoes'])
      )
  }

  habilitarCalendario(status: boolean) : boolean{
    if(status === true){
      this.transacao.dataEfetivacao = null;
      return true
    } 

    return false
  }
 
  cancelar() {
    this.router.navigate(['/transacoes'])
  }
}
