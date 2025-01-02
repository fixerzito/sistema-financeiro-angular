import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaTransacaoFilterComponent } from './conta-transacao-filter.component';

describe('ContaTransacaoFilterComponent', () => {
  let component: ContaTransacaoFilterComponent;
  let fixture: ComponentFixture<ContaTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
