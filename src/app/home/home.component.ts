import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HomeService } from '../home.service';
import { ButtonModule } from 'primeng/button';
import { ContaBancariaService } from '../services/conta-bancaria.service';
import { ContaBancariaTable } from '../models/tables/conta-bancaria-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  contasBancarias: ContaBancariaTable[];
  constructor(
    private homeService: HomeService,
    private contaBancariaService: ContaBancariaService,
  ){
    this.contasBancarias = []
  }

  ngOnInit() {
    this.consultar()
  }

  consultar() {
    this.contaBancariaService.consultar()
      .subscribe(contas => {
        this.contasBancarias = contas;
      });
  }
}
