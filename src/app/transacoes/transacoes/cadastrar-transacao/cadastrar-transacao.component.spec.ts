import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTransacaoComponent } from './cadastrar-transacao.component';

describe('CadastrarTransacaoComponent', () => {
  let component: CadastrarTransacaoComponent;
  let fixture: ComponentFixture<CadastrarTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarTransacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
