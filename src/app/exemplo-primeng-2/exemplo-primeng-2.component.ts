import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

interface Car {
  brand: string;
  year: number;
  color: string;
}


@Component({
  selector: 'app-exemplo-primeng-2',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './exemplo-primeng-2.component.html',
  styleUrl: './exemplo-primeng-2.component.css',
  providers: [MessageService]
})
export class ExemploPrimeng2Component {
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    }

    cars: Car[] = [
      { brand: 'Toyota', year: 2015, color: 'White' },
      { brand: 'Honda', year: 2018, color: 'Black' },
      { brand: 'Ford', year: 2020, color: 'Blue' }
    ];
}
