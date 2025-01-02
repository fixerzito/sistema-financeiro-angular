import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomeTransacaoFilterComponent } from './nome-transacao-filter.component';

describe('NomeTransacaoFilterComponent', () => {
  let component: NomeTransacaoFilterComponent;
  let fixture: ComponentFixture<NomeTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomeTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomeTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
