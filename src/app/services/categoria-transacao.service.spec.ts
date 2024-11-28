import { TestBed } from '@angular/core/testing';

import { CategoriaTransacaoService } from './categoria-transacao.service';

describe('CategoriaTransacaoService', () => {
  let service: CategoriaTransacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaTransacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
