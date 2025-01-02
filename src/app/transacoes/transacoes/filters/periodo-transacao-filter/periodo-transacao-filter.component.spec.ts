import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoTransacaoFilterComponent } from './periodo-transacao-filter.component';

describe('PeriodoTransacaoFilterComponent', () => {
  let component: PeriodoTransacaoFilterComponent;
  let fixture: ComponentFixture<PeriodoTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodoTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
