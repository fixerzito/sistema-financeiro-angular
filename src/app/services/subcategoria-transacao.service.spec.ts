import { TestBed } from '@angular/core/testing';

import { SubcategoriaTransacaoService } from './subcategoria-transacao.service';

describe('SubcategoriaTransacaoService', () => {
  let service: SubcategoriaTransacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriaTransacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
