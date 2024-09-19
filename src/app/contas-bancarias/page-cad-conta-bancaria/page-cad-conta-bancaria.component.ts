import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

interface Option {
  id: number,
  name: string;
}

interface Icon {
  name: string
}

@Component({
  selector: 'app-page-cad-conta-bancaria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-cad-conta-bancaria.component.html',
  styleUrl: './page-cad-conta-bancaria.component.css'
})
export class PageCadContaBancariaComponent {
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  options: Option[] = [];
  selectedOption: Option | undefined;
  icons: Icon[] = []
  selectedIcon?: Icon;

    constructor(
      private httpClient: HttpClient
    ){}

  ngOnInit() {
    this.buscarCategorias();
    
    this.icons = [
      { name: "pi pi-wallet" },
      { name: "pi pi-money-bill" },
      { name: "pi pi-chart-line" },
      { name: "pi pi-briefcase" },
      { name: "pi pi-check" },
      { name: "pi pi-times" },
      { name: "pi pi-user" },
      { name: "pi pi-home" },
      { name: "pi pi-credit-card" }
    ];
  }

  buscarCategorias(){
  this.httpClient.get<Array<Option>>('http://localhost:3001/categorias').subscribe(x => {
    this.options = x
  });
  }
}
