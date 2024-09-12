import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

interface Option {
  name: string;
}

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
    CommonModule
  ],
  templateUrl: './cadastro-cartoes-credito.component.html',
  styleUrl: './cadastro-cartoes-credito.component.css'
})
export class CadastroCartoesCreditoComponent {
  stringValidaConta: string = "";
  validaConta: boolean = false;
  options: Option[] | undefined;
  selectedOption: Option | undefined;

  validarConta() {
    this.validaConta = this.stringValidaConta === "true";
  }
  date: Date | undefined;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }



  ngOnInit() {
    this.options = [
      { name: 'Option' },
      { name: 'Option' },
    ];
  }
}

