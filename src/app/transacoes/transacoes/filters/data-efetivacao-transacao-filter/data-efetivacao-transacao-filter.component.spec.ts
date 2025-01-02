import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEfetivacaoTransacaoFilterComponent } from './data-efetivacao-transacao-filter.component';

describe('DataEfetivacaoTransacaoFilterComponent', () => {
  let component: DataEfetivacaoTransacaoFilterComponent;
  let fixture: ComponentFixture<DataEfetivacaoTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEfetivacaoTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEfetivacaoTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
