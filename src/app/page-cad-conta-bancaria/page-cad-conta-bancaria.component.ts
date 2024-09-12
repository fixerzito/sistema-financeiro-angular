import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

interface Option {
  name: string;
}

@Component({
  selector: 'app-page-cad-conta-bancaria',
  standalone: true,
  imports: [
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

  options: Option[] | undefined;
  selectedOption: Option | undefined;

  ngOnInit() {
    this.options = [
      { name: 'Option' },
      { name: 'Option' },
    ];
  }
}
