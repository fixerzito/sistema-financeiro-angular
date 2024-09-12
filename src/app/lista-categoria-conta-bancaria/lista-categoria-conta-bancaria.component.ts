import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface Option {
  name: string;
}

@Component({
  selector: 'app-lista-categoria-conta-bancaria',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './lista-categoria-conta-bancaria.component.html',
  styleUrl: './lista-categoria-conta-bancaria.component.css'
})
export class ListaCategoriaContaBancariaComponent {
  options: Option[] | undefined;
  selectedOption: Option | undefined;

  ngOnInit() {
    this.options = [
      { name: 'Option' },
      { name: 'Option' },
    ];
  }
}
