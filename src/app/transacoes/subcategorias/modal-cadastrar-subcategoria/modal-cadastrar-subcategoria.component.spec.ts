import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarSubcategoriaTransacaoComponent } from './modal-cadastrar-subcategoria.component';

describe('ModalCadastrarSubcategoriaComponent', () => {
  let component: ModalCadastrarSubcategoriaTransacaoComponent;
  let fixture: ComponentFixture<ModalCadastrarSubcategoriaTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastrarSubcategoriaTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastrarSubcategoriaTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
