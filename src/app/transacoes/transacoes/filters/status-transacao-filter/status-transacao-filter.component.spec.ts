import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTransacaoFilterComponent } from './status-transacao-filter.component';

describe('StatusTransacaoFilterComponent', () => {
  let component: StatusTransacaoFilterComponent;
  let fixture: ComponentFixture<StatusTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
