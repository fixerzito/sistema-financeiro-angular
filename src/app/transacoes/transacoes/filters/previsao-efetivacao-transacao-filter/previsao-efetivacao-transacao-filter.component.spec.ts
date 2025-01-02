import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoEfetivacaoTransacaoFilterComponent } from './previsao-efetivacao-transacao-filter.component';

describe('PrevisaoEfetivacaoTransacaoFilterComponent', () => {
  let component: PrevisaoEfetivacaoTransacaoFilterComponent;
  let fixture: ComponentFixture<PrevisaoEfetivacaoTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisaoEfetivacaoTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisaoEfetivacaoTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
