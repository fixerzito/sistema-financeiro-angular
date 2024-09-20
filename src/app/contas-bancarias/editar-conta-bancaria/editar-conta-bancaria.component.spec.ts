import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContaBancariaComponent } from './editar-conta-bancaria.component';

describe('EditarContaBancariaComponent', () => {
  let component: EditarContaBancariaComponent;
  let fixture: ComponentFixture<EditarContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarContaBancariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
