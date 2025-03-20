import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { authInterceptor } from './interceptores/auth.interceptor';

registerLocaleData(ptBr);

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AppModule {}
