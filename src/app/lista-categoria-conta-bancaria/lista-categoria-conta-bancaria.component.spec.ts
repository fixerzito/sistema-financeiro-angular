import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategoriaContaBancariaComponent } from './lista-categoria-conta-bancaria.component';

describe('ListaCategoriaContaBancariaComponent', () => {
  let component: ListaCategoriaContaBancariaComponent;
  let fixture: ComponentFixture<ListaCategoriaContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCategoriaContaBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCategoriaContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
