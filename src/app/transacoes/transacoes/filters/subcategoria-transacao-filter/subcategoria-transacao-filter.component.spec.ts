import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaTransacaoFilterComponent } from './subcategoria-transacao-filter.component';

describe('SubcategoriaTransacaoFilterComponent', () => {
  let component: SubcategoriaTransacaoFilterComponent;
  let fixture: ComponentFixture<SubcategoriaTransacaoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriaTransacaoFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriaTransacaoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
