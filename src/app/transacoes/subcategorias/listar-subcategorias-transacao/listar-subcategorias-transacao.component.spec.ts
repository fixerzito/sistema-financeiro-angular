import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSubcategoriasTransacaoComponent } from './listar-subcategorias-transacao.component';

describe('ListarSubcategoriasTransacaoComponent', () => {
  let component: ListarSubcategoriasTransacaoComponent;
  let fixture: ComponentFixture<ListarSubcategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSubcategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSubcategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
