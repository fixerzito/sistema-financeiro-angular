import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubcategoriasTransacaoComponent } from './editar-subcategorias-transacao.component';

describe('EditarSubcategoriasTransacaoComponent', () => {
  let component: EditarSubcategoriasTransacaoComponent;
  let fixture: ComponentFixture<EditarSubcategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSubcategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSubcategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
