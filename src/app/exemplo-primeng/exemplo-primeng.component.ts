import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-exemplo-primeng',
  standalone: true,
  imports: [
    InputTextareaModule,
    FormsModule,
    RadioButtonModule,
    PasswordModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule 
  ],
  templateUrl: './exemplo-primeng.component.html',
  styleUrl: './exemplo-primeng.component.css'
})
export class ExemploPrimengComponent {
  value!: string;
  ingredient!: string;
  password!: string;
  date: Date | undefined;
  checked: boolean = false;

  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }
}


