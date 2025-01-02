import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTransacaoFilterComponent } from './tipo-transacao-filter.component';

describe('TipoTransacaoFilterComponent', () => {
  let component: TipoTransacaoFilterComponent;
  let fixture: ComponentFixture<TipoTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
