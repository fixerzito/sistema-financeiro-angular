import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedValue: any;

  setValor(valor: any) {
    this.sharedValue = valor;
  }

  getValor() {
    return this.sharedValue;
  }
}
