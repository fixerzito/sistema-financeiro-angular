import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCategoriaContaBancariaComponent } from './cadastro-categoria-conta-bancaria.component';

describe('CadastroCategoriaContaBancariaComponent', () => {
  let component: CadastroCategoriaContaBancariaComponent;
  let fixture: ComponentFixture<CadastroCategoriaContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCategoriaContaBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCategoriaContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
