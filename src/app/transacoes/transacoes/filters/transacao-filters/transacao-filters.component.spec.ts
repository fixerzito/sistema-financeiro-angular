import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoFiltersComponent } from './transacao-filters.component';

describe('TransacaoFiltersComponent', () => {
  let component: TransacaoFiltersComponent;
  let fixture: ComponentFixture<TransacaoFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacaoFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
