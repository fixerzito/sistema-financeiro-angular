import { TestBed } from '@angular/core/testing';

import { CategoriaContaBancariaService } from './categoria-conta-bancaria.service';

describe('CategoriaContaBancariaService', () => {
  let service: CategoriaContaBancariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaContaBancariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
