import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CategoriaTransacoesDropdown } from '../../../models/dropdowns/categoria-transacoes-dropdown';
import { ContaBancariaDropdown } from '../../../models/dropdowns/conta-bancaria-dropdown';
import { SubcategoriaTransacaoDropdown } from '../../../models/dropdowns/subcategoria-transacao-dropdown';
import { TransacaoFormInsert } from '../../../models/forms/insert/transacao-form-insert';
import { CategoriaTransacaoService } from '../../../services/categoria-transacao.service';
import { ContaBancariaService } from '../../../services/conta-bancaria.service';
import { SubcategoriaTransacaoService } from '../../../services/subcategoria-transacao.service';
import { TransacaoService } from '../../../services/transacao.service';
import { TransacaoFormUpdate } from '../../../models/forms/update/transacao-form-update';

@Component({
  selector: 'app-editar-transacao',
  standalone: true,
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule
  ],
  templateUrl: './editar-transacao.component.html',
  styleUrl: './editar-transacao.component.css'
})
export class EditarTransacaoComponent {
  transacao: TransacaoFormUpdate;
  categoriaId?: number;
  categorias!: CategoriaTransacoesDropdown[]; // TODO: CategoriaTransacaoDropdown
  subcategorias!: SubcategoriaTransacaoDropdown[];
  carregandoSubcategoriasDropdown: boolean = false;
  desabilitadoSubcategoriaDropdown: boolean = true;
  stringValidaConta: boolean = false;
  validaConta: boolean = false;
  contasDropdown!: ContaBancariaDropdown[];

  //false = saida, true = entrada
  tipoTransacao: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.transacaoService.consultarPorId(id)
        .subscribe(transacao => {
          this.transacao = transacao;
          if (transacao.idContaBancaria != null) {
            this.stringValidaConta = true
            this.carregarContasBancarias();
          }
          this.carregarCategorias();
          if (transacao.tipoTransacao == 1){
            this.tipoTransacao = true;
          }
        });
    });
  }

  carregarCategorias() {
    if (this.categorias != undefined) {
      return
    }

    this.categoriaTransacaoService.consultarDropdown()
      .subscribe(categorias =>
        this.categorias = categorias
      );

    this.carregarSubcategorias()
  }

  carregarContasBancarias() {
    if (this.contasDropdown != undefined) {
      return
    }

    this.contaBancariaService.getAllDropdown()
      .subscribe(contas =>
        this.contasDropdown = contas
      );
  }

  validarConta() {
    if (this.validaConta) {
      this.validaConta = false
    } else {
      this.validaConta = true
    }
  }

  carregarSubcategorias() {
    this.carregandoSubcategoriasDropdown = true
    this.subcategoriaTransacaoService.consultarDropdown(this.transacao.idCategoriaTransacao!)
      .subscribe(subcategorias => {
        this.carregandoSubcategoriasDropdown = false
        this.subcategorias = subcategorias
        if (subcategorias.length == 0) {
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
      //entrada = 1 | saida = 2o
      this.transacao.tipoTransacao = 2;
    } else if (this.tipoTransacao == true){
      this.transacao.tipoTransacao = 1;
    }
    this.transacaoService.atualizar(this.transacao)
      .subscribe(x => this.router.navigate(['/transacoes'])
      )
  }

  cancelar() {
    this.router.navigate(['/transacoes'])
  }
}
