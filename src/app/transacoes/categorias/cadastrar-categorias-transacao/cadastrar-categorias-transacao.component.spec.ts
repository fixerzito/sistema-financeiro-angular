import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCategoriasTransacaoComponent } from './cadastrar-categorias-transacao.component';

describe('CadastrarCategoriasTransacaoComponent', () => {
  let component: CadastrarCategoriasTransacaoComponent;
  let fixture: ComponentFixture<CadastrarCategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
