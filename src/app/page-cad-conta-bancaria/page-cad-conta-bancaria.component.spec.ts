import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCadContaBancariaComponent } from './page-cad-conta-bancaria.component';

describe('PageCadContaBancariaComponent', () => {
  let component: PageCadContaBancariaComponent;
  let fixture: ComponentFixture<PageCadContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCadContaBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCadContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
