import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTransacaoFilterComponent } from './categoria-transacao-filter.component';

describe('CategoriaTransacaoFilterComponent', () => {
  let component: CategoriaTransacaoFilterComponent;
  let fixture: ComponentFixture<CategoriaTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
