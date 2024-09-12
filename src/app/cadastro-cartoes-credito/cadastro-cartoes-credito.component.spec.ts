import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCartoesCreditoComponent } from './cadastro-cartoes-credito.component';

describe('CadastroCartoesCreditoComponent', () => {
  let component: CadastroCartoesCreditoComponent;
  let fixture: ComponentFixture<CadastroCartoesCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCartoesCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCartoesCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
