import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';



@Component({
  selector: 'app-exemplo-primeng-2',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    TabViewModule 
  ],
  templateUrl: './exemplo-primeng-2.component.html',
  styleUrl: './exemplo-primeng-2.component.css'
})
export class ExemploPrimeng2Component {
  
}
