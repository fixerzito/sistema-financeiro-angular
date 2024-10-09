import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCategoriasTransacaoComponent } from './listar-categorias-transacao.component';

describe('ListarCategoriasTransacaoComponent', () => {
  let component: ListarCategoriasTransacaoComponent;
  let fixture: ComponentFixture<ListarCategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
