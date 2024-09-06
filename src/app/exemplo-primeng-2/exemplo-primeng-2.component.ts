import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';



@Component({
  selector: 'app-exemplo-primeng-2',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
    InputTextModule 
  ],
  templateUrl: './exemplo-primeng-2.component.html',
  styleUrl: './exemplo-primeng-2.component.css'
})
export class ExemploPrimeng2Component {
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
}
