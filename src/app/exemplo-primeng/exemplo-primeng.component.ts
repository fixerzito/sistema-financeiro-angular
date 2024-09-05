import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-exemplo-primeng',
  standalone: true,
  imports: [InputTextareaModule, FormsModule],
  templateUrl: './exemplo-primeng.component.html',
  styleUrl: './exemplo-primeng.component.css'
})
export class ExemploPrimengComponent {
  value!: string;
}
