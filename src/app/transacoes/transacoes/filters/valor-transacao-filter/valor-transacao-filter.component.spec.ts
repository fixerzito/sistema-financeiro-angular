import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorTransacaoFilterComponent } from './valor-transacao-filter.component';

describe('ValorTransacaoFilterComponent', () => {
  let component: ValorTransacaoFilterComponent;
  let fixture: ComponentFixture<ValorTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
