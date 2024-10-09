import { TestBed } from '@angular/core/testing';

import { CategoriasTransacoesService } from './categorias-transacao.service';

describe('CategoriasTransacoesService', () => {
  let service: CategoriasTransacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasTransacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
