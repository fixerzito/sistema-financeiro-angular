import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriasTransacaoComponent } from './editar-categorias-transacao.component';

describe('EditarCategoriasTransacaoComponent', () => {
  let component: EditarCategoriasTransacaoComponent;
  let fixture: ComponentFixture<EditarCategoriasTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCategoriasTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCategoriasTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
