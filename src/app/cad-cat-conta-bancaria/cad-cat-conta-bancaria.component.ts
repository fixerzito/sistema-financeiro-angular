import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

interface Option {
  name: string;
}

@Component({
  selector: 'app-cad-cat-conta-bancaria',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './cad-cat-conta-bancaria.component.html',
  styleUrl: './cad-cat-conta-bancaria.component.css'
})

export class CadCatContaBancariaComponent {

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
