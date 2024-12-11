import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarCategoriaTransacaoComponent } from './modal-cadastrar-categoria-transacao.component';

describe('ModalCadastrarCategoriaTransacaoComponent', () => {
  let component: ModalCadastrarCategoriaTransacaoComponent;
  let fixture: ComponentFixture<ModalCadastrarCategoriaTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastrarCategoriaTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastrarCategoriaTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
