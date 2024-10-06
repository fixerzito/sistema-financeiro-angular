import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCatContaBancariaComponent } from './cad-cat-conta-bancaria.component';

describe('CadCatContaBancariaComponent', () => {
  let component: CadCatContaBancariaComponent;
  let fixture: ComponentFixture<CadCatContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadCatContaBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadCatContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
