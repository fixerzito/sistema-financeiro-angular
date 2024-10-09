import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSubcategoriasTransacaoComponent } from './cadastrar-subcategorias-transacao.component';

describe('CadastrarSubcategoriasTransacaoComponent', () => {
  let component: CadastrarSubcategoriasTransacaoComponent;
  let fixture: ComponentFixture<CadastrarSubcategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarSubcategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarSubcategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
