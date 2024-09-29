import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCartoesComponent } from './editar-cartoes.component';

describe('EditarCartoesComponent', () => {
  let component: EditarCartoesComponent;
  let fixture: ComponentFixture<EditarCartoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCartoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCartoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
