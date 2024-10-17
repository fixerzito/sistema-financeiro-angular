import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ContaBancariaFormUpdate } from '../../models/forms/update/conta-bancaria-form-update';
import { CategoriaContaBancariaService } from '../../services/categoria-conta-bancaria.service';
import { CategoriaContaBancariaDropDown } from '../../models/dropdowns/categoria-conta-bancaria-dropdown';
import { ContaBancariaService } from '../../services/conta-bancaria.service';

@Component({
  selector: 'app-editar-conta-bancaria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './editar-conta-bancaria.component.html',
  styleUrl: './editar-conta-bancaria.component.css'
})
export class EditarContaBancariaComponent {

  contaCriada: ContaBancariaFormUpdate = {
    id: -1,
    nome: '',
    saldo: 0,
    icon: '',
    idCategoria: 0
  };

  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  categorias: CategoriaContaBancariaDropDown[] = [];
  categoriaExistente?: CategoriaContaBancariaDropDown;

  icons: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaContaBancariaService: CategoriaContaBancariaService,
    private contaBancariaService: ContaBancariaService
  ) { }

  ngOnInit() {
    this.buscarCategorias();

    this.icons = [
       "pi pi-wallet",
       "pi pi-money-bill",
       "pi pi-chart-line",
       "pi pi-briefcase",
       "pi pi-check",
       "pi pi-times",
       "pi pi-user",
       "pi pi-home",
       "pi pi-credit-card",
       "pi pi-sun",
    ];

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.contaBancariaService.consultarPorId(id)
        .subscribe(contaRecebida => {
          this.contaCriada = contaRecebida;
          this.categoriaExistente = this.filterCategoriaPorId(this.contaCriada.idCategoria);      
        });
    });
  }

  buscarCategorias() {
    this.categoriaContaBancariaService.consultarDropDown()
    .subscribe(x => {
      this.categorias = x
    });
  }

  salvar() {
    this.contaBancariaService.atualizar(this.contaCriada).subscribe(() => {
      this.router.navigate(['/contas'])
    })

  }

  cancelar() {
    this.router.navigate(['contas'])
  }

  filterCategoriaPorId(idCategoria: number): CategoriaContaBancariaDropDown | undefined{ 
    return this.categorias.find(x => x.id == idCategoria);
  }

}
